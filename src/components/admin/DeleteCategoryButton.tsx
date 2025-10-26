// src/components/admin/DeleteCategoryButton.tsx

"use client"

import { useTransition } from "react"

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault()
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return

    startTransition(async () => {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" })
      if (res.ok) location.reload()
      else alert("Kategori silinemedi")
    })
  }

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        disabled={isPending}
        className="text-red-600 hover:text-red-800"
      >
        {isPending ? "Siliniyor..." : "Sil"}
      </button>
    </form>
  )
}
