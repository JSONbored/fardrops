import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

// Webhook endpoint for Farcaster Mini App events
export async function POST(request: NextRequest) {
  try {
    let body: any
    
    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.FARCASTER_WEBHOOK_SECRET
    if (webhookSecret) {
      const signature = request.headers.get('x-farcaster-signature')
      const bodyText = await request.text()
      
      // Calculate expected signature
      const expectedSignature = createHmac('sha256', webhookSecret)
        .update(bodyText)
        .digest('hex')
      
      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
      
      // Parse body after verification
      body = JSON.parse(bodyText)
    } else {
      // Development mode - accept without signature
      body = await request.json()
    }
    
    // Validate event structure
    if (!body.type || !body.data) {
      return NextResponse.json(
        { error: 'Invalid event structure' },
        { status: 400 }
      )
    }
    
    const { type, data } = body
    
    switch (type) {
      case 'app.opened':
        // Track app opens for analytics
        console.log('App opened by user:', data.fid)
        break
        
      case 'app.closed':
        // Clean up any session data
        console.log('App closed by user:', data.fid)
        break
        
      case 'user.authenticated':
        // Handle user authentication
        console.log('User authenticated:', data.fid)
        break
        
      default:
        console.log('Unknown event type:', type)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}