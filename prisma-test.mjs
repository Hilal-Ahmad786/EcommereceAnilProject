import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Testing product lookup...");

  // replace with your real product ID
  const productId = "cmh22h5t0000cs4jq6kerkuw";

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, price: true, images: true },
    });

    if (!product) {
      console.log("❌ Product not found in database:", productId);
    } else {
      console.log("✅ Product found:", product);
    }
  } catch (err) {
    console.error("💥 Prisma query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
