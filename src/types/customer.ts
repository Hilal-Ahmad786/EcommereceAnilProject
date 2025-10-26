export type AdminCustomerRow = {
  id: string
  name: string | null
  email: string
  role: 'ADMIN' | 'CUSTOMER'
  createdAt: string
  ordersCount: number
  totalSpent: number
  lastOrderDate: string | null
  location: string | null
}
