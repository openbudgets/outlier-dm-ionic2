#!/usr/bin/env bash
if [ "$API" == "true" ]; then
  cd backend
  pip3 install -r requirements.txt
  python3 app.py $PORT
else
  node server.js
fi