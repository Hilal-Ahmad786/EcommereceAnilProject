
// ============================================
// src/components/admin/DataTable.tsx
// ============================================
export default function DataTable({ columns, data }: any) {
  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-natural-100 border-b">
          <tr>
            {columns.map((col: any) => (
              <th key={col.key} className="px-6 py-4 text-left text-sm font-semibold">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-b">
              {columns.map((col: any) => (
                <td key={col.key} className="px-6 py-4">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}