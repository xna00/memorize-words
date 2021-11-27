#!/usr/bin/env bash
git pull
cd client/web
rm package-lock.json
npm i
npm run build
cd ../../server
rm package-lock.json
npm i
tsc
cd ..
node server/dist/server/main.js
