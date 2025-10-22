import { useParams } from 'next/navigation'
import { Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'

export default function BlogPostPage() {
  const params = useParams()

  // TODO: Fetch from database using params.slug
  const post = {
    title: '2024 Mutfak Tasarım Trendleri',
    slug: params.slug,
    excerpt: 'Bu yıl mutfak tasarımında öne çıkan renkler, malzemeler ve stil tercihleri...',
    content: `
      <p>2024 yılında mutfak tasarımında doğal malzemeler ve sürdürülebilirlik ön plana çıkıyor. Ahşap tonları, mermer yüzeyler ve mat siyah detaylar bu yılın favorileri arasında.</p>
      
      <h2>Renk Paletleri</h2>
      <p>Doğal ahşap tonları, krem ve bej gibi nötr renkler mutfaklarda sıcak bir atmosfer yaratıyor. Aksan rengi olarak koyu yeşil ve lacivert tercih ediliyor.</p>
      
      <h2>Malzeme Seçimleri</h2>
      <p>Masif ahşap, doğal taş ve kaliteli seramik bu sezonun popüler malzemeleri. Sürdürülebilir ve geri dönüştürülebilir malzemelere olan ilgi artıyor.</p>
      
      <h2>Fonksiyonel Çözümler</h2>
      <p>Akıllı depolama sistemleri, gizli çekmeceler ve ergonomik düzenlemeler modern mutfakların vazgeçilmez unsurları haline geldi.</p>
    `,
    date: '2024-01-15',
    readTime: '5 dk',
    author: 'Mutfak Mobilya',
    category: 'Tasarım',
    image: '/images/blog/1.jpg',
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-walnut-600">Ana Sayfa</Link>
          {' / '}
          <Link href="/blog" className="hover:text-walnut-600">Blog</Link>
          {' / '}
          <span>{post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-walnut-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-walnut-700 mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} okuma
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video bg-natural-100 rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-8xl mb-4">📰</div>
              <p className="text-sm">Blog Görseli</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-walnut-700 prose-a:text-walnut-600 prose-strong:text-walnut-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Bu yazıyı paylaş:</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#1877F2] text-white rounded-lg text-sm hover:opacity-90">
              Facebook
            </button>
            <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm hover:opacity-90">
              Twitter
            </button>
            <button className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm hover:opacity-90">
              WhatsApp
            </button>
          </div>
        </div>

        {/* Back to Blog */}
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