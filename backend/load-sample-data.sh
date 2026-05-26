#!/usr/bin/env bash
set -euo pipefail

files=(
  db-schema.sql
  sample-bus.sql
  sample-route.sql
  sample-user.sql
  sample-inventory.sql
  sample-booking.sql
  sample-passanger.sql
  sample-payment.sql
)

for f in "${files[@]}"; do
  if [ -f "$f" ]; then
    echo "Loading $f..."
    docker compose exec -T db mysql -uroot -psecret onlinebusbooking < "$f"
  else
    echo "Skipping $f (not found)"
  fi
done

echo "Done"
