// src/app/(main)/hesabim/profil/page.tsx

// ✅ Hybrid Component: Secure + Interactive
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import ProfileForm from "./profile-form"

// --- SERVER COMPONENT (security, SEO, session) ---
export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) redirect("/giris")

  // Fetch latest user info from DB (placeholder)
  // const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  const user = {
    id: session.user.id,
    name: session.user.name ?? "",
    email: session.user.email ?? "",
    phone: "0555 123 45 67",
    city: "İstanbul",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
        Profil Bilgilerim
      </h1>
      <p className="text-muted-foreground mb-8">
        Kişisel bilgilerinizi güncelleyebilir ve iletişim ayarlarınızı
        yönetebilirsiniz.
      </p>

      <Suspense fallback={<p>Yükleniyor...</p>}>
        {/* Pass user data to Client Component */}
        <ProfileForm user={user} />
      </Suspense>
    </div>
  )
}
