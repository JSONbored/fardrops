import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Suppress specific console errors from browser extensions
export function suppressExtensionErrors() {
  if (typeof window === 'undefined') return

  const originalError = window.console.error
  window.console.error = (...args: any[]) => {
    const errorString = args.join(' ')
    
    // Suppress known extension errors
    const suppressPatterns = [
      'chrome.runtime.sendMessage',
      'Extension ID',
      'MetaMask',
      'ethereum',
      'web3',
      'Failed to fetch',
      'ResizeObserver loop',
      'Non-Error promise rejection',
      'CONTEXT_LOST_WEBGL'
    ]
    
    const shouldSuppress = suppressPatterns.some(pattern => 
      errorString.includes(pattern)
    )
    
    if (!shouldSuppress) {
      originalError.apply(console, args)
    }
  }
}

// Safe window check
export function isBrowser() {
  return typeof window !== 'undefined'
}

// Safe localStorage access
export function getLocalStorage(key: string, defaultValue: any = null) {
  if (!isBrowser()) return defaultValue
  
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setLocalStorage(key: string, value: any) {
  if (!isBrowser()) return
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore localStorage errors (private browsing, etc)
  }
}