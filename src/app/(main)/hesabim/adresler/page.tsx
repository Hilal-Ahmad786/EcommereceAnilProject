// src/app/(main)/hesabim/adresler/page.tsx
// ✅ Server Component — Secure Address Manager
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import AddressManager from "./address-manager"

export default async function AddressesPage() {
  const session = await auth()
  if (!session?.user) redirect("/giris")

  const userId = session.user.id

  // Placeholder — replace with actual Prisma fetch:
  // const addresses = await prisma.address.findMany({ where: { userId } })
  const addresses = [
    { id: "1", title: "Ev Adresi", city: "İstanbul", district: "Pendik", fullAddress: "Kurtköy Mah. ABC Sok. No:12" },
    { id: "2", title: "Ofis", city: "Yozgat", district: "Merkez", fullAddress: "Teknopark Cad. No:5" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
        Adreslerim
      </h1>
      <p className="text-muted-foreground mb-8">
        Teslimat ve fatura adreslerinizi buradan yönetebilirsiniz.
      </p>

      <Suspense fallback={<p>Adresler yükleniyor...</p>}>
        <AddressManager addresses={addresses} userId={userId} />
      </Suspense>
    </div>
  )
}
