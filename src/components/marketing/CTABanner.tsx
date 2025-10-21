// src/components/marketing/CTABanner.tsx
export default function CTABanner({ title, description, buttonText, link }: any) {
  return (
    <div className="bg-gradient-to-r from-walnut-500 to-sage-500 text-white rounded-xl p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="mb-6">{description}</p>
      <a href={link} className="inline-block px-8 py-3 bg-white text-walnut-600 rounded-lg font-semibold">
        {buttonText}
      </a>
    </div>
  )
}