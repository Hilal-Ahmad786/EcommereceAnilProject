
// ============================================
// src/types/settings.ts
// ============================================
export interface SiteSetting {
  id: string
  key: string
  value: string
  type: 'text' | 'number' | 'boolean' | 'json'
  group: string
  description?: string
  updatedAt: Date
}

export interface TopBarSettings {
  isActive: boolean
  text: string
  link?: string
  backgroundColor: string
  textColor: string
}

export interface GeneralSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  supportEmail: string
  phone: string
  whatsapp: string
  address: string
  workingHours: string
  currency: string
  language: string
  timezone: string
}

export interface SocialMediaSettings {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  linkedin?: string
  pinterest?: string
}

export interface AnalyticsSettings {
  googleAnalyticsId?: string
  googleTagManagerId?: string
  facebookPixelId?: string
}
