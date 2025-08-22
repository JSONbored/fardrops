import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email && !body.fid) {
      return NextResponse.json(
        { error: "Email or FID is required" },
        { status: 400 },
      );
    }

    // Check if already on waitlist
    let existingQuery = supabase.from("waitlist").select("*");

    if (body.email) {
      existingQuery = existingQuery.eq("email", body.email);
    } else if (body.fid) {
      existingQuery = existingQuery.eq("fid", body.fid);
    }

    const { data: existing } = await existingQuery.single();

    if (existing) {
      return NextResponse.json(
        { message: "Already on waitlist", position: existing.position },
        { status: 200 },
      );
    }

    // Get current count for position
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = (count || 0) + 1;

    // Add to waitlist
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email: body.email,
          fid: body.fid,
          username: body.username,
          wallet_address: body.wallet_address,
          position,
          referral_code: generateReferralCode(),
          referred_by: body.referred_by,
          source: body.source || "website",
          metadata: {
            user_agent: request.headers.get("user-agent"),
            ip_country: request.headers.get("cf-ipcountry"),
            timestamp: new Date().toISOString(),
          },
        },
      ])
      .select();

    if (error) {
      console.error("Waitlist error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send welcome email if email provided
    if (body.email && process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "FarDrops <noreply@fardrops.xyz>",
          to: body.email,
          subject: `You're #${position} on the FarDrops waitlist!`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1>Welcome to FarDrops! 🎉</h1>
              <p>You're officially #${position} on our waitlist!</p>
              <p>We're building the first dedicated airdrop tracker for Farcaster, and we can't wait to share it with you.</p>
              <p>Here's your referral code: <strong>${data?.[0]?.referral_code}</strong></p>
              <p>Share it with friends to move up the waitlist!</p>
              <hr />
              <p style="color: #666; font-size: 14px;">
                Follow us on <a href="https://warpcast.com/fardrops">Warpcast</a> for updates.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        position,
        referral_code: data?.[0]?.referral_code,
        message: `You're #${position} on the waitlist!`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const referral_code = searchParams.get("referral_code");

    if (!referral_code) {
      // Get total count
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      return NextResponse.json({ total: count || 0 });
    }

    // Get position for referral code
    const { data, error } = await supabase
      .from("waitlist")
      .select("position, username")
      .eq("referral_code", referral_code)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      position: data.position,
      username: data.username,
    });
  } catch (error) {
    console.error("Error fetching waitlist info:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist info" },
      { status: 500 },
    );
  }
}

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
