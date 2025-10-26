// src/app/api/blog-posts/[id]/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: { author: { select: { name: true, email: true } } },
    })
    if (!post) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 })
    return NextResponse.json({ data: post })
  } catch (err) {
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  try {
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        published: body.published,
        publishedAt: body.published ? new Date() : null,
      },
    })
    return NextResponse.json({ data: post })
  } catch (err) {
    return NextResponse.json({ error: "Güncellenemedi" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ message: "Silindi" })
  } catch (err) {
    return NextResponse.json({ error: "Silinemedi" }, { status: 500 })
  }
}
