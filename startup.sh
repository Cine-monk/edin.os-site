#!/bin/sh
set -eu
cd /workspace
if curl -sf http://127.0.0.1:8080/ >/dev/null 2>&1; then
  exit 0
fi
npm run dev >/tmp/edin-dev.log 2>&1 &
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
  if curl -sf http://127.0.0.1:8080/ >/dev/null 2>&1; then
    exit 0
  fi
  sleep 0.5
done
exit 0
