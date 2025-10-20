export const siteConfig = {
  name: 'Mutfak Mobilya',
  description: 'Kaliteli mutfak mobilyaları ve tasarım çözümleri',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
    phone: `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`,
    email: `mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`,
  },
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '',
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '',
  },
  social: {
    facebook: 'https://facebook.com/mutfakmobilya',
    instagram: 'https://instagram.com/mutfakmobilya',
    twitter: 'https://twitter.com/mutfakmobilya',
    youtube: 'https://youtube.com/@mutfakmobilya',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  },
}