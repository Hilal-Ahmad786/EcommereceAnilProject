// src/app/(admin)/admin/products/page.tsx
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function AdminProductsPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/admin/login")
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  })

  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    isActive: p.isActive,
    featured: p.featured,
    price: Number(p.price), // <— Decimal → number
    stock: p.stock,
    categoryName: p.category?.name ?? "",
    imageUrl: p.images[0]?.url ?? null,
    createdAt: p.createdAt,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <Link
          href="/admin/urunler/yeni"
          className="px-4 py-2 rounded-lg bg-walnut-600 text-white hover:bg-walnut-700"
        >
          Yeni Ürün
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Görsel</th>
              <th className="px-4 py-3 text-left">Ad</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-right">Fiyat</th>
              <th className="px-4 py-3 text-right">Stok</th>
              <th className="px-4 py-3 text-center">Durum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="h-14 w-14 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-md border bg-gray-100" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-gray-500 text-xs">{product.slug}</div>
                </td>
                <td className="px-4 py-3">{product.categoryName}</td>
                <td className="px-4 py-3 text-right">
                  {new Intl.NumberFormat("tr-TR").format(product.price)} ₺
                </td>
                <td className="px-4 py-3 text-right">{product.stock}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.isActive ? "Aktif" : "Pasif"}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                  Ürün bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
