
// ============================================
// src/config/analytics.ts
// ============================================
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

// Google Analytics Events
export const GA_EVENTS = {
  // E-commerce events
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_ITEM: 'view_item',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  
  // User events
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  
  // Engagement events
  ADD_TO_WISHLIST: 'add_to_wishlist',
  SHARE: 'share',
  SEARCH: 'search',
} as const

// Facebook Pixel Events
export const FB_EVENTS = {
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PURCHASE: 'Purchase',
  VIEW_CONTENT: 'ViewContent',
  SEARCH: 'Search',
  ADD_TO_WISHLIST: 'AddToWishlist',
} as const

// Track page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({ action, params }: { action: string; params?: any }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}