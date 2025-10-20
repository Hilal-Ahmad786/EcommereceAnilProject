
// ============================================
// src/lib/validations.ts
// ============================================
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().regex(/^(\+90|0)?[5][0-9]{9}$/, 'Geçerli bir telefon numarası girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export const addressSchema = z.object({
  title: z.string().min(2, 'Başlık en az 2 karakter olmalıdır'),
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  phone: z.string().regex(/^(\+90|0)?[5][0-9]{9}$/, 'Geçerli bir telefon numarası girin'),
  city: z.string().min(2, 'Şehir seçiniz'),
  district: z.string().min(2, 'İlçe giriniz'),
  addressLine: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  postalCode: z.string().regex(/^\d{5}$/, 'Geçerli bir posta kodu girin').optional(),
  isDefault: z.boolean().optional(),
})

export const productSchema = z.object({
  name: z.string().min(3, 'Ürün adı en az 3 karakter olmalıdır'),
  slug: z.string().min(3, 'Slug en az 3 karakter olmalıdır'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  shortDescription: z.string().optional(),
  price: z.number().positive('Fiyat 0\'dan büyük olmalıdır'),
  comparePrice: z.number().positive().optional(),
  stock: z.number().int().min(0, 'Stok negatif olamaz'),
  categoryId: z.string().min(1, 'Kategori seçiniz'),
  isActive: z.boolean().optional(),
  featured: z.boolean().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Kategori adı en az 2 karakter olmalıdır'),
  slug: z.string().min(2, 'Slug en az 2 karakter olmalıdır'),
  description: z.string().optional(),
  parentId: z.string().optional(),
  order: z.number().int().min(0).optional(),
})

export const reviewSchema = z.object({
  productId: z.string().min(1, 'Ürün seçiniz'),
  rating: z.number().int().min(1).max(5, 'Puan 1-5 arasında olmalıdır'),
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır').optional(),
  comment: z.string().min(10, 'Yorum en az 10 karakter olmalıdır'),
})

export const blogPostSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır'),
  slug: z.string().min(3, 'Slug en az 3 karakter olmalıdır'),
  excerpt: z.string().optional(),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalıdır'),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
})

export const seoSchema = z.object({
  metaTitle: z.string().max(60, 'Meta başlık en fazla 60 karakter olabilir'),
  metaDescription: z.string().max(160, 'Meta açıklama en fazla 160 karakter olabilir'),
  keywords: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().url('Geçerli bir URL girin').optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Konu seçiniz'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
})

export const newsletterSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
})