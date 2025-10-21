// ============================================
// src/components/admin/OrderStatusBadge.tsx
// ============================================
export default function OrderStatusBadge({ status }: any) {
  const colors: any = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    PROCESSING: 'bg-blue-100 text-blue-700',
    SHIPPED: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || ''}`}>
      {status}
    </span>
  )
}