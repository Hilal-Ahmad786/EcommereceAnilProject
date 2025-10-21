// src/components/floating/CallButton.tsx
export default function CallButton({ phone }: any) {
  return (
    <a 
      href={`tel:${phone}`}
      className="fixed bottom-24 right-6 w-14 h-14 bg-sage-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-50"
    >
      📞
    </a>
  )
}