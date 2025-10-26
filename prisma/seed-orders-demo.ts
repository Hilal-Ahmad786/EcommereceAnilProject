// prisma/seed-orders-demo.ts
import { PrismaClient, OrderStatus, PaymentStatus } from "@prisma/client"
const prisma = new PrismaClient()

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function main() {
  console.log("🧠 Seeding demo orders...")

  let user = await prisma.user.findFirst({ where: { email: "testcustomer@example.com" } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "testcustomer@example.com",
        name: "Test Customer",
        password: "$2a$10$y511r/0zjNDdL2dpdFHQCOyB1kCz5TT7C5Gm6BiZhpEUp1a1/8zdy", // 123456
        role: "CUSTOMER",
      },
    })
  }

  let address = await prisma.address.findFirst({ where: { userId: user.id } })
  if (!address) {
    address = await prisma.address.create({
      data: {
        userId: user.id,
        title: "Ev",
        fullName: user.name ?? "Test Customer",
        phone: "0555 123 45 67",
        city: "İstanbul",
        district: "Kadıköy",
        addressLine: "Deneme Mah. Sokak No: 10",
        postalCode: "34000",
        isDefault: true,
      },
    })
  }

  let category = await prisma.category.findFirst()
  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: "demo-category",
        name: "Demo Kategori",
      },
    })
  }

  let product = await prisma.product.findFirst()
  if (!product) {
    product = await prisma.product.create({
      data: {
        slug: "demo-product",
        name: "Demo Ürün",
        description: "Bu ürün demo siparişler içindir.",
        price: 1000,
        stock: 50,
        categoryId: category.id,
      },
    })
  }

  const statuses: OrderStatus[] = [
    "PENDING",
    "PAYMENT_RECEIVED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED",
  ]
  const payments: PaymentStatus[] = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"]

  for (let i = 1; i <= 10; i++) {
    const subtotal = randInt(800, 3000)
    const shipping = randInt(0, 100)
    const discount = randInt(0, 200)
    const total = subtotal + shipping - discount
    const status = rand(statuses)
    const paymentStatus = rand(payments)

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${1000 + i}-${Date.now()}`,
        userId: user.id,
        addressId: address.id,
        subtotal,
        shippingCost: shipping,
        tax: 0,
        discount,
        total,
        paymentMethod: "CREDIT_CARD",
        paymentStatus,
        status,
        trackingNumber:
          status === "SHIPPED" || status === "DELIVERED"
            ? `TRK${randInt(100000, 999999)}`
            : null,
        adminNote: status === "CANCELLED" ? "Müşteri isteğiyle iptal edildi" : "",
        items: {
          create: [
            {
              productId: product.id,
              productName: product.name,
              quantity: randInt(1, 3),
              unitPrice: product.price.toNumber(), // ✅ FIXED
              totalPrice: product.price.toNumber() * randInt(1, 3), // ✅ FIXED
              productImage: null,
            },
          ],
        },
      },
    })
    console.log(`✅ Created order: ${order.orderNumber} (${status}, ${paymentStatus})`)
  }

  console.log("🎉 Done seeding demo orders!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
