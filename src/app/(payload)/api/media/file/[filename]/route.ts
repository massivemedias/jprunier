import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const MIME_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
}

/**
 * Serve media files from public/media/ directory.
 * This overrides Payload's default file handler which fails on Vercel
 * because the ephemeral filesystem doesn't have the uploaded files.
 * Files are committed to public/media/ in git and served as static assets.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params

  // Try to read from public/media/ on disk (works locally and on Vercel since files are in git)
  const filePath = path.resolve(process.cwd(), 'public', 'media', filename)

  if (fs.existsSync(filePath)) {
    const buffer = fs.readFileSync(filePath)
    const ext = path.extname(filename).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  // Fallback: redirect to static file path (Next.js serves public/ files)
  return NextResponse.redirect(new URL(`/media/${filename}`, _req.url), 301)
}
