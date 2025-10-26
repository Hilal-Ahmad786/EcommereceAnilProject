// /src/app/api/addresses/[id]/route.ts

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) return new Response("Unauthorized", { status: 401 })

  await prisma.address.delete({
    where: { id: params.id },
  })
  return new Response("Deleted", { status: 200 })
}
