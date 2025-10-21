// src/components/floating/WhatsAppButton.tsx
export default function WhatsAppButton({ phone }: any) {
  return (
    <a 
      href={`https://wa.me/${phone}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-50"
    >
      WA
    </a>
  )
}