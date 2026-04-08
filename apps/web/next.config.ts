import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Hostinger runs the Node.js app from a single directory; standalone output
  // minimises the server runtime footprint.
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // Payload's withPayload wrapper injects a webpack config. On Next.js 16
  // Turbopack is the default, and it will refuse to build when it sees a
  // custom webpack config — so the build/dev scripts pass --webpack to opt
  // back into webpack until the Payload side is fully Turbopack-compatible.
  // See payloadcms/payload#14354 for the tracking issue.
}

export default withPayload(nextConfig)
