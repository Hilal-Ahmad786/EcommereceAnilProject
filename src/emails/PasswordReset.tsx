
// ============================================
// FILE: src/emails/PasswordReset.tsx
// ============================================
import * as React from 'react'

interface PasswordResetEmailProps {
  name: string
  resetLink: string
}

export default function PasswordResetEmail({ name, resetLink }: PasswordResetEmailProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#8B7355', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Mutfak Mobilya</h1>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#333' }}>Merhaba {name},</h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Şifre sıfırlama talebinde bulundunuz. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:
        </p>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={resetLink}
            style={{
              backgroundColor: '#8B7355',
              color: 'white',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            Şifremi Sıfırla
          </a>
        </div>
        
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
          Bu linkin geçerlilik süresi 1 saattir. Eğer şifre sıfırlama talebinde bulunmadıysanız, 
          bu e-postayı görmezden gelebilirsiniz.
        </p>
        
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
          Link çalışmıyorsa, aşağıdaki adresi tarayıcınıza kopyalayabilirsiniz:<br />
          {resetLink}
        </p>
      </div>
      
      <div style={{ backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        <p>© 2024 Mutfak Mobilya. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}