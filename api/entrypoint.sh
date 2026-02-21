#!/bin/sh
echo "Running migrations"
# dev
# until nc -z db 5432; do
# prod
# until nc -z dpg-d6d24np4tr6s73chtleg-a 5432; do
  # sleep 2
# done
npx prisma migrate deploy
echo "starting the service"
npm run start
