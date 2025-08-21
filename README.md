# FarDrops - Farcaster Airdrop Tracker

Never miss another Farcaster airdrop! FarDrops is the first dedicated airdrop tracker for the Farcaster ecosystem, monitoring DEGEN, frame tokens, NFT drops and more.

## Features

- **Real-time Monitoring** - Continuously scans Farcaster channels for airdrop announcements
- **Instant Notifications** - Get alerts via Discord, Telegram, or email
- **Eligibility Checker** - Automatically verify if your account qualifies
- **Frame Detection** - Tracks frame-based airdrops and interactive mini-apps
- **Power Badge Benefits** - Special tracking for Power Badge holder exclusives
- **Crypto-Native Payments** - Pay with ETH/USDC on Base (no credit cards!)

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, OnchainKit
- **Blockchain**: Base (Ethereum L2), Wagmi, Viem, RainbowKit
- **Backend**: Farcaster Hub API, Supabase
- **Notifications**: Discord webhooks, Telegram bot, Resend (email)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)
- Vercel account for deployment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fardrops.git
cd fardrops
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with:
- Supabase credentials
- OnchainKit API key (from Coinbase Developer Platform)
- Notification service keys (optional)

5. Set up the database:
```bash
# Run the SQL schema in your Supabase project
# File: supabase/schema.sql
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
fardrops/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── monitor/       # Airdrop monitoring endpoint
│   ├── providers.tsx      # OnchainKit + Wagmi providers
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── lib/                   # Utilities
│   ├── farcaster.ts      # Farcaster Hub API client
│   └── supabase.ts       # Database client
├── public/
│   └── .well-known/
│       └── farcaster.json # Mini App manifest
└── supabase/
    └── schema.sql        # Database schema
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Set up Monitoring

Create a GitHub Action or Vercel cron job to call the `/api/monitor` endpoint every 5 minutes:

```yaml
# .github/workflows/monitor.yml
name: Monitor Airdrops
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger monitoring
        run: |
          curl -X GET https://fardrops.xyz/api/monitor \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

## Features

- **Free Tier**: Basic airdrop tracking and notifications
- **Pro Tier**: Enhanced features for power users
- **Team Tier**: Advanced features for organizations

## Security

- All API keys stored in environment variables
- Row Level Security (RLS) enabled on all database tables
- Authentication required for cron endpoints
- No sensitive data logged or exposed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For support, join our Farcaster channel: /fardrops

---

Built with Base, Farcaster, and OnchainKit