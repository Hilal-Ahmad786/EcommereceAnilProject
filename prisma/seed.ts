// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123456', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mutfakmobilya.com' },
    update: {},
    create: {
      email: 'admin@mutfakmobilya.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create wood finishes
  const woodFinishes = [
    { name: 'Ceviz', slug: 'ceviz', hexColor: '#8B7355' },
    { name: 'Meşe', slug: 'oak', hexColor: '#C9A96E' },
    { name: 'Beyaz', slug: 'beyaz', hexColor: '#F5F5F0' },
    { name: 'Siyah', slug: 'siyah', hexColor: '#333333' },
    { name: 'Antrasit', slug: 'antrasit', hexColor: '#4A4A4A' },
  ]

  for (const finish of woodFinishes) {
    await prisma.woodFinish.upsert({
      where: { slug: finish.slug },
      update: {},
      create: finish,
    })
  }
  console.log('✅ Wood finishes created')

  // Create categories
  const categories = [
    { name: 'Mutfak Dolabı', slug: 'mutfak-dolabi', order: 1, description: 'Modern ve klasik mutfak dolapları' },
    { name: 'Mutfak Adası', slug: 'mutfak-adasi', order: 2, description: 'Fonksiyonel mutfak adaları' },
    { name: 'Tezgah', slug: 'tezgah', order: 3, description: 'Mermer ve ahşap tezgahlar' },
    { name: 'Bar Sandalyesi', slug: 'bar-sandalyesi', order: 4, description: 'Şık bar sandalyeleri' },
    { name: 'Mutfak Masası', slug: 'mutfak-masasi', order: 5, description: 'Yemek masaları' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('✅ Categories created')

  // Create sample products
  const mutfakDolabiCategory = await prisma.category.findUnique({
    where: { slug: 'mutfak-dolabi' },
  })

  if (mutfakDolabiCategory) {
    const products = [
      {
        name: 'Modern Mutfak Dolabı',
        slug: 'modern-mutfak-dolabi',
        description: 'Premium kalitede modern mutfak dolabı. Dayanıklı malzeme ve özel üretim detayları ile uzun ömürlü kullanım.',
        shortDescription: 'Modern ve şık tasarım',
        price: 12999,
        comparePrice: 15999,
        stock: 15,
        categoryId: mutfakDolabiCategory.id,
        featured: true,
        isActive: true,
        dimensions: { width: 120, height: 200, depth: 60, unit: 'cm' },
        weight: 45,
      },
      {
        name: 'Klasik Mutfak Dolabı',
        slug: 'klasik-mutfak-dolabi',
        description: 'Klasik tarzda, zarif detaylarla tasarlanmış mutfak dolabı.',
        shortDescription: 'Zamansız klasik tasarım',
        price: 14999,
        stock: 8,
        categoryId: mutfakDolabiCategory.id,
        featured: false,
        isActive: true,
        dimensions: { width: 130, height: 210, depth: 65, unit: 'cm' },
        weight: 50,
      },
    ]

    for (const prod of products) {
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {},
        create: prod,
      })
    }
    console.log('✅ Sample products created')
  }

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'Mutfak Mobilya', type: 'text', group: 'general' },
    { key: 'site_description', value: 'Kaliteli mutfak mobilyaları ve tasarım çözümleri', type: 'text', group: 'general' },
    { key: 'support_email', value: 'destek@mutfakmobilya.com', type: 'text', group: 'contact' },
    { key: 'phone', value: '+90 555 123 45 67', type: 'text', group: 'contact' },
    { key: 'whatsapp', value: '905551234567', type: 'text', group: 'contact' },
    { key: 'top_bar_active', value: 'true', type: 'boolean', group: 'topbar' },
    { key: 'top_bar_text', value: '🎉 Yeni Sezon Koleksiyonu! Tüm Ürünlerde %20 İndirim', type: 'text', group: 'topbar' },
    { key: 'top_bar_link', value: '/urunler', type: 'text', group: 'topbar' },
    { key: 'top_bar_bg_color', value: '#8B7355', type: 'text', group: 'topbar' },
    { key: 'top_bar_text_color', value: '#FFFFFF', type: 'text', group: 'topbar' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log('✅ Site settings created')

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })