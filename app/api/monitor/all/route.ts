import { NextRequest, NextResponse } from "next/server";
import { GET as getClankerMonitor } from "../clanker/route";
import { GET as getDegenMonitor } from "../degen/route";
import { GET as getPowerBadgeMonitor } from "../power-badge/route";
import { GET as getGeneralMonitor } from "../route";

// Import all monitor functions
const monitors = [
  { name: "Clanker", handler: getClankerMonitor },
  { name: "DEGEN", handler: getDegenMonitor },
  { name: "Power Badge", handler: getPowerBadgeMonitor },
  { name: "General", handler: getGeneralMonitor },
];

interface MonitorResult {
  monitor: string;
  success: boolean;
  data?: any;
  error?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Auth check
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.CRON_SECRET || "development"}`;

    if (process.env.NODE_ENV === "production" && authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🚀 Running all airdrop monitors...");

    const results: MonitorResult[] = [];

    // Run all monitors in parallel - calling functions directly, no fetch needed
    const monitorPromises = monitors.map(
      async (monitor): Promise<MonitorResult> => {
        try {
          console.log(`Running ${monitor.name} monitor...`);

          // Create a mock request for the monitor function
          const mockHeaders = new Headers();
          mockHeaders.set("Authorization", authHeader || "");
          mockHeaders.set("Content-Type", "application/json");

          const mockRequest = new NextRequest("http://internal", {
            headers: mockHeaders,
          });

          // Call the monitor function directly - no external fetch, no SSRF risk
          const response = await monitor.handler(mockRequest);

          if (response.ok) {
            const data = await response.json();
            return {
              monitor: monitor.name,
              success: true,
              data,
            };
          } else {
            return {
              monitor: monitor.name,
              success: false,
              error: `HTTP ${response.status}`,
            };
          }
        } catch (error) {
          console.error(`${monitor.name} monitor failed:`, error);
          return {
            monitor: monitor.name,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
    );

    const monitorResults = await Promise.allSettled(monitorPromises);

    for (const result of monitorResults) {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        results.push({
          monitor: "Unknown",
          success: false,
          error: result.reason,
        });
      }
    }

    // Calculate totals
    const totalAirdrops = results.reduce((sum, r) => {
      if (r.success && "data" in r && r.data) {
        return sum + (r.data.airdropsFound || r.data.tokensFound || 0);
      }
      return sum;
    }, 0);

    const successfulMonitors = results.filter((r) => r.success).length;

    console.log(
      `✅ Monitoring complete: ${totalAirdrops} airdrops found across ${successfulMonitors}/${monitors.length} monitors`,
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalAirdrops,
        successfulMonitors,
        totalMonitors: monitors.length,
      },
      results,
    });
  } catch (error) {
    console.error("Master monitoring error:", error);
    return NextResponse.json(
      { error: "Failed to run monitors" },
      { status: 500 },
    );
  }
}

// This endpoint can be called by Vercel Cron or GitHub Actions
export async function POST(request: NextRequest) {
  // Same as GET but for POST requests
  return GET(request);
}
