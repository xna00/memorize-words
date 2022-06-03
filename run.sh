#!/usr/bin/env bash
git reset --hard HEAD
git pull
cd server
pnpm i
npm run dev &
cd ../client/mobile
pnpm i
npm run dev &