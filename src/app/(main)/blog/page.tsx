import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

export default function BlogPage() {
  // TODO: Fetch from database
  const blogPosts = [
    {
      id: '1',
      title: '2024 Mutfak Tasarım Trendleri',
      excerpt: 'Bu yıl mutfak tasarımında öne çıkan renkler, malzemeler ve stil tercihleri hakkında her şey...',
      slug: '2024-mutfak-tasarim-trendleri',
      date: '2024-01-15',
      readTime: '5 dk',
      category: 'Tasarım',
      image: '/images/blog/1.jpg',
    },
    {
      id: '2',
      title: 'Küçük Mutfaklar İçin 10 Depolama İpucu',
      excerpt: 'Sınırlı alanı maksimum verimlilikle kullanmanın yollarını keşfedin. Pratik çözümler ve fikirler...',
      slug: 'kucuk-mutfaklar-icin-depolama-ipucu',
      date: '2024-01-10',
      readTime: '7 dk',
      category: 'Organizasyon',
      image: '/images/blog/2.jpg',
    },
    {
      id: '3',
      title: 'Ahşap Mutfak Bakımı Rehberi',
      excerpt: 'Ahşap mutfak mobilyalarınızı yıllarca yeni gibi tutmanın sırlarını öğrenin...',
      slug: 'ahsap-mutfak-bakim-rehberi',
      date: '2024-01-05',
      readTime: '6 dk',
      category: 'Bakım',
      image: '/images/blog/3.jpg',
    },
    {
      id: '4',
      title: 'Mutfak Aydınlatması Nasıl Olmalı?',
      excerpt: 'Doğru aydınlatma ile mutfağınızı hem fonksiyonel hem de şık hale getirin...',
      slug: 'mutfak-aydinlatmasi',
      date: '2023-12-28',
      readTime: '4 dk',
      category: 'Aydınlatma',
      image: '/images/blog/4.jpg',
    },
    {
      id: '5',
      title: 'Açık Mutfak mı Kapalı Mutfak mı?',
      excerpt: 'İki farklı mutfak düzeninin avantaj ve dezavantajlarını karşılaştırıyoruz...',
      slug: 'acik-kapali-mutfak',
      date: '2023-12-20',
      readTime: '8 dk',
      category: 'Planlama',
      image: '/images/blog/5.jpg',
    },
    {
      id: '6',
      title: 'Mutfak Yenileme Maliyetleri 2024',
      excerpt: 'Mutfak yenileme projesi için bütçe planlaması ve maliyet kalemleri hakkında bilmeniz gerekenler...',
      slug: 'mutfak-yenileme-maliyetleri',
      date: '2023-12-15',
      readTime: '10 dk',
      category: 'Bütçe',
      image: '/images/blog/6.jpg',
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

      {/* Blog Grid */}
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
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="text-5xl mb-2">📰</div>
                    <p className="text-xs">Blog Görseli</p>
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-walnut-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-bold text-xl mb-3 group-hover:text-walnut-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
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
    </div>
  )
}