import { prisma } from "../config/prisma";

const email = process.argv[2];

if (!email) {
  console.error("Please provide an email");
  process.exit(1);
}

async function main() {
  console.log("Looking up:", email);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log("User:", user);
}

main()
  .catch((error) => {
    console.error("PRISMA ERROR:");
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });