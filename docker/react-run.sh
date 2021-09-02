#!/bin/bash
set -ex
cd /repos/algodex-sdk
npm ci
yarn link
cd /app
rm -rf "node_modules/@algodex"
yarn link "@algodex/algodex-sdk"
yarn
echo 'NEXT_PUBLIC_API=http://localhost:8001' > /app/.env.local
yarn dev
