#!/usr/bin/env bash
git pull
cd server
pnpm i
npm run dev &
cd ../client/mobile
pnpm i
npm run dev &