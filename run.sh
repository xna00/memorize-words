#!/usr/bin/env bash
git pull
cd client/web
npm i
npm run build
cd ../../server
npm i
tsc
cd ..
node server/dist/server/main.js
