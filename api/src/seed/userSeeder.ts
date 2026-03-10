import { prisma } from "../config/db";
import { formatUserName, hashpwd } from "../utils/utils";
import { users } from "./users";

export const seedUsers = async () => {
  // await Promise.all(users.map((usr) => prisma.user.upsert({ where: { email: usr.email }, update: {}, create: usr })));
  console.log(`Waiting to seed all ${users.length} users`);
  const pwd = await hashpwd("password");

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { password: pwd, gender: user.gender === "M" ? "M" : "F", username: formatUserName(user.username) },
      create: { ...user, password: pwd, username: formatUserName(user.username) },
    });
  }
  console.log("✅ Users seeded");
};
// seedUsers()
//   .then(() => console.log("✅ all Users seeded"))
//   .catch((err) => {
//     console.log("❌ Users failed to be seeded", err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
