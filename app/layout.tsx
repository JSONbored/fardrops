import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from './providers'
import { MiniAppProvider } from '@/components/MiniAppProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FarDrops - Never Miss a Farcaster Airdrop',
  description: 'The first dedicated airdrop tracker for the Farcaster ecosystem. Track DEGEN, frame tokens, NFT drops and more.',
  metadataBase: new URL('https://fardrops.xyz'),
  openGraph: {
    title: 'FarDrops - Farcaster Airdrop Tracker',
    description: 'Never miss another Farcaster airdrop',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Script
          id="suppress-extension-errors"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress browser extension errors and override problematic APIs
              if (typeof window !== 'undefined') {
                // Suppress console errors
                const originalError = window.console.error;
                window.console.error = function(...args) {
                  const errorString = args.join(' ');
                  if (
                    errorString.includes('chrome.runtime.sendMessage') ||
                    errorString.includes('Extension ID') ||
                    errorString.includes('MetaMask') ||
                    errorString.includes('ResizeObserver loop') ||
                    errorString.includes('CONTEXT_LOST_WEBGL') ||
                    errorString.includes('opfgelmcmbiajamepnmloijbpoleiama')
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                // Override chrome.runtime.sendMessage if it exists
                if (typeof chrome !== 'undefined' && chrome.runtime) {
                  const originalSendMessage = chrome.runtime.sendMessage;
                  chrome.runtime.sendMessage = function(extensionId, ...args) {
                    // If called without an extension ID from a webpage, ignore
                    if (typeof extensionId !== 'string' || !extensionId) {
                      return;
                    }
                    // Otherwise call the original function
                    return originalSendMessage.call(this, extensionId, ...args);
                  };
                }
              }
            `,
          }}
        />
        <Providers>
          <MiniAppProvider>
            {children}
          </MiniAppProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}