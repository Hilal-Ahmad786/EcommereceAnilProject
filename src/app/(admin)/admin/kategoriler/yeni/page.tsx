// src/app/(admin)/admin/kategoriler/yeni/page.tsx
"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CategoryForm, { CategoryFormInitial } from "@/components/admin/CategoryForm"

export default function NewCategoryPage() {
  const router = useRouter()

  const handleSubmit = async (payload: Required<CategoryFormInitial>) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          slug: payload.slug,
          description: payload.description || "",
          image: payload.image || null,
          parentId: payload.parentId || null,
          order: Number.isFinite(Number(payload.order)) ? Number(payload.order) : 0,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || "Kategori oluşturulamadı")
      }

      alert("Kategori başarıyla eklendi")
      router.push("/admin/kategoriler")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(err?.message || "Bir hata oluştu")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/kategoriler" className="p-2 hover:bg-natural-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Yeni Kategori</h1>
          <p className="text-muted-foreground">Yeni kategori oluşturun</p>
        </div>
      </div>

      {/* Form (reusable component) */}
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  )
}
