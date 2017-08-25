#!/usr/bin/env bash
if [ "$API" == "true" ]; then
  cd backend && python3 app.py
else
  node server.js
fi