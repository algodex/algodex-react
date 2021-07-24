#!/bin/bash
set -ex
cd /repos/algodex-sdk
yarn link
cd /repos/algodex-api/javascript
yarn link
cd /app
rm -rf node_modules/@algodex
yarn link @algodex/algodex-sdk
yarn link @algodex/algodex-api
yarn
yarn dev
