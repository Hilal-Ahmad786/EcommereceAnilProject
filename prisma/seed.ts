
// ============================================
// FILE: prisma/seed.ts
// Updated seed script for your schema
// ============================================

import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mutfakmobilya.com' },
    update: {},
    create: {
      email: 'admin@mutfakmobilya.com',
      name: 'Admin',
      password: hashedPassword,
      role: Role.ADMIN
    }
  })

  console.log('✅ Admin user created:', admin.email)
  console.log('   Password: admin123')

  // Create wood finishes
  const ceviz = await prisma.woodFinish.upsert({
    where: { slug: 'ceviz' },
    update: {},
    create: {
      name: 'Ceviz',
      slug: 'ceviz',
      hexColor: '#8B7355',
      description: 'Klasik ceviz rengi'
    }
  })

  const akCam = await prisma.woodFinish.upsert({
    where: { slug: 'ak-cam' },
    update: {},
    create: {
      name: 'Ak Çam',
      slug: 'ak-cam',
      hexColor: '#F5E6D3',
      description: 'Doğal ak çam rengi'
    }
  })

  const kahve = await prisma.woodFinish.upsert({
    where: { slug: 'kahve' },
    update: {},
    create: {
      name: 'Kahve',
      slug: 'kahve',
      hexColor: '#6F4E37',
      description: 'Koyu kahve rengi'
    }
  })

  console.log('✅ Wood finishes created: 3')

  // Create categories
  const mutfakDolaplari = await prisma.category.upsert({
    where: { slug: 'mutfak-dolaplari' },
    update: {},
    create: {
      name: 'Mutfak Dolapları',
      slug: 'mutfak-dolaplari',
      description: 'Modern ve şık mutfak dolapları. Yüksek kalite malzeme ve işçilik.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
      order: 1
    }
  })

  const tezgahlar = await prisma.category.upsert({
    where: { slug: 'tezgahlar' },
    update: {},
    create: {
      name: 'Tezgahlar',
      slug: 'tezgahlar',
      description: 'Dayanıklı ve estetik mutfak tezgahları. Granit, mermer ve laminat seçenekleri.',
      image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa',
      order: 2
    }
  })

  const eviyeler = await prisma.category.upsert({
    where: { slug: 'eviyeler' },
    update: {},
    create: {
      name: 'Eviyeler',
      slug: 'eviyeler',
      description: 'Paslanmaz çelik ve granit eviyeler. Su sızdırmaz garanti.',
      image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7',
      order: 3
    }
  })

  const ustDolaplar = await prisma.category.upsert({
    where: { slug: 'ust-dolaplar' },
    update: {},
    create: {
      name: 'Üst Dolaplar',
      slug: 'ust-dolaplar',
      description: 'Duvar tipi üst dolaplar. Maksimum depolama alanı.',
      parentId: mutfakDolaplari.id,
      order: 1
    }
  })

  const altDolaplar = await prisma.category.upsert({
    where: { slug: 'alt-dolaplar' },
    update: {},
    create: {
      name: 'Alt Dolaplar',
      slug: 'alt-dolaplar',
      description: 'Tezgah altı dolaplar. Geniş çekmece ve raf seçenekleri.',
      parentId: mutfakDolaplari.id,
      order: 2
    }
  })

  console.log('✅ Categories created: 5')

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Modern Üst Dolap - 80cm',
      slug: 'modern-ust-dolap-80cm',
      description: `Yüksek kaliteli MDF malzemeden üretilmiş modern tasarım üst dolap. 
      
      Özellikler:
      • Soft-close menteşe sistemi
      • Ayarlanabilir raflar
      • Kolay montaj
      • 5 yıl garanti
      • Nemden etkilenmeyen özel kaplama
      
      Kullanım Alanları:
      Modern mutfaklar, villa mutfakları, ofis mutfakları için idealdir.`,
      shortDescription: 'Ceviz kaplama modern üst dolap. Soft-close menteşe ile sessiz kapanma.',
      price: 2500,
      comparePrice: 3200,
      stock: 15,
      sku: 'MD-UST-80-001',
      featured: true,
      isActive: true,
      categoryId: ustDolaplar.id,
      dimensions: {
        width: 80,
        height: 72,
        depth: 32,
        unit: 'cm'
      },
      weight: 18.5,
      weightUnit: 'kg',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
            alt: 'Modern Üst Dolap önden görünüm',
            order: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
            alt: 'Modern Üst Dolap içi',
            order: 2
          }
        ]
      },
      woodFinishes: {
        create: [
          {
            woodFinishId: ceviz.id,
            priceModifier: 0
          },
          {
            woodFinishId: akCam.id,
            priceModifier: -200
          },
          {
            woodFinishId: kahve.id,
            priceModifier: 150
          }
        ]
      },
      seo: {
        create: {
          metaTitle: 'Modern Üst Dolap 80cm - Ceviz Kaplama | Mutfak Mobilya',
          metaDescription: 'Yüksek kaliteli modern üst dolap. Soft-close menteşe, ayarlanabilir raflar. 5 yıl garanti. Ücretsiz kargo ve montaj.',
          keywords: 'üst dolap, mutfak dolabı, modern dolap, ceviz dolap, 80cm dolap',
          ogTitle: 'Modern Üst Dolap 80cm - Premium Kalite',
          ogDescription: 'Mutfağınız için modern ve şık üst dolap çözümleri.',
          ogImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba'
        }
      }
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Granit Mutfak Tezgahı',
      slug: 'granit-mutfak-tezgahi',
      description: `Yerli granit taşından üretilmiş lüks mutfak tezgahı.
      
      Özellikler:
      • %100 doğal granit
      • Isıya dayanıklı (300°C'ye kadar)
      • Çizilmeye karşı dirençli
      • Kolay temizlenir
      • Profesyonal montaj dahil
      • 10 yıl garanti
      
      Bakım:
      Günlük temizlik için nemli bez yeterlidir. Agresif kimyasallar kullanmayın.`,
      shortDescription: 'Yerli granit mutfak tezgahı. Dayanıklı, şık ve uzun ömürlü.',
      price: 4500,
      comparePrice: 5800,
      stock: 8,
      sku: 'TZ-GRAN-001',
      featured: true,
      isActive: true,
      categoryId: tezgahlar.id,
      dimensions: {
        width: 200,
        height: 3,
        depth: 60,
        unit: 'cm',
        customizable: true
      },
      weight: 85,
      weightUnit: 'kg',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa',
            alt: 'Granit Tezgah',
            order: 1
          }
        ]
      }
    }
  })

  const product3 = await prisma.product.create({
    data: {
      name: 'Paslanmaz Çelik Eviye - Tek Gözlü',
      slug: 'paslanmaz-celik-eviye-tek-gozlu',
      description: `Profesyonel kalite paslanmaz çelik eviye.
      
      Özellikler:
      • 304 kalite paslanmaz çelik
      • Ses yalıtımlı taban
      • Taşma koruması
      • Kolay kurulum
      • Paspas hediye
      • 5 yıl garanti
      
      Paket İçeriği:
      • 1x Eviye
      • 1x Süzgeç
      • 1x Montaj kitİ`,
      shortDescription: 'Tek gözlü paslanmaz eviye. Ses yalıtımlı, kolay temizlik.',
      price: 1200,
      comparePrice: 1600,
      stock: 25,
      lowStockThreshold: 10,
      sku: 'EV-PSZ-TEK-001',
      featured: false,
      isActive: true,
      categoryId: eviyeler.id,
      dimensions: {
        width: 50,
        height: 20,
        depth: 50,
        unit: 'cm'
      },
      weight: 5.2,
      weightUnit: 'kg',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7',
            alt: 'Paslanmaz Çelik Eviye',
            order: 1
          }
        ]
      },
      seo: {
        create: {
          metaTitle: 'Paslanmaz Çelik Eviye Tek Gözlü - 304 Kalite | Mutfak Mobilya',
          metaDescription: 'Profesyonel kalite paslanmaz çelik eviye. Ses yalıtımlı, kolay montaj. Ücretsiz kargo.',
          keywords: 'paslanmaz eviye, mutfak eviyesi, tek gözlü eviye, 304 paslanmaz'
        }
      }
    }
  })

  console.log('✅ Products created: 3')

  // Create blog post
  await prisma.blogPost.create({
    data: {
      slug: 'modern-mutfak-dekorasyonu-ipuclari',
      title: 'Modern Mutfak Dekorasyonu için 10 İpucu',
      excerpt: 'Mutfağınızı modern ve şık bir alana dönüştürmek için pratik öneriler.',
      content: `Mutfak, evin kalbidir. İşte mutfağınızı modernleştirmek için ipuçları...
      
      1. Renk Seçimi: Doğal ahşap tonları ve beyaz kombinasyonu
      2. Aydınlatma: LED spot ve askı lambalar
      3. Depolama: Maksimum alan kullanımı
      ... (devamı)`,
      coverImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
      authorId: admin.id,
      published: true,
      publishedAt: new Date(),
      seo: {
        create: {
          metaTitle: 'Modern Mutfak Dekorasyonu için 10 İpucu',
          metaDescription: 'Mutfağınızı modern bir alana dönüştürmek için uzman önerileri ve pratik ipuçları.',
          keywords: 'mutfak dekorasyonu, modern mutfak, mutfak tasarımı'
        }
      }
    }
  })

  console.log('✅ Blog post created: 1')

  // Create site settings
  await prisma.siteSetting.upsert({
    where: { key: 'site_name' },
    update: {},
    create: {
      key: 'site_name',
      value: 'Mutfak Mobilya',
      type: 'text',
      group: 'general',
      description: 'Site adı'
    }
  })

  await prisma.siteSetting.upsert({
    where: { key: 'contact_email' },
    update: {},
    create: {
      key: 'contact_email',
      value: 'info@mutfakmobilya.com',
      type: 'email',
      group: 'contact',
      description: 'İletişim e-postası'
    }
  })

  await prisma.siteSetting.upsert({
    where: { key: 'free_shipping_threshold' },
    update: {},
    create: {
      key: 'free_shipping_threshold',
      value: '5000',
      type: 'number',
      group: 'shipping',
      description: 'Ücretsiz kargo limiti (TL)'
    }
  })

  console.log('✅ Site settings created: 3')

  console.log('\n🎉 Database seeding completed!')
  console.log('\n📝 Test Credentials:')
  console.log('   Email: admin@mutfakmobilya.com')
  console.log('   Password: admin123')
  console.log('\n📊 Created:')
  console.log('   • 1 Admin user')
  console.log('   • 3 Wood finishes')
  console.log('   • 5 Categories (with hierarchy)')
  console.log('   • 3 Products (with images, SEO, wood finishes)')
  console.log('   • 1 Blog post')
  console.log('   • 3 Site settings')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })