import { NextRequest, NextResponse } from "next/server";
import { GET as getAllMonitors } from "../all/route";

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

    // Create a mock request with proper authorization header
    const mockHeaders = new Headers();
    mockHeaders.set(
      "Authorization",
      `Bearer ${process.env.CRON_SECRET || "development"}`,
    );
    mockHeaders.set("Content-Type", "application/json");

    const mockRequest = new NextRequest("http://internal/api/monitor/all", {
      headers: mockHeaders,
    });

    // Call the monitor function directly - no external fetch, no SSRF risk
    const response = await getAllMonitors(mockRequest);
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
