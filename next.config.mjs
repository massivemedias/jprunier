import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules/@payloadcms/ui/dist/scss')],
    silenceDeprecations: ['legacy-js-api'],
  },
}

export default withPayload(nextConfig)
