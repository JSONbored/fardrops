import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with fallback
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || "all";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("airdrops")
      .select("*")
      .order("detected_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      airdrops: data || [],
      total: data?.length || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching airdrops:", error);
    return NextResponse.json(
      { error: "Failed to fetch airdrops" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("airdrops")
      .insert([
        {
          project_name: body.project_name,
          token_symbol: body.token_symbol,
          description: body.description,
          claim_url: body.claim_url,
          eligibility_criteria: body.eligibility_criteria,
          total_value: body.total_value,
          status: body.status || "pending",
          start_date: body.start_date,
          end_date: body.end_date,
          chain: body.chain || "base",
          verified: false,
          source_cast_hash: body.source_cast_hash,
          detected_by_fid: body.detected_by_fid,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, airdrop: data?.[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating airdrop:", error);
    return NextResponse.json(
      { error: "Failed to create airdrop" },
      { status: 500 },
    );
  }
}
