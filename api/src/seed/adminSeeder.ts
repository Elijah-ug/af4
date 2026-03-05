import { prisma } from "../config/db";

const seed = async () => {
  await prisma.user.upsert({
    where: { email: "elicomelijah330@gmail.com" },
    update: {},
    create: {
      name: "Elicom Elijah",
      username: "AdminElicom",
      email: "elicomelijah330@gmail.com",
      password: "password",
      gender: "male",
      dateOfBirth: "2002-10-08",
      role: "admin",
    },
  });
};
seed()
  .then(() => console.log("✅ Admin seeded"))
  .catch((err) => {
    console.log("❌ Admin failed to be seeded", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
