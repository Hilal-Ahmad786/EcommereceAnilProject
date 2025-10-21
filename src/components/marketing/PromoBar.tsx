// src/components/marketing/PromoBar.tsx
export default function PromoBar({ text, link }: any) {
  return (
    <div className="bg-walnut-500 text-white text-center py-2">
      <a href={link}>{text}</a>
    </div>
  )
}
