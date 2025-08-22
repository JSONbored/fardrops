import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Clanker bot FID (official Clanker account)
const CLANKER_FID = 11517; // Clanker's Farcaster ID
const CLANKER_USERNAME = "clanker";

interface ClankerToken {
  name: string;
  symbol: string;
  contractAddress: string;
  castHash: string;
  creatorFid: number;
  creatorUsername: string;
  timestamp: string;
  description: string;
  imageUrl?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Verify this is an authorized request (from cron job or admin)
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.CRON_SECRET || "development"}`;

    if (process.env.NODE_ENV === "production" && authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🤖 Monitoring Clanker for new token launches...");

    // Fetch recent casts from Clanker bot
    // Only allow trusted URLs for the Farcaster Hub endpoint to mitigate SSRF risk
    const allowedHubUrls = [
      "https://api.neynar.com/v2",
      "https://hub-grpc.pinata.cloud",
      "https://hub.farcaster.xyz",
    ];
    const envHubUrl =
      process.env.FARCASTER_HUB_URL || "https://api.neynar.com/v2";

    // Find the matching allowed URL or use default
    let hubUrl = "https://api.neynar.com/v2"; // default safe value

    for (const allowed of allowedHubUrls) {
      try {
        const envUrl = new URL(envHubUrl);
        const allowedUrl = new URL(allowed);
        if (
          envUrl.origin === allowedUrl.origin &&
          envUrl.pathname.startsWith(allowedUrl.pathname)
        ) {
          // Use the allowed URL, not the env variable
          hubUrl = allowed;
          break;
        }
      } catch {
        // Invalid URL, skip
      }
    }

    const apiKey = process.env.NEYNAR_API_KEY || "";

    // Using validated URL for the request
    const response = await fetch(
      `${hubUrl}/farcaster/feed/user/${CLANKER_FID}?limit=25`,
      {
        headers: {
          api_key: apiKey,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      // Fallback: Try direct Hub API
      console.log("Falling back to Hub API...");
      return await monitorViaHub();
    }

    const data = await response.json();
    const casts = data.casts || [];

    // Parse Clanker token launches from casts
    const newTokens: ClankerToken[] = [];

    for (const cast of casts) {
      // Clanker posts follow patterns like "I'll deploy this" or includes contract addresses
      const text = cast.text || "";

      // Look for Base contract addresses (0x...)
      const addressMatch = text.match(/0x[a-fA-F0-9]{40}/g);

      // Look for token details in the cast
      if (addressMatch || text.toLowerCase().includes("deployed")) {
        const token: ClankerToken = {
          name: extractTokenName(text),
          symbol: extractTokenSymbol(text),
          contractAddress: addressMatch ? addressMatch[0] : "",
          castHash: cast.hash,
          creatorFid: cast.parent_author?.fid || 0,
          creatorUsername: cast.parent_author?.username || "unknown",
          timestamp: cast.timestamp,
          description: text.substring(0, 200),
          imageUrl: cast.embeds?.[0]?.url,
        };

        if (token.symbol && token.contractAddress) {
          newTokens.push(token);
        }
      }
    }

    console.log(`Found ${newTokens.length} new Clanker tokens`);

    // Store in database
    if (
      newTokens.length > 0 &&
      supabaseUrl !== "https://placeholder.supabase.co"
    ) {
      for (const token of newTokens) {
        // Check if already exists
        const { data: existing } = await supabase
          .from("airdrops")
          .select("id")
          .eq("source_cast_hash", token.castHash)
          .single();

        if (!existing) {
          // Add as new airdrop
          const { error } = await supabase.from("airdrops").insert({
            project_name: token.name,
            token_symbol: token.symbol,
            description: `New Clanker token: ${token.description}`,
            claim_url: `https://basescan.org/token/${token.contractAddress}`,
            chain: "base",
            status: "live",
            source_cast_hash: token.castHash,
            detected_by_fid: CLANKER_FID,
            channel: "clanker",
            eligibility_criteria: {
              type: "clanker_token",
              contract: token.contractAddress,
              creator: token.creatorUsername,
            },
          });

          if (error) {
            console.error("Error storing token:", error);
          } else {
            console.log(`✅ Stored new token: ${token.symbol}`);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      tokensFound: newTokens.length,
      tokens: newTokens.slice(0, 10), // Return latest 10
    });
  } catch (error) {
    console.error("Clanker monitoring error:", error);
    return NextResponse.json(
      { error: "Failed to monitor Clanker" },
      { status: 500 },
    );
  }
}

// Fallback: Monitor via direct Hub API
async function monitorViaHub() {
  // This would connect directly to a Farcaster Hub
  // For now, return sample data
  return NextResponse.json({
    success: true,
    message: "Hub monitoring not yet implemented",
    sampleTokens: [
      {
        name: "SAMPLE",
        symbol: "$SAMPLE",
        contractAddress: "0x...",
        description: "Sample Clanker token for testing",
      },
    ],
  });
}

// Extract token name from Clanker cast
function extractTokenName(text: string): string {
  // Look for patterns like "name: X" or "Name: X"
  const nameMatch = text.match(/name:\s*([^,\n]+)/i);
  if (nameMatch) return nameMatch[1].trim();

  // Fallback: use first capitalized word
  const words = text.split(" ");
  for (const word of words) {
    if (word.length > 2 && word[0] === word[0].toUpperCase()) {
      return word;
    }
  }

  return "Unknown Token";
}

// Extract token symbol from Clanker cast
function extractTokenSymbol(text: string): string {
  // Look for $SYMBOL pattern
  const symbolMatch = text.match(/\$([A-Z]+)/g);
  if (symbolMatch && symbolMatch[0]) {
    return symbolMatch[0];
  }

  // Look for "symbol: X" or "ticker: X"
  const tickerMatch = text.match(/(?:symbol|ticker):\s*([A-Z]+)/i);
  if (tickerMatch) return tickerMatch[1];

  // Look for all caps words (likely tickers)
  const capsMatch = text.match(/\b[A-Z]{2,10}\b/g);
  if (capsMatch && capsMatch[0]) {
    return capsMatch[0];
  }

  return "";
}
