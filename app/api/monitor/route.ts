import { NextResponse } from 'next/server'
import { searchForAirdrops } from '@/lib/farcaster'
import { saveAirdrop, getActiveAirdrops } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// This endpoint will be called by cron jobs to monitor for new airdrops
export async function GET(request: Request) {
  try {
    // Check for auth header (basic security for cron endpoint)
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.CRON_SECRET || 'development'}`
    
    if (process.env.NODE_ENV === 'production' && authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Search for new airdrops
    const detections = await searchForAirdrops()
    
    // Get existing airdrops to avoid duplicates
    const existingAirdrops = await getActiveAirdrops()
    const existingHashes = new Set(existingAirdrops.map(a => a.cast_hash))
    
    // Filter out duplicates and save new ones
    const newAirdrops = []
    for (const detection of detections) {
      if (!existingHashes.has(detection.castHash)) {
        const airdrop = await saveAirdrop({
          project_name: detection.projectName || 'Unknown',
          token_symbol: detection.tokenSymbol,
          detected_at: new Date().toISOString(),
          cast_hash: detection.castHash,
          channel: detection.channel,
          claim_url: detection.claimUrl,
          is_active: true,
          eligibility_criteria: {
            text: detection.text,
            fid: detection.fid
          }
        })
        
        if (airdrop) {
          newAirdrops.push(airdrop)
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      checked: detections.length,
      new: newAirdrops.length,
      airdrops: newAirdrops
    })
  } catch (error) {
    console.error('Monitor error:', error)
    return NextResponse.json(
      { error: 'Failed to monitor airdrops' },
      { status: 500 }
    )
  }
}

// Manual trigger for testing
export async function POST(request: Request) {
  return GET(request)
}