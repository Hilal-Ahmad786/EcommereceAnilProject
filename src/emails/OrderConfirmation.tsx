
// ============================================
// FILE: src/emails/OrderConfirmation.tsx
// ============================================
import * as React from 'react'

interface OrderConfirmationEmailProps {
  customerName: string
  orderNumber: string
  orderDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  shipping: number
  total: number
  deliveryAddress: string
}

export default function OrderConfirmationEmail(props: OrderConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#8B7355', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Mutfak Mobilya</h1>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#333' }}>Siparişiniz Alındı!</h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Merhaba {props.customerName},
        </p>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Siparişiniz başarıyla oluşturuldu. Aşağıda sipariş detaylarınızı bulabilirsiniz:
        </p>
        
        <div style={{ backgroundColor: '#f5f5f0', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
          <p style={{ margin: '5px 0' }}><strong>Sipariş No:</strong> {props.orderNumber}</p>
          <p style={{ margin: '5px 0' }}><strong>Tarih:</strong> {props.orderDate}</p>
        </div>
        
        <h3 style={{ color: '#333', marginTop: '30px' }}>Sipariş Özeti</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '10px', color: '#666' }}>Ürün</th>
              <th style={{ textAlign: 'center', padding: '10px', color: '#666' }}>Adet</th>
              <th style={{ textAlign: 'right', padding: '10px', color: '#666' }}>Fiyat</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{item.name}</td>
                <td style={{ textAlign: 'center', padding: '10px' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right', padding: '10px' }}>{item.price.toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right', padding: '10px' }}>Ara Toplam:</td>
              <td style={{ textAlign: 'right', padding: '10px' }}>{props.subtotal.toLocaleString('tr-TR')} ₺</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right', padding: '10px' }}>Kargo:</td>
              <td style={{ textAlign: 'right', padding: '10px', color: '#6B8E6F' }}>
                {props.shipping === 0 ? 'Ücretsiz' : `${props.shipping.toLocaleString('tr-TR')} ₺`}
              </td>
            </tr>
            <tr style={{ fontWeight: 'bold', fontSize: '18px' }}>
              <td colSpan={2} style={{ textAlign: 'right', padding: '10px' }}>Toplam:</td>
              <td style={{ textAlign: 'right', padding: '10px', color: '#8B7355' }}>{props.total.toLocaleString('tr-TR')} ₺</td>
            </tr>
          </tfoot>
        </table>
        
        <h3 style={{ color: '#333', marginTop: '30px' }}>Teslimat Adresi</h3>
        <p style={{ color: '#666', lineHeight: '1.6', backgroundColor: '#f5f5f0', padding: '15px', borderRadius: '5px' }}>
          {props.deliveryAddress}
        </p>
        
        <p style={{ color: '#666', lineHeight: '1.6', marginTop: '30px' }}>
          Siparişiniz hazırlandıktan sonra kargo takip numaranız ile bilgilendirileceksiniz.
        </p>
      </div>
      
      <div style={{ backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        <p>Sorularınız için: destek@mutfakmobilya.com</p>
        <p>© 2024 Mutfak Mobilya. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}
