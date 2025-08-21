import { getSSLHubRpcClient } from '@farcaster/hub-nodejs'

const HUB_URL = process.env.FARCASTER_HUB_URL || 'hub-grpc.pinata.cloud'

export const hubClient = getSSLHubRpcClient(HUB_URL)

export const AIRDROP_KEYWORDS = [
  'airdrop',
  'claim',
  'eligible',
  'eligibility', 
  'snapshot',
  'allocation',
  'distribution',
  'drop',
  'free',
  'token',
  'mint',
  'allowlist',
  'whitelist'
]

export const MONITORED_CHANNELS = [
  'degen',
  'base', 
  'frames',
  'zora',
  'farcaster',
  'higher',
  'memes',
  'nft',
  'defi'
]

export interface AirdropDetection {
  castHash: string
  fid: number
  username: string
  text: string
  channel: string
  timestamp: number
  embeds: any[]
  projectName?: string
  tokenSymbol?: string
  claimUrl?: string
}

export async function searchForAirdrops(): Promise<AirdropDetection[]> {
  const detections: AirdropDetection[] = []
  
  try {
    // Search each channel for airdrop keywords
    for (const channel of MONITORED_CHANNELS) {
      const result = await hubClient.getCastsByParent({
        parentUrl: `chain://eip155:1/erc721:${channel}`
      })
      
      if (result.isOk()) {
        const casts = result.value.messages
        
        for (const message of casts) {
          const cast = message.data?.castAddBody
          if (!cast) continue
          
          const text = cast.text.toLowerCase()
          const hasAirdropKeyword = AIRDROP_KEYWORDS.some(keyword => 
            text.includes(keyword)
          )
          
          if (hasAirdropKeyword) {
            detections.push({
              castHash: Buffer.from(message.hash).toString('hex'),
              fid: message.data?.fid || 0,
              username: '', // Would need to fetch user data
              text: cast.text,
              channel,
              timestamp: message.data?.timestamp || Date.now(),
              embeds: cast.embeds || [],
              projectName: extractProjectName(cast.text),
              tokenSymbol: extractTokenSymbol(cast.text),
              claimUrl: extractClaimUrl(cast.text, cast.embeds)
            })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error searching for airdrops:', error)
  }
  
  return detections
}

function extractProjectName(text: string): string | undefined {
  // Extract project name from text using patterns
  const patterns = [
    /(?:@|from\s+)(\w+)/i,
    /(\w+)\s+(?:airdrop|token|drop)/i,
    /claim\s+(?:your\s+)?(\w+)/i
  ]
  
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  
  return undefined
}

function extractTokenSymbol(text: string): string | undefined {
  // Look for token symbols (usually uppercase, 3-5 chars)
  const pattern = /\$?([A-Z]{2,8})\b/
  const match = text.match(pattern)
  return match ? match[1] : undefined
}

function extractClaimUrl(text: string, embeds: any[]): string | undefined {
  // Check embeds first
  if (embeds && embeds.length > 0) {
    for (const embed of embeds) {
      if (embed.url) return embed.url
    }
  }
  
  // Check text for URLs
  const urlPattern = /https?:\/\/[^\s]+/g
  const urls = text.match(urlPattern)
  return urls ? urls[0] : undefined
}

export async function getUserProfile(fid: number) {
  const result = await hubClient.getUserDataByFid({ fid })
  if (result.isOk()) {
    return result.value.messages
  }
  return null
}

export async function checkPowerBadge(fid: number): Promise<boolean> {
  try {
    const userData = await getUserProfile(fid)
    if (!userData) return false
    
    // Check for power badge in user data
    // This would need to be implemented based on actual power badge detection
    return false
  } catch (error) {
    console.error('Error checking power badge:', error)
    return false
  }
}