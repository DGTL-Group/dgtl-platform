import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    theme: 'dark',
  },
  collections: [Users, Media],
  db: postgresAdapter({
    // Pool sizing: `next build` spawns multiple worker processes for static
    // generation, each with its own pool. Hostinger's Postgres caps total
    // connections, so during build we shrink the pool aggressively.
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      max: process.env.NEXT_PHASE === 'phase-production-build' ? 3 : 10,
      // dgtl-postgres on the VPS uses a self-signed cert. We require SSL
      // (encryption) but don't verify the issuer chain. If a real CA cert
      // gets installed later, change this to `{ ca: fs.readFileSync(...) }`.
      ssl: { rejectUnauthorized: false },
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  plugins: [
    // Cloudinary storage — only enabled when all 3 env vars are present.
    // Local fallback (disk storage) applies otherwise, useful during dev
    // before credentials are added.
    ...(process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
      ? [
          cloudinaryStorage({
            cloudConfig: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
            },
            collections: {
              media: true,
            },
          }),
        ]
      : []),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
})
