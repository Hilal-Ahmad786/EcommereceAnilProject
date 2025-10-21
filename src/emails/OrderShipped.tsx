
// ============================================
// FILE: src/emails/OrderShipped.tsx
// ============================================
import * as React from 'react'

interface OrderShippedEmailProps {
  customerName: string
  orderNumber: string
  trackingNumber: string
  trackingUrl?: string
  carrierName: string
  estimatedDelivery: string
}

export default function OrderShippedEmail(props: OrderShippedEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#6B8E6F', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>📦 Siparişiniz Kargoda!</h1>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#333' }}>Merhaba {props.customerName},</h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Harika haberlerimiz var! Siparişiniz kargoya verildi ve yakında sizinle olacak.
        </p>
        
        <div style={{ backgroundColor: '#f0f5f1', border: '2px solid #6B8E6F', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
          <p style={{ margin: '10px 0' }}><strong>Sipariş No:</strong> {props.orderNumber}</p>
          <p style={{ margin: '10px 0' }}><strong>Kargo Firması:</strong> {props.carrierName}</p>
          <p style={{ margin: '10px 0', fontSize: '18px' }}>
            <strong>Takip No:</strong> 
            <span style={{ color: '#6B8E6F', fontFamily: 'monospace', fontSize: '20px', display: 'block', marginTop: '5px' }}>
              {props.trackingNumber}
            </span>
          </p>
          <p style={{ margin: '10px 0' }}><strong>Tahmini Teslimat:</strong> {props.estimatedDelivery}</p>
        </div>
        
        {props.trackingUrl && (
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
              href={props.trackingUrl}
              style={{
                backgroundColor: '#6B8E6F',
                color: 'white',
                padding: '12px 30px',
                textDecoration: 'none',
                borderRadius: '5px',
                display: 'inline-block'
              }}
            >
              Kargonu Takip Et
            </a>
          </div>
        )}
        
        <h3 style={{ color: '#333', marginTop: '30px' }}>Teslimatta Dikkat Edilmesi Gerekenler:</h3>
        
        <ul style={{ color: '#666', lineHeight: '1.8', fontSize: '14px' }}>
          <li>Ürünü teslim alırken kargo görevlisinin yanında kontrol ediniz</li>
          <li>Hasarlı veya eksik teslimat durumunda hemen bildiriniz</li>
          <li>Teslimat sırasında kimlik kontrolü yapılabilir</li>
        </ul>
        
        <p style={{ color: '#666', lineHeight: '1.6', marginTop: '20px' }}>
          Keyifli alışverişler dileriz!
        </p>
      </div>
      
      <div style={{ backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        <p>Sorularınız için: destek@mutfakmobilya.com</p>
        <p>© 2024 Mutfak Mobilya. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}