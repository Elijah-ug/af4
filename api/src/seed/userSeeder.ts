import { prisma } from "../config/db";

const user = [
  {
    name: "First TestUser",
    username: "firsttestuser",
    email: "firsttestuser@gmail.com",
    password: "password",
    gender: "male",
    dateOfBirth: "2002-10-08",
    role: "user",
  },
];

const seedUsers = async () => {
    for
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
      role: "user",
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
