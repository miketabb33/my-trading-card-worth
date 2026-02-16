#!/bin/sh
set -e

DB_URL="postgresql://admin:admin@postgres:5432/trading_cards"

echo "Waiting for schema to be ready..."
until psql "$DB_URL" -c "SELECT 1 FROM expansion LIMIT 0" > /dev/null 2>&1; do
  sleep 2
done

echo "Schema ready. Running seed..."
psql "$DB_URL" -f /seed.sql
