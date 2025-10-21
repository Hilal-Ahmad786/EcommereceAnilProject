import 'server-only'
import { MeiliSearch } from 'meilisearch'

const host = process.env.MEILISEARCH_HOST
const apiKey = process.env.MEILISEARCH_MASTER_KEY

let client: MeiliSearch | null = null
export function getMeili() {
  if (!host) throw new Error('MEILISEARCH_HOST is missing in .env.local')
  if (!client) {
    client = new MeiliSearch({ host, apiKey })
  }
  return client
}

// Example product search index helpers
export type ProductSearchDoc = {
  id: string
  slug: string
  name: string
  category: string
  price: number
  finishes?: string[]
  description?: string
}

const PRODUCTS_INDEX = 'products'

export async function ensureProductsIndex() {
  const cli = getMeili()
  try {
    await cli.getIndex(PRODUCTS_INDEX)
  } catch {
    await cli.createIndex(PRODUCTS_INDEX, { primaryKey: 'id' })
  }
}

export async function indexProducts(docs: ProductSearchDoc[]) {
  const cli = getMeili()
  await ensureProductsIndex()
  return cli.index(PRODUCTS_INDEX).addDocuments(docs)
}

export async function searchProducts(query: string, limit = 24) {
  const cli = getMeili()
  await ensureProductsIndex()
  return cli.index(PRODUCTS_INDEX).search<ProductSearchDoc>(query, { limit })
}
