'use client'

import { useState } from 'react'

interface AddressFormData {
  fullName: string
  phone: string
  city: string
  district: string
  addressLine: string
  postalCode: string
}

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void
  initialData?: AddressFormData
}

export default function AddressForm({ onSubmit, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>(
    initialData || {
      fullName: '',
      phone: '',
      city: '',
      district: '',
      addressLine: '',
      postalCode: '',
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Turkish cities (sample)
  const cities = [
    'İstanbul',
    'Ankara',
    'İzmir',
    'Bursa',
    'Antalya',
    'Adana',
    'Konya',
    'Gaziantep',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            placeholder="Adınız ve soyadınız"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            placeholder="05XX XXX XX XX"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-2">
            İl <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
          >
            <option value="">Seçiniz</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium mb-2">
            İlçe <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            placeholder="İlçe"
          />
        </div>
      </div>

      {/* Address Line */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Adres <span className="text-red-500">*</span>
        </label>
        <textarea
          name="addressLine"
          value={formData.addressLine}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
          placeholder="Mahalle, sokak, bina no, daire no"
        />
      </div>

      {/* Postal Code */}
      <div className="md:w-1/2">
        <label className="block text-sm font-medium mb-2">
          Posta Kodu
        </label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
          placeholder="XXXXX"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-4 rounded-lg font-semibold transition-colors"
      >
        Devam Et
      </button>
    </form>
  )
}