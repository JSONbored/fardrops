import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder-service-key'

// Client for browser/public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export interface Airdrop {
  id: string
  project_name: string
  token_symbol?: string
  detected_at: string
  claim_deadline?: string
  eligibility_criteria?: any
  cast_hash: string
  channel?: string
  estimated_value?: number
  claim_url?: string
  is_active: boolean
}

export interface Subscription {
  fid: number
  email?: string
  discord_webhook?: string
  telegram_chat_id?: string
  tier: 'free' | 'pro' | 'team'
  eth_address?: string
  subscription_expires_at?: string
}

export interface UserAlert {
  id: string
  user_fid: number
  airdrop_id: string
  notified_at: string
  notification_method: 'discord' | 'telegram' | 'email' | 'in_app'
}

export interface PaymentTransaction {
  id: string
  fid: number
  tx_hash: string
  amount: number
  token: string
  tier: string
  status: 'pending' | 'confirmed' | 'failed'
  created_at: string
}

// Airdrop operations
export async function saveAirdrop(airdrop: Omit<Airdrop, 'id'>): Promise<Airdrop | null> {
  const { data, error } = await supabaseAdmin
    .from('airdrops')
    .insert(airdrop)
    .select()
    .single()
  
  if (error) {
    console.error('Error saving airdrop:', error)
    return null
  }
  
  return data
}

export async function getActiveAirdrops(): Promise<Airdrop[]> {
  const { data, error } = await supabase
    .from('airdrops')
    .select('*')
    .eq('is_active', true)
    .order('detected_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching airdrops:', error)
    return []
  }
  
  return data || []
}

// Subscription operations
export async function getSubscription(fid: number): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('fid', fid)
    .single()
  
  if (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
  
  return data
}

export async function updateSubscription(
  fid: number, 
  updates: Partial<Subscription>
): Promise<boolean> {
  const { error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('fid', fid)
  
  if (error) {
    console.error('Error updating subscription:', error)
    return false
  }
  
  return true
}

// Alert operations
export async function createAlert(alert: Omit<UserAlert, 'id'>): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('user_alerts')
    .insert(alert)
  
  if (error) {
    console.error('Error creating alert:', error)
    return false
  }
  
  return true
}

export async function getUserAlerts(fid: number): Promise<UserAlert[]> {
  const { data, error } = await supabase
    .from('user_alerts')
    .select('*')
    .eq('user_fid', fid)
    .order('notified_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching alerts:', error)
    return []
  }
  
  return data || []
}

// Payment operations
export async function recordPayment(
  payment: Omit<PaymentTransaction, 'id' | 'created_at'>
): Promise<PaymentTransaction | null> {
  const { data, error } = await supabaseAdmin
    .from('payment_transactions')
    .insert(payment)
    .select()
    .single()
  
  if (error) {
    console.error('Error recording payment:', error)
    return null
  }
  
  return data
}

export async function updatePaymentStatus(
  txHash: string,
  status: PaymentTransaction['status']
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('payment_transactions')
    .update({ status })
    .eq('tx_hash', txHash)
  
  if (error) {
    console.error('Error updating payment status:', error)
    return false
  }
  
  return true
}