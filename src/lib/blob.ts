// src/lib/blob.ts
import 'server-only'
import { put, del, list, type PutBlobResult } from '@vercel/blob'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

function assertToken() {
  if (!BLOB_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is missing in .env.local')
  }
}

/**
 * Convert Buffer | ArrayBuffer | Blob to a Blob.
 * We copy Node Buffers into a fresh ArrayBuffer so TS narrows away SharedArrayBuffer.
 */
function toBlob(data: Blob | ArrayBuffer | Buffer, contentType?: string): Blob {
  if (data instanceof Blob) {
    return data
  }

  if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
    // Wrap in a Uint8Array to ensure valid BlobPart
    return new Blob([new Uint8Array(data)], { type: contentType })
  }

  // Node Buffer case
  const buf = data as Buffer
  // Copy into a regular ArrayBuffer (avoids SharedArrayBuffer in typings)
  const view = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
  const copy = new Uint8Array(view.byteLength)
  copy.set(view)
  return new Blob([copy], { type: contentType })
}

/** Upload a public image/file and get a CDN URL back */
export async function uploadBlob(
  filename: string,
  data: Blob | ArrayBuffer | Buffer,
  contentType?: string
): Promise<PutBlobResult> {
  assertToken()
  const body = toBlob(data, contentType)
  return put(filename, body, {
    access: 'public',
    token: BLOB_TOKEN,
    contentType,
  })
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
  return res.blobs // { pathname, size, uploadedAt, url? }[]
}
