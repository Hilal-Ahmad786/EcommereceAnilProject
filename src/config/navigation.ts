export const mainNavigation = [
  {
    title: 'Ana Sayfa',
    href: '/',
  },
  {
    title: 'Ürünler',
    href: '/urunler',
  },
  {
    title: 'Kategoriler',
    href: '/urunler',
    submenu: [
      { title: 'Mutfak Dolabı', href: '/urunler/kategori/mutfak-dolabi' },
      { title: 'Mutfak Adası', href: '/urunler/kategori/mutfak-adasi' },
      { title: 'Tezgah', href: '/urunler/kategori/tezgah' },
      { title: 'Bar Sandalyesi', href: '/urunler/kategori/bar-sandalyesi' },
      { title: 'Mutfak Masası', href: '/urunler/kategori/mutfak-masasi' },
    ],
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Hakkımızda',
    href: '/hakkimizda',
  },
  {
    title: 'İletişim',
    href: '/iletisim',
  },
]

export const adminNavigation = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Ürünler',
    href: '/admin/urunler',
    icon: 'Package',
  },
  {
    title: 'Kategoriler',
    href: '/admin/kategoriler',
    icon: 'FolderTree',
  },
  {
    title: 'Siparişler',
    href: '/admin/siparisler',
    icon: 'ShoppingCart',
  },
  {
    title: 'Müşteriler',
    href: '/admin/musteriler',
    icon: 'Users',
  },
  {
    title: 'Blog',
    href: '/admin/blog',
    icon: 'FileText',
  },
  {
    title: 'Medya',
    href: '/admin/medya',
    icon: 'Image',
  },
  {
    title: 'İncelemeler',
    href: '/admin/incelemeler',
    icon: 'Star',
  },
  {
    title: 'SEO',
    href: '/admin/seo',
    icon: 'Search',
  },
  {
    title: 'Ayarlar',
    href: '/admin/ayarlar',
    icon: 'Settings',
    submenu: [
      { title: 'Genel', href: '/admin/ayarlar/genel' },
      { title: 'Üst Banner', href: '/admin/ayarlar/ust-banner' },
      { title: 'İletişim', href: '/admin/ayarlar/iletisim' },
      { title: 'Sosyal Medya', href: '/admin/ayarlar/sosyal-medya' },
      { title: 'Analitik', href: '/admin/ayarlar/analitik' },
    ],
  },
]

export const footerNavigation = {
  kurumsal: [
    { title: 'Hakkımızda', href: '/hakkimizda' },
    { title: 'İletişim', href: '/iletisim' },
    { title: 'Blog', href: '/blog' },
  ],
  musteri: [
    { title: 'Hesabım', href: '/hesabim' },
    { title: 'Siparişlerim', href: '/hesabim/siparisler' },
    { title: 'Favorilerim', href: '/favoriler' },
  ],
  bilgi: [
    { title: 'Kargo ve İade', href: '/kargo-iade' },
    { title: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { title: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
  ],
}