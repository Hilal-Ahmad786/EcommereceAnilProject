import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export default function BlogPreview() {
  // TODO: Fetch from database
  const blogPosts = [
    {
      id: '1',
      title: '2024 Mutfak Tasarım Trendleri',
      excerpt: 'Bu yıl mutfak tasarımında öne çıkan renkler, malzemeler ve stil tercihleri...',
      slug: '2024-mutfak-tasarim-trendleri',
      date: '2024-01-15',
      image: '/images/blog/placeholder.jpg',
    },
    {
      id: '2',
      title: 'Küçük Mutfaklar İçin 10 Depolama İpucu',
      excerpt: 'Sınırlı alanı maksimum verimlilikle kullanmanın yolları...',
      slug: 'kucuk-mutfaklar-icin-depolama-ipucu',
      date: '2024-01-10',
      image: '/images/blog/placeholder.jpg',
    },
    {
      id: '3',
      title: 'Ahşap Mutfak Bakımı Rehberi',
      excerpt: 'Ahşap mutfak mobilyalarınızı yıllarca yeni gibi tutmanın sırları...',
      slug: 'ahsap-mutfak-bakim-rehberi',
      date: '2024-01-05',
      image: '/images/blog/placeholder.jpg',
    },
  ]

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString))
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
              Blog & İlham
            </h2>
            <p className="text-muted-foreground">
              Mutfak tasarımı hakkında faydalı içerikler
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center text-walnut-600 hover:text-walnut-700 font-semibold"
          >
            Tüm Yazılar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                {/* Image */}
                <div className="relative aspect-video bg-natural-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📰</div>
                      <p className="text-xs">Blog Görseli</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-walnut-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-walnut-600 font-semibold">
                    Devamını Oku
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-walnut-600 hover:text-walnut-700 font-semibold"
          >
            Tüm Yazılar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}