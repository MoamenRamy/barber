#!/bin/bash

# Backup photos
if [ -d "utils/public/" ]; then
  cp -r utils/public/ utils/public_backup/
fi

# Pull latest code
git clone https://github.com/MoamenRamy/barber.git

# Restore photos
if [ -d "utils/public_backup/" ]; then
  mv utils/public_backup/ utils/public/
fi
