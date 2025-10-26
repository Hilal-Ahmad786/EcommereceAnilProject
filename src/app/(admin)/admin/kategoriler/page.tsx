// src/app/(admin)/admin/kategoriler/page.tsx
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { revalidatePath } from "next/cache"
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton"


export const dynamic = "force-dynamic"

async function getCategories() {
  return prisma.category.findMany({
    include: {
      parent: true,
      _count: { select: { products: true, children: true } },
    },
    orderBy: [{ parentId: "asc" }, { order: "asc" }, { name: "asc" }],
  })
}

// ------- Server Action: delete a category securely -------
async function deleteCategoryAction(id: string) {
  "use server"
  // Make sure category exists and has no products
  const cat = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  })
  if (!cat) {
    throw new Error("Kategori bulunamadı")
  }
  if (cat._count.products > 0) {
    throw new Error("Bu kategoride ürünler var. Önce ürünleri başka kategoriye taşıyın.")
  }

  await prisma.category.delete({ where: { id } })
  revalidatePath("/admin/kategoriler")
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Kategoriler</h1>
          <p className="text-muted-foreground">Kategori hiyerarşisini yönetin</p>
        </div>
        <Link
          href="/admin/kategoriler/yeni"
          className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Kategori
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-natural-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Üst Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Ürün Sayısı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Alt Kategori</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-natural-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">/{c.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{c.parent?.name ?? "-"}</td>
                  <td className="px-6 py-4 text-sm">{c._count.products}</td>
                  <td className="px-6 py-4 text-sm">{c._count.children}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit (duzenle) */}
                      <Link
                        href={`/admin/kategoriler/duzenle/${c.id}`}
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="h-4 w-4 text-walnut-600" />
                      </Link>

                      {/* Delete with server action */}
                      <DeleteCategoryButton id={c.id} />

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Henüz kategori yok. Yeni bir kategori ekleyin.
          </div>
        )}
      </div>
    </div>
  )
}
