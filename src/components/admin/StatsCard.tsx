// ============================================
// src/components/admin/StatsCard.tsx
// ============================================
export default function StatsCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold text-walnut-700">{value}</p>
    </div>
  )
}
