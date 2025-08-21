# 🎁 FarDrops

<div align="center">
  
  ![FarDrops Banner](https://img.shields.io/badge/🚀_FarDrops-Farcaster_Airdrop_Tracker-8B5CF6?style=for-the-badge&labelColor=1a1a2e)
  
  <p align="center">
    <strong>Never miss another Farcaster airdrop again.</strong>
  </p>
  
  <p align="center">
    The first dedicated airdrop tracker built specifically for the Farcaster ecosystem.
    <br />
    Track DEGEN, Clanker tokens, NFT drops, and more—all in one place.
  </p>

  <p align="center">
    <a href="https://fardrops.xyz">
      <img src="https://img.shields.io/badge/Website-fardrops.xyz-blue?style=flat-square" alt="Website" />
    </a>
    <a href="https://warpcast.com/fardrops">
      <img src="https://img.shields.io/badge/Farcaster-@fardrops-purple?style=flat-square" alt="Farcaster" />
    </a>
    <a href="#-built-on-base">
      <img src="https://img.shields.io/badge/Built_on-Base-0052FF?style=flat-square" alt="Base" />
    </a>
    <a href="https://github.com/JSONbored/fardrops/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
    </a>
  </p>

  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-roadmap">Roadmap</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 🌟 Why FarDrops?

The Farcaster ecosystem is exploding with opportunities—new tokens launching daily through Clanker, exclusive NFT drops for Power Badge holders, and community airdrops happening across channels. **But keeping track of it all? Nearly impossible.**

FarDrops solves this by automatically monitoring the entire Farcaster network, detecting airdrops in real-time, and notifying you instantly when you're eligible.

<div align="center">
  <img src="https://img.shields.io/badge/250%2B-Clanker_Tokens_Daily-FF6B6B?style=for-the-badge" alt="Clanker Tokens" />
  <img src="https://img.shields.io/badge/15%2B-Major_Tokens-4ECDC4?style=for-the-badge" alt="Major Tokens" />
  <img src="https://img.shields.io/badge/100%2B-Active_Channels-95E1D3?style=for-the-badge" alt="Active Channels" />
</div>

## ✨ Key Features

### 🔍 **Automated Detection**
- Real-time monitoring of Farcaster channels and casts
- Smart contract event tracking on Base
- Frame metadata analysis for interactive airdrops
- Clanker bot monitoring (250+ new tokens daily)

### 📱 **Farcaster Native**
- Built as a Farcaster Mini App—use it directly in your feed
- One-click wallet connection with Farcaster auth
- Power Badge holder exclusive tracking
- Social proof from your network

### 🔔 **Instant Notifications**
- In-app alerts through Farcaster
- Discord webhook integration
- Telegram bot notifications
- Email alerts (optional)

### 💎 **Eligibility Checking**
- Automatic wallet eligibility verification
- FID-based qualification tracking
- Historical activity analysis
- Channel membership verification

### 🚀 **Built on Base**
- Lightning-fast transactions on Base L2
- Gas-optimized claiming
- Direct integration with Base ecosystem
- Support for USDC, ETH, and Base tokens

## 🛠 Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Base-0052FF?style=for-the-badge&logo=ethereum&logoColor=white" alt="Base" />
  <img src="https://img.shields.io/badge/Farcaster-8B5CF6?style=for-the-badge&logo=farcaster&logoColor=white" alt="Farcaster" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

### Core Technologies
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Blockchain**: Base L2, Wagmi, Viem, OnchainKit
- **Farcaster**: Mini App SDK, Farcaster Auth Kit
- **Database**: Supabase (PostgreSQL)
- **Notifications**: Resend, Discord/Telegram webhooks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A [Supabase](https://supabase.com) account (free tier works)
- [Farcaster](https://warpcast.com) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JSONbored/fardrops.git
   cd fardrops
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` with:
   - Supabase credentials
   - OnchainKit API key (from [Coinbase Developer Platform](https://portal.cdp.coinbase.com))
   - Optional: Notification service credentials

4. **Set up the database**
   
   Run the schema in your Supabase project:
   ```bash
   # Copy contents of supabase/schema.sql to Supabase SQL editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📦 Project Structure

```
fardrops/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── airdrops/      # Airdrop CRUD operations
│   │   ├── alerts/        # User notification preferences
│   │   └── monitor/       # Automated monitoring endpoint
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── AnimatedDashboard.tsx
│   └── MiniAppProvider.tsx
├── lib/                   # Utilities & helpers
│   ├── farcaster.ts      # Farcaster Hub API client
│   ├── supabase.ts       # Database client
│   └── utils.ts          # Helper functions
├── public/
│   └── .well-known/
│       └── farcaster.json # Mini App manifest
└── supabase/
    └── schema.sql        # Database schema
```

## 🗺 Roadmap

### Phase 1: Foundation (Current)
- [x] Core airdrop detection engine
- [x] Farcaster Mini App integration
- [x] Real-time notifications
- [x] Power Badge holder features
- [ ] Public beta launch

### Phase 2: Intelligence Layer
- [ ] AI-powered eligibility prediction
- [ ] Airdrop value estimation
- [ ] Automated claiming (where possible)
- [ ] Portfolio tracking dashboard

### Phase 3: Social Features
- [ ] Share eligible airdrops with friends
- [ ] Community-submitted airdrops
- [ ] Referral rewards program
- [ ] Channel-specific tracking

### Phase 4: Multi-chain
- [ ] Ethereum mainnet support
- [ ] Optimism integration
- [ ] Arbitrum tracking
- [ ] Cross-chain portfolio view

## 🤝 Contributing

We love contributions! FarDrops is built by the Farcaster community, for the Farcaster community.

### How to Contribute

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Write clean, documented code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### Good First Issues
Check out our [good first issues](https://github.com/JSONbored/fardrops/labels/good%20first%20issue) for ways to get started!

## 🏗 Base Summer League

FarDrops is proudly participating in the [Base Summer League Builder Rewards](https://mirror.xyz/symphonyfinance.eth/jGyn6qyG78kVPfE3Ur58jLX1huGhMCQmybdaGwmKu7I) program. We're building on Base to provide the best possible experience for Farcaster users.

<div align="center">
  <img src="https://img.shields.io/badge/Base_Summer_League-Participant-0052FF?style=for-the-badge" alt="Base Summer League" />
</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Farcaster](https://farcaster.xyz) for creating an amazing decentralized social protocol
- [Base](https://base.org) for providing a fast, affordable L2
- [OnchainKit](https://onchainkit.xyz) for seamless wallet integration
- [Clanker](https://clanker.world) for revolutionizing token creation
- The entire Farcaster community for the constant innovation

## 📞 Support & Community

<div align="center">
  
  **Need help? Found a bug? Have a feature request?**
  
  <a href="https://warpcast.com/fardrops">
    <img src="https://img.shields.io/badge/Farcaster-Chat_with_us-8B5CF6?style=for-the-badge" alt="Farcaster" />
  </a>
  
  <a href="https://github.com/JSONbored/fardrops/issues">
    <img src="https://img.shields.io/badge/GitHub-Open_Issue-181717?style=for-the-badge&logo=github" alt="GitHub Issues" />
  </a>
  
</div>

---

<div align="center">
  <p>
    <strong>Built with 💜 by the Farcaster community</strong>
  </p>
  <p>
    <sub>Star ⭐ this repo if you find it useful!</sub>
  </p>
</div>