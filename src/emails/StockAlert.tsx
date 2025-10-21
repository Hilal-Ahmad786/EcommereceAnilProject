
// ============================================
// FILE: src/emails/StockAlert.tsx
// ============================================
import * as React from 'react'

interface StockAlertEmailProps {
  productName: string
  productSku: string
  currentStock: number
  lowStockThreshold: number
  productUrl: string
}

export default function StockAlertEmail(props: StockAlertEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#CC7357', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>⚠️ Düşük Stok Uyarısı</h1>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
          Aşağıdaki ürünün stok seviyesi kritik düzeyde:
        </p>
        
        <div style={{ backgroundColor: '#fff5f3', border: '2px solid #CC7357', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
          <h2 style={{ color: '#CC7357', marginTop: 0 }}>{props.productName}</h2>
          <p style={{ margin: '10px 0' }}><strong>SKU:</strong> {props.productSku}</p>
          <p style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold', color: '#CC7357' }}>
            Mevcut Stok: {props.currentStock} adet
          </p>
          <p style={{ margin: '10px 0', color: '#666' }}>
            Düşük Stok Eşiği: {props.lowStockThreshold} adet
          </p>
        </div>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Lütfen en kısa sürede stok yenilemesi yapınız.
        </p>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={props.productUrl}
            style={{
              backgroundColor: '#8B7355',
              color: 'white',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            Ürünü Görüntüle
          </a>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        <p>Bu otomatik bir bildirimdir - Admin Paneli</p>
        <p>© 2024 Mutfak Mobilya</p>
      </div>
    </div>
  )
}