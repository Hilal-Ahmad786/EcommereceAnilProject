// ============================================
// FILE: src/emails/WelcomeEmail.tsx
// ============================================
import * as React from 'react'

interface WelcomeEmailProps {
  name: string
  email: string
}

export default function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#8B7355', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Mutfak Mobilya</h1>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#333' }}>Hoş Geldiniz {name}!</h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Mutfak Mobilya ailesine katıldığınız için teşekkür ederiz. Hesabınız başarıyla oluşturuldu.
        </p>
        
        <div style={{ backgroundColor: '#f5f5f0', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
          <p style={{ margin: '5px 0' }}><strong>E-posta:</strong> {email}</p>
        </div>
        
        <h3 style={{ color: '#333', marginTop: '30px' }}>Neler Yapabilirsiniz?</h3>
        
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li>Geniş ürün yelpazemizi keşfedin</li>
          <li>Favorilerinize ürün ekleyin</li>
          <li>Güvenli ödeme ile alışveriş yapın</li>
          <li>Siparişlerinizi takip edin</li>
          <li>Özel kampanyalardan haberdar olun</li>
        </ul>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href="https://mutfakmobilya.com/urunler"
            style={{
              backgroundColor: '#8B7355',
              color: 'white',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            Alışverişe Başla
          </a>
        </div>
        
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
          Herhangi bir sorunuz olursa, destek ekibimiz size yardımcı olmaktan mutluluk duyar.
        </p>
      </div>
      
      <div style={{ backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        <p>İletişim: destek@mutfakmobilya.com | +90 555 123 45 67</p>
        <p>© 2024 Mutfak Mobilya. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}