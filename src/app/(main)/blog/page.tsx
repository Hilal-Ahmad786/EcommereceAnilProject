// src/app/(main)/blog/page.tsx

import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function BlogPage() {
  // ✅ Fetch all published posts from the database
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  })

  const formatDate = (date: Date | string | null) => {
    if (!date) return ""
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-walnut-700 mb-4">
          Blog & İlham
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Mutfak tasarımı, dekorasyon ve bakım hakkında faydalı ipuçları ve ilham verici içerikler
        </p>
      </div>

      {blogPosts.length === 0 ? (
        <p className="text-center text-muted-foreground">Henüz yayınlanmış bir blog yazısı bulunmuyor.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video bg-natural-100 overflow-hidden">
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
                        <div className="text-5xl mb-2">📰</div>
                        <p className="text-xs">Blog Görseli</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      5 dk
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-xl mb-3 group-hover:text-walnut-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt || ""}
                  </p>

                  {/* Read More */}
                  <div className="text-walnut-600 font-semibold text-sm">
                    Devamını Oku →
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
