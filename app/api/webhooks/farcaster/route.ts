import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

// Webhook endpoint for Farcaster Mini App events
export async function POST(request: NextRequest) {
  try {
    let body: any;

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.FARCASTER_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get("x-farcaster-signature");
      const bodyText = await request.text();

      // Calculate expected signature
      const expectedSignature = createHmac("sha256", webhookSecret)
        .update(bodyText)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 },
        );
      }

      // Parse body after verification
      body = JSON.parse(bodyText);
    } else {
      // Development mode - accept without signature
      body = await request.json();
    }

    // Validate event structure
    if (!body.type || !body.data) {
      return NextResponse.json(
        { error: "Invalid event structure" },
        { status: 400 },
      );
    }

    const { type, data } = body;

    switch (type) {
      case "app.opened":
        // Track app opens for analytics
        const sanitizedFidOpen = String(data.fid)
          .replace(/[\r\n\t]/g, "")
          .substring(0, 50);
        console.log(`App opened by user: ${JSON.stringify(sanitizedFidOpen)}`);
        break;

      case "app.closed":
        // Clean up any session data
        const sanitizedFidClose = String(data.fid)
          .replace(/[\r\n\t]/g, "")
          .substring(0, 50);
        console.log(`App closed by user: ${JSON.stringify(sanitizedFidClose)}`);
        break;

      case "user.authenticated":
        // Handle user authentication
        const sanitizedFidAuth = String(data.fid)
          .replace(/[\r\n\t]/g, "")
          .substring(0, 50);
        console.log(`User authenticated: ${JSON.stringify(sanitizedFidAuth)}`);
        break;

      default:
        // Remove newlines and limit length to prevent log injection from event type
        const rawType = typeof type === "string" ? type : String(type);
        const sanitizedType = rawType
          .replace(/[\r\n\t]/g, "")
          .substring(0, 100);
        // Use a fixed prefix to avoid injection
        console.log(`Unknown event type: ${JSON.stringify(sanitizedType)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Sanitize error message to prevent log injection
    const errorMessage = error instanceof Error ? error.message : String(error);
    const sanitizedError = errorMessage
      .replace(/[\r\n\t]/g, "")
      .substring(0, 200);
    console.error(`Webhook error: ${JSON.stringify(sanitizedError)}`);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}
