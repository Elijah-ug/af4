echo "Running migrations"
npx prisma migrate deploy
echo "starting the service"
npm run start