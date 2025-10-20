import Link from 'next/link'

export default function CategoryShowcase() {
  const categories = [
    {
      name: 'Mutfak Dolabı',
      slug: 'mutfak-dolabi',
      description: 'Modern ve klasik tasarımlar',
      icon: '🗄️',
    },
    {
      name: 'Mutfak Adası',
      slug: 'mutfak-adasi',
      description: 'Fonksiyonel ve şık çözümler',
      icon: '🏝️',
    },
    {
      name: 'Tezgah',
      slug: 'tezgah',
      description: 'Mermer, granit ve ahşap',
      icon: '📐',
    },
    {
      name: 'Bar Sandalyesi',
      slug: 'bar-sandalyesi',
      description: 'Rahat ve estetik',
      icon: '🪑',
    },
    {
      name: 'Mutfak Masası',
      slug: 'mutfak-masasi',
      description: 'Aile için ideal boyutlar',
      icon: '🍽️',
    },
    {
      name: 'Depolama Çözümleri',
      slug: 'depolama',
      description: 'Akıllı organizasyon',
      icon: '📦',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-natural-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-4">
            Kategorilere Göz Atın
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            İhtiyacınıza uygun mutfak mobilyası kategorisini keşfedin
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/urunler/kategori/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-walnut-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}