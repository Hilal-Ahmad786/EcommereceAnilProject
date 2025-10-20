// ============================================
// src/config/constants.ts
// ============================================
export const APP_NAME = 'Mutfak Mobilya'
export const APP_DESCRIPTION = 'Kaliteli mutfak mobilyaları ve tasarım çözümleri'

export const ITEMS_PER_PAGE = 12
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const ORDER_STATUSES = {
  PENDING: 'Beklemede',
  PAYMENT_RECEIVED: 'Ödeme Alındı',
  PROCESSING: 'Hazırlanıyor',
  SHIPPED: 'Kargoda',
  DELIVERED: 'Teslim Edildi',
  CANCELLED: 'İptal Edildi',
  REFUNDED: 'İade Edildi',
} as const

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'Kredi Kartı',
  BANK_TRANSFER: 'Havale/EFT',
  INSTALLMENT: 'Taksit',
} as const

export const USER_ROLES = {
  CUSTOMER: 'Müşteri',
  ADMIN: 'Admin',
} as const

export const WOOD_FINISHES = [
  { id: 'ceviz', name: 'Ceviz', hexColor: '#8B7355' },
  { id: 'oak', name: 'Meşe', hexColor: '#C9A96E' },
  { id: 'beyaz', name: 'Beyaz', hexColor: '#F5F5F0' },
  { id: 'siyah', name: 'Siyah', hexColor: '#333333' },
  { id: 'antrasit', name: 'Antrasit', hexColor: '#4A4A4A' },
]

export const CATEGORIES = [
  { id: 'mutfak-dolabi', name: 'Mutfak Dolabı' },
  { id: 'mutfak-adasi', name: 'Mutfak Adası' },
  { id: 'tezgah', name: 'Tezgah' },
  { id: 'bar-sandalyesi', name: 'Bar Sandalyesi' },
  { id: 'mutfak-masasi', name: 'Mutfak Masası' },
]

export const TURKISH_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara',
  'Antalya', 'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman',
  'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
  'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ',
  'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane',
  'Hakkâri', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş',
  'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli',
  'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
  'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
  'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak',
  'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
]
