require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const all = await prisma.product.findMany({ select: { id: true, name: true } });
  console.log('Found products:', all.map(a => a.id));
  await prisma.$disconnect();
})();


