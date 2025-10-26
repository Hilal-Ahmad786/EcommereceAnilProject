// src/app/(main)/blog/[slug]/page.tsx

import { prisma } from "@/lib/prisma"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Fetch post from database
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true },
  })

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
        <h1 className="text-3xl font-semibold mb-4">Yazı bulunamadı</h1>
        <Link href="/blog" className="text-walnut-600 hover:text-walnut-700 font-medium">
          ← Blog sayfasına dön
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-walnut-600">
            Ana Sayfa
          </Link>
          {" / "}
          <Link href="/blog" className="hover:text-walnut-600">
            Blog
          </Link>
          {" / "}
          <span>{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-walnut-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              {post.published ? "Yayınlandı" : "Taslak"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-walnut-700 mb-6">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {post.author?.name && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author.name}
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt.toString())}
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video bg-natural-100 rounded-xl overflow-hidden mb-8">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-8xl mb-4">📰</div>
                <p className="text-sm">Blog Görseli</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-walnut-700 prose-a:text-walnut-600 prose-strong:text-walnut-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block text-walnut-600 hover:text-walnut-700 font-semibold"
          >
            ← Tüm Yazılara Dön
          </Link>
        </div>
      </article>
    </div>
  )
}
