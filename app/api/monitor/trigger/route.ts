import { NextRequest, NextResponse } from "next/server";

// Public endpoint that can be called by external services
// Use with: UptimeRobot, Cron-job.org, or EasyCron (all have free tiers)

export async function GET(request: NextRequest) {
  try {
    // Simple auth check - can be called with a secret in query params
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get("secret");

    if (
      secret !== process.env.CRON_SECRET &&
      process.env.NODE_ENV === "production"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use a fixed internal URL to prevent SSRF
    const internalUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://fardrops.xyz"
        : "http://localhost:3000";

    const authHeader = `Bearer ${process.env.CRON_SECRET || "development"}`;

    // Trigger all monitors with validated URL
    const response = await fetch(`${internalUrl}/api/monitor/all`, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      triggered: new Date().toISOString(),
      results: data,
    });
  } catch (error) {
    console.error("Trigger error:", error);
    return NextResponse.json(
      { error: "Failed to trigger monitors" },
      { status: 500 },
    );
  }
}

// Health check endpoint for monitoring services
export async function HEAD() {
  return new Response(null, { status: 200 });
}
