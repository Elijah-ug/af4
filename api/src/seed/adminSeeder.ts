import { prisma } from "../config/db";
import { hashpwd } from "../utils/utils";

export const seedAdmin = async () => {
  const pwd = await hashpwd("password");
  console.log("pwd hashed==>", pwd);
  await prisma.user.upsert({
    where: { email: "elicomelijah330@gmail.com" },
    update: { gender: "M", username: "@AdminElicom" },
    create: {
      name: "Elicom Elijah",
      username: "@AdminElicom",
      email: "elicomelijah330@gmail.com",
      password: pwd,
      gender: "M",
      dateOfBirth: "2002-10-08",
      role: "admin",
    },
  });
  console.log("✅ Admin seeded");
};
// seedAdmin()
//   .then(() => console.log("✅ Admin seeded"))
//   .catch((err) => {
//     console.log("❌ Admin failed to be seeded", err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
