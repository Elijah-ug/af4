#!/bin/sh
echo "Running migrations"
until nc -z db 5432; do
  sleep 2
done
npx prisma migrate deploy
echo "starting the service"
npm run start
