// src/components/marketing/NewsletterForm.tsx
'use client'
export default function NewsletterForm() {
  return (
    <form className="flex gap-2">
      <input type="email" placeholder="E-posta" className="flex-1 px-4 py-2 rounded-lg border" />
      <button type="submit" className="px-6 py-2 bg-walnut-500 text-white rounded-lg">
        Abone Ol
      </button>
    </form>
  )
}