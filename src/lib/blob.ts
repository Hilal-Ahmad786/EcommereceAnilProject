import 'server-only'
import { put, del, list } from '@vercel/blob'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

function assertToken() {
  if (!BLOB_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is missing in .env.local')
  }
}

/** Upload a public image/file and get a CDN URL back */
export async function uploadBlob(
  filename: string,
  data: Blob | ArrayBuffer | Buffer,
  contentType?: string
) {
  assertToken()
  const body =
    data instanceof Blob
      ? data
      : new Blob([data as Buffer | ArrayBuffer], { type: contentType })

  const res = await put(filename, body, {
    access: 'public',
    token: BLOB_TOKEN,
    contentType,
  })
  // res: { url, pathname, size, uploadedAt, ... }
  return res
}

/** Delete by blob URL or pathname */
export async function deleteBlob(pathOrUrl: string) {
  assertToken()
  await del(pathOrUrl, { token: BLOB_TOKEN })
}

/** List blobs under a prefix, e.g. 'products/' */
export async function listBlobs(prefix?: string) {
  assertToken()
  const res = await list({ token: BLOB_TOKEN, prefix })
  return res.blobs // array with {pathname, size, uploadedAt, url?}
}
