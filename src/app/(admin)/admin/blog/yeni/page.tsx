// src/app/(admin)/admin/blog/yeni/page.tsx
"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import BlogForm, { BlogFormInitial } from "@/components/admin/BlogForm"

export default function NewBlogPostPage() {
  const router = useRouter()

  const handleSubmit = async (payload: Required<BlogFormInitial>) => {
    const res = await fetch("/api/blog-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error || "Kaydedilemedi")
    }
    alert("Blog yazısı eklendi")
    router.push("/admin/blog")
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="p-2 hover:bg-natural-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Yeni Yazı</h1>
          <p className="text-muted-foreground">Blog’a yeni içerik ekleyin</p>
        </div>
      </div>

      <BlogForm onSubmit={handleSubmit} submitLabel="Oluştur" />
    </div>
  )
}
