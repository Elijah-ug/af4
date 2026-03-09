import { prisma } from "../config/db";
import { seedAdmin } from "./adminSeeder";
import { seedUsers } from "./userSeeder";

const main = async () => {
  console.log("🚀 Starting seeding...");
  await seedAdmin();
  await seedUsers();
  console.log("🎉 All seeding done!");
};
main()
  .then(() => console.log("✅ Admin seeded"))
  .catch((err) => {
    console.log("❌ Admin failed to be seeded", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
