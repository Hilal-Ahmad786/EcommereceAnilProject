
// ============================================
// src/lib/constants.ts
// ============================================
export const API_ROUTES = {
  // Products
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  PRODUCT_BY_SLUG: (slug: string) => `/api/products/slug/${slug}`,
  
  // Categories
  CATEGORIES: '/api/categories',
  CATEGORY_BY_ID: (id: string) => `/api/categories/${id}`,
  
  // Orders
  ORDERS: '/api/orders',
  ORDER_BY_ID: (id: string) => `/api/orders/${id}`,
  
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
  
  // Reviews
  REVIEWS: '/api/reviews',
  PRODUCT_REVIEWS: (productId: string) => `/api/reviews/product/${productId}`,
  
  // Upload
  UPLOAD: '/api/upload',
  
  // Settings
  SETTINGS: '/api/settings',
} as const

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/urunler',
  PRODUCT_DETAIL: (slug: string) => `/urunler/${slug}`,
  CATEGORY: (slug: string) => `/urunler/kategori/${slug}`,
  CART: '/sepet',
  CHECKOUT: '/odeme',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  ABOUT: '/hakkimizda',
  CONTACT: '/iletisim',
  ACCOUNT: '/hesabim',
  ORDERS: '/hesabim/siparisler',
  WISHLIST: '/favoriler',
  LOGIN: '/giris',
  REGISTER: '/kayit',
  
  // Admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/urunler',
  ADMIN_ORDERS: '/admin/siparisler',
  ADMIN_CUSTOMERS: '/admin/musteriler',
  ADMIN_CATEGORIES: '/admin/kategoriler',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_MEDIA: '/admin/medya',
  ADMIN_REVIEWS: '/admin/incelemeler',
  ADMIN_SEO: '/admin/seo',
  ADMIN_SETTINGS: '/admin/ayarlar',
} as const

export const ERROR_MESSAGES = {
  GENERIC: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  NETWORK: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
  UNAUTHORIZED: 'Bu işlem için giriş yapmalısınız.',
  FORBIDDEN: 'Bu işlem için yetkiniz yok.',
  NOT_FOUND: 'Aradığınız sayfa bulunamadı.',
  VALIDATION: 'Lütfen tüm alanları doğru doldurun.',
  OUT_OF_STOCK: 'Ürün stokta yok.',
} as const

export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Ürün sepete eklendi',
  ORDER_PLACED: 'Siparişiniz başarıyla oluşturuldu',
  PROFILE_UPDATED: 'Profiliniz güncellendi',
  REVIEW_SUBMITTED: 'Yorumunuz alındı. Onaylandıktan sonra yayınlanacak.',
  NEWSLETTER_SUBSCRIBED: 'Bültenimize abone oldunuz',
} as const

// Form validation rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PHONE_PATTERN: /^(\+90|0)?[5][0-9]{9}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  POSTAL_CODE_PATTERN: /^\d{5}$/,
} as const