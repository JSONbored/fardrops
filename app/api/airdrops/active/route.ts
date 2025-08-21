import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabase = createClient(supabaseUrl, supabaseKey)

// Sample data for when database isn't connected
const SAMPLE_AIRDROPS = [
  {
    id: '1',
    project_name: 'BORED Token',
    token_symbol: '$BORED',
    description: 'New Clanker token launched by popular creator',
    total_value: 5000,
    status: 'live',
    chain: 'base',
    claim_url: 'https://clanker.world/token/bored',
    eligibility_criteria: {
      type: 'clanker_token',
      requirements: ['Farcaster account', 'Base wallet']
    },
    detected_at: new Date().toISOString(),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    project_name: 'DEGEN Daily Allowance',
    token_symbol: '$DEGEN',
    description: 'Daily tip allowance for active Farcaster users',
    total_value: 100,
    status: 'live',
    chain: 'base',
    claim_url: 'https://www.degen.tips',
    eligibility_criteria: {
      type: 'degen_allowance',
      requirements: ['Quality casts', 'Active engagement', 'No spam']
    },
    detected_at: new Date().toISOString()
  },
  {
    id: '3',
    project_name: 'Power Badge Exclusive NFT',
    token_symbol: 'POWER',
    description: 'Exclusive NFT mint for Power Badge holders only',
    total_value: 0,
    status: 'upcoming',
    chain: 'base',
    eligibility_criteria: {
      type: 'power_badge_exclusive',
      requirements: ['Active Power Badge', '400+ Farcaster score']
    },
    detected_at: new Date().toISOString(),
    start_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    project_name: 'Based Rewards',
    token_symbol: 'BASED',
    description: 'Rewards for Base builders and early adopters',
    total_value: 10000,
    status: 'live',
    chain: 'base',
    claim_url: 'https://base.org/rewards',
    eligibility_criteria: {
      type: 'base_builder',
      requirements: ['Deploy on Base', 'Active developer', 'GitHub contributions']
    },
    detected_at: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status') || 'all'
    const chain = searchParams.get('chain') || 'all'

    // If database is not configured, return sample data
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      console.log('Database not configured, returning sample airdrops')
      
      let filteredAirdrops = [...SAMPLE_AIRDROPS]
      
      // Apply filters
      if (status !== 'all') {
        filteredAirdrops = filteredAirdrops.filter(a => a.status === status)
      }
      if (chain !== 'all') {
        filteredAirdrops = filteredAirdrops.filter(a => a.chain === chain)
      }
      
      // Apply pagination
      const paginatedAirdrops = filteredAirdrops.slice(offset, offset + limit)
      
      return NextResponse.json({
        success: true,
        airdrops: paginatedAirdrops,
        total: filteredAirdrops.length,
        limit,
        offset,
        isTestData: true
      })
    }

    // Fetch from database
    let query = supabase
      .from('airdrops')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('detected_at', { ascending: false })

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status)
    }
    if (chain !== 'all') {
      query = query.eq('chain', chain)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      // Fallback to sample data on error
      return NextResponse.json({
        success: true,
        airdrops: SAMPLE_AIRDROPS.slice(offset, offset + limit),
        total: SAMPLE_AIRDROPS.length,
        limit,
        offset,
        isTestData: true,
        error: 'Database unavailable, showing sample data'
      })
    }

    return NextResponse.json({
      success: true,
      airdrops: data || [],
      total: count || 0,
      limit,
      offset,
      isTestData: false
    })

  } catch (error) {
    console.error('Error fetching active airdrops:', error)
    
    // Return sample data on error
    return NextResponse.json({
      success: true,
      airdrops: SAMPLE_AIRDROPS,
      total: SAMPLE_AIRDROPS.length,
      limit: 20,
      offset: 0,
      isTestData: true,
      error: 'Service temporarily unavailable'
    })
  }
}