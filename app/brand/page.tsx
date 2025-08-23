"use client";

import { useState } from "react";
import { Download, Copy, Check, Droplets, Sparkles } from "lucide-react";

export default function BrandPage() {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const colors = {
    primary: {
      purple: "#8B5CF6", // Main brand purple
      dark: "#7C3AED", // Darker purple for hover
      light: "#A78BFA", // Light purple for accents
    },
    secondary: {
      mint: "#10B981", // Success/positive
      blue: "#3B82F6", // Info/links
      pink: "#EC4899", // Highlight/special
    },
    neutral: {
      black: "#0A0A0B", // Pure dark
      gray900: "#18181B", // Background dark
      gray800: "#27272A", // Card background
      gray700: "#3F3F46", // Borders
      gray600: "#52525B", // Muted text
      gray400: "#A1A1AA", // Placeholder
      gray200: "#E4E4E7", // Light borders
      white: "#FFFFFF", // Pure white
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Droplets className="w-20 h-20 text-purple-500" />
              <Sparkles className="w-8 h-8 text-purple-400 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            FarDrops Brand Kit
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The first dedicated airdrop tracker for the Farcaster ecosystem.
            Never miss a drop, always catch the alpha.
          </p>
        </div>

        {/* Logo Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Logo & Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Logo */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="bg-gray-900 rounded-lg p-6 mb-4 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle
                    cx="60"
                    cy="60"
                    r="58"
                    fill="#8B5CF6"
                    fillOpacity="0.1"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  />
                  <path d="M60 25L75 45L45 45Z" fill="#8B5CF6" />
                  <path
                    d="M50 50L70 50L70 70L50 70Z"
                    fill="#A78BFA"
                    fillOpacity="0.8"
                  />
                  <path d="M45 75L75 75L65 95L55 95Z" fill="#7C3AED" />
                  <circle cx="60" cy="60" r="4" fill="#FFFFFF" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Primary Logo</h3>
              <p className="text-gray-400 text-sm mb-4">
                Main brand mark for all uses
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Download SVG
              </button>
            </div>

            {/* Icon Only */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <rect width="120" height="120" rx="24" fill="#8B5CF6" />
                  <path d="M60 30L80 55H40L60 30Z" fill="white" />
                  <path
                    d="M40 65H80V85H40V65Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                  <circle cx="60" cy="75" r="6" fill="#8B5CF6" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">App Icon</h3>
              <p className="text-gray-400 text-sm mb-4">
                For app stores and favicons
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Download PNG
              </button>
            </div>

            {/* Wordmark */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="bg-gray-900 rounded-lg p-6 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Droplets className="w-8 h-8 text-purple-500" />
                  <span className="text-2xl font-bold text-white">
                    FarDrops
                  </span>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-2">Wordmark</h3>
              <p className="text-gray-400 text-sm mb-4">
                Logo with text for headers
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Download SVG
              </button>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Color Palette</h2>

          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Primary Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(colors.primary).map(([name, hex]) => (
                <div
                  key={name}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <div
                    className="h-24 rounded-lg mb-3"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium capitalize">
                        {name}
                      </p>
                      <p className="text-gray-400 text-sm">{hex}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(hex, name)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedText === name ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Secondary Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(colors.secondary).map(([name, hex]) => (
                <div
                  key={name}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <div
                    className="h-24 rounded-lg mb-3"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium capitalize">
                        {name}
                      </p>
                      <p className="text-gray-400 text-sm">{hex}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(hex, name)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedText === name ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Neutral Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(colors.neutral).map(([name, hex]) => (
                <div
                  key={name}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <div
                    className="h-16 rounded-lg mb-3 border border-gray-600"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white text-sm font-medium capitalize">
                        {name}
                      </p>
                      <p className="text-gray-400 text-xs">{hex}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(hex, name)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedText === name ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Typography</h2>
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Display</p>
                <h1 className="text-5xl font-bold text-white">
                  Never Miss a Drop
                </h1>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Heading 1</p>
                <h1 className="text-4xl font-bold text-white">
                  Track Every Airdrop
                </h1>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Heading 2</p>
                <h2 className="text-3xl font-semibold text-white">
                  Farcaster Native
                </h2>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Body Large</p>
                <p className="text-lg text-gray-300">
                  The first and only airdrop tracker built specifically for the
                  Farcaster ecosystem.
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Body</p>
                <p className="text-base text-gray-300">
                  Monitor DEGEN, Clanker tokens, NFT drops, and Power Badge
                  exclusives all in one place.
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Caption</p>
                <p className="text-sm text-gray-400">
                  Real-time notifications • Eligibility checking • Multi-chain
                  support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Voice */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Brand Voice & Messaging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Our Voice
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <strong>Knowledgeable:</strong> We know the Farcaster
                    ecosystem inside out
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <strong>Helpful:</strong> We&apos;re here to make sure you
                    never miss opportunities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <strong>Timely:</strong> Speed matters in crypto - we
                    deliver instant alerts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <strong>Trustworthy:</strong> Accurate information, no hype,
                    just facts
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Key Messages
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-purple-400 font-semibold mb-1">Tagline</p>
                  <p className="text-white">&ldquo;Never miss a drop&rdquo;</p>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold mb-1">
                    Value Prop
                  </p>
                  <p className="text-white">
                    &ldquo;The first dedicated airdrop tracker for
                    Farcaster&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold mb-1">Mission</p>
                  <p className="text-white">
                    &ldquo;Democratizing airdrop access for the Farcaster
                    community&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Usage Guidelines
          </h2>
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-500 mb-4">
                  ✓ Do&apos;s
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Use purple gradient backgrounds for premium feel</li>
                  <li>• Maintain consistent spacing and padding</li>
                  <li>• Use dark mode as default</li>
                  <li>• Keep messaging concise and actionable</li>
                  <li>• Use animation sparingly for delight</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-4">
                  ✗ Don&apos;ts
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Don&apos;t stretch or distort the logo</li>
                  <li>• Don&apos;t use off-brand colors</li>
                  <li>• Don&apos;t use light backgrounds</li>
                  <li>• Don&apos;t over-promise or guarantee profits</li>
                  <li>• Don&apos;t use generic crypto imagery</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Download Complete Brand Kit
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get all logos, icons, colors, and guidelines in one package.
              Available in multiple formats for all your needs.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                <Download className="w-5 h-5 inline mr-2" />
                Download Brand Kit
              </button>
              <button className="bg-purple-800 text-white hover:bg-purple-900 px-6 py-3 rounded-lg font-semibold transition-colors">
                View Figma File
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
