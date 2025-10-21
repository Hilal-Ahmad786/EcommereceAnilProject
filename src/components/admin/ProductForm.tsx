// ============================================
// src/components/admin/ProductForm.tsx
// ============================================
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ProductForm({ product, onSubmit }: any) {
  const [formData, setFormData] = useState(product || {})
  
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Ürün Adı</label>
        <Input 
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Açıklama</label>
        <Textarea 
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <Button type="submit">Kaydet</Button>
    </form>
  )
}