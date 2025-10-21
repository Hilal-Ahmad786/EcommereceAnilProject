// src/components/floating/ChatButton.tsx
export default function ChatButton({ onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-42 right-6 w-14 h-14 bg-walnut-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-50"
    >
      💬
    </button>
  )
}