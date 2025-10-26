// ============================================
// src/components/admin/CustomerTable.tsx
// ============================================

import Link from "next/link"

type CustomerRow = {
  id: string
  name: string | null
  email: string
  role: "ADMIN" | "CUSTOMER"
  createdAt: string | Date
  ordersCount: number
  totalSpent: number
  lastOrderDate: string | Date | null
  location: string | null
}

export default function CustomerTable({ customers }: { customers: CustomerRow[] }) {
  if (!customers?.length) {
    return (
      <div className="border rounded-lg p-6 text-sm text-muted-foreground">
        Henüz müşteri yok.
      </div>
    )
  }

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50">
          <tr>
            <th className="text-left p-3">Müşteri</th>
            <th className="text-left p-3">E-posta</th>
            <th className="text-left p-3">Rol</th>
            <th className="text-left p-3">Sipariş</th>
            <th className="text-left p-3">Harcanan</th>
            <th className="text-left p-3">Son Sipariş</th>
            <th className="text-left p-3">Konum</th>
            <th className="text-right p-3">Detay</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3 font-medium">{c.name ?? "-"}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                    c.role === "ADMIN"
                      ? "bg-amber-100 text-amber-900"
                      : "bg-emerald-100 text-emerald-900"
                  }`}
                >
                  {c.role}
                </span>
              </td>
              <td className="p-3">{c.ordersCount}</td>
              <td className="p-3">{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(c.totalSpent || 0)}</td>
              <td className="p-3">
                {c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString("tr-TR") : "-"}
              </td>
              <td className="p-3">{c.location ?? "-"}</td>
              <td className="p-3 text-right">
                <Link
                  href={`/admin/siparisler?user=${c.id}`}
                  className="text-walnut-700 hover:underline"
                >
                  Siparişler →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
