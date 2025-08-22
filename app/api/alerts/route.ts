import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fid = searchParams.get("fid");

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("user_alerts")
      .select("*")
      .eq("fid", fid)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ alerts: data || [] });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("user_alerts")
      .insert([
        {
          fid: body.fid,
          alert_type: body.alert_type || "all",
          channels: body.channels || ["farcaster"],
          keywords: body.keywords || [],
          min_value: body.min_value || 0,
          enabled: true,
          notification_settings: {
            email: body.email,
            discord_webhook: body.discord_webhook,
            telegram_chat_id: body.telegram_chat_id,
          },
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, alert: data?.[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json(
      { error: "Failed to create alert" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const alertId = searchParams.get("id");
    const fid = searchParams.get("fid");

    if (!alertId || !fid) {
      return NextResponse.json(
        { error: "Alert ID and FID are required" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("user_alerts")
      .delete()
      .eq("id", alertId)
      .eq("fid", fid);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting alert:", error);
    return NextResponse.json(
      { error: "Failed to delete alert" },
      { status: 500 },
    );
  }
}
