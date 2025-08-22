# 🎁 FarDrops

> The first dedicated airdrop tracker built specifically for the Farcaster ecosystem.

![Build Status](https://img.shields.io/github/actions/workflow/status/JSONbored/fardrops/main.yml?branch=main&style=flat-square)
![License](https://img.shields.io/github/license/JSONbored/fardrops?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)

## Overview

FarDrops automatically monitors the Farcaster network for airdrop announcements, tracks eligibility, and sends instant notifications when you qualify. Never miss another DEGEN drop, Clanker token, or NFT mint again.

### Key Features

- **🔍 Automated Detection** - Real-time monitoring of Farcaster channels and casts
- **📱 Farcaster Native** - Built as a Mini App for seamless integration
- **🔔 Instant Alerts** - Multi-channel notifications (Farcaster, Discord, Telegram)
- **💎 Eligibility Checking** - Automatic wallet and FID verification
- **⚡ Built on Base** - Lightning-fast transactions with minimal fees

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- [Supabase](https://supabase.com) account (free tier works)
- [Farcaster](https://warpcast.com) account

### Installation

```bash
# Clone the repository
git clone https://github.com/JSONbored/fardrops.git
cd fardrops

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Optional
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key
RESEND_API_KEY=your_resend_key
TELEGRAM_BOT_TOKEN=your_bot_token
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Base L2, Wagmi, Viem, OnchainKit
- **Farcaster**: Mini App SDK, Auth Kit
- **Database**: Supabase (PostgreSQL)
- **Infrastructure**: Vercel, GitHub Actions

## Project Structure

```
fardrops/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
├── lib/                   # Utilities & helpers
├── public/
│   └── .well-known/
│       └── farcaster.json # Mini App manifest
└── supabase/              # Database schema
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Deployment

The app is configured for automatic deployment via Vercel:

1. Push to `main` branch triggers production deployment
2. Pull requests create preview deployments
3. GitHub Actions handle CI/CD and monitoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Base Summer League

FarDrops is participating in the [Base Summer League Builder Rewards](https://base.mirror.xyz/S8mQ_fOh-7DhvgHXlR7v01HRRLqAKVxKdxEEUkYxhyY) program, building on Base to provide the best possible experience for Farcaster users.

## About

Built by [JSONbored](https://github.com/JSONbored)

- **Farcaster**: [@JSONbored](https://warpcast.com/jsonbored) | [@FarDrops](https://warpcast.com/fardrops)
- **Website**: [fardrops.xyz](https://fardrops.xyz)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

Need help? Found a bug? Have a feature request?

- Open an [issue on GitHub](https://github.com/JSONbored/fardrops/issues)
- Message us on [Farcaster](https://warpcast.com/fardrops)

---

⭐ Star this repo if you find it useful!
