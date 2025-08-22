#!/bin/bash

echo "🧪 Testing FarDrops Mini App Setup..."
echo ""

# Test frame.json
echo "1. Testing frame.json..."
if curl -s https://fardrops.xyz/frame.json | grep -q "FarDrops"; then
  echo "✅ frame.json is accessible"
else
  echo "❌ frame.json not found or invalid"
fi

# Test applinks
echo ""
echo "2. Testing applinks.json..."
if curl -s https://fardrops.xyz/.well-known/applinks.json | grep -q "farcaster"; then
  echo "✅ applinks.json is accessible"
else
  echo "❌ applinks.json not found"
fi

# Test webhook endpoint
echo ""
echo "3. Testing webhook endpoint..."
RESPONSE=$(curl -s -X POST https://fardrops.xyz/api/webhooks/farcaster \
  -H "Content-Type: application/json" \
  -d '{"type":"test","data":{"fid":"test"}}')
  
if echo "$RESPONSE" | grep -q "success"; then
  echo "✅ Webhook endpoint responding"
else
  echo "❌ Webhook endpoint not working"
fi

# Test main page
echo ""
echo "4. Testing main page..."
if curl -s https://fardrops.xyz | grep -q "FarDrops"; then
  echo "✅ Main page loading"
else
  echo "❌ Main page not loading"
fi

echo ""
echo "📱 Next Steps:"
echo "1. Test in Warpcast Developer Mode"
echo "2. Submit to Farcaster Mini Apps directory"
echo "3. Register on Base Builders directory"