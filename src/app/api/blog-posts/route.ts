// src/app/api/blog-posts/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth" // ✅ works with your NextAuth v5 setup

// ==========================
// 📦 GET - List all posts
// ==========================
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").toLowerCase()
  const status = searchParams.get("status") || "all"

  try {
    const where: any = {}
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ]
    }
    if (status === "published") where.published = true
    if (status === "draft") where.published = false

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true, email: true } },
      },
    })

    return NextResponse.json({ data: posts })
  } catch (err: any) {
    console.error("GET /api/blog-posts error:", err)
    return NextResponse.json({ error: "Blog yazıları getirilemedi" }, { status: 500 })
  }
}

// ==========================
// ✏️ POST - Create new post
// ==========================
export async function POST(req: Request) {
  try {
    const session = await auth() // ✅ new v5 session handler
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    if (!user) {
      return NextResponse.json({ error: "Yazar bulunamadı" }, { status: 404 })
    }

    const body = await req.json()
    const { title, slug, excerpt, content, coverImage, published = false } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Başlık, slug ve içerik zorunludur" },
        { status: 400 }
      )
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || "",
        content,
        coverImage: coverImage || null,
        authorId: user.id,
        published,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json({ data: post }, { status: 201 })
  } catch (err: any) {
    console.error("POST /api/blog-posts error:", err)
    return NextResponse.json(
      { error: err?.message || "Kaydedilemedi" },
      { status: 500 }
    )
  }
}
