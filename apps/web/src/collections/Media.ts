import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // With cloudinary storage plugin, the actual bytes live in Cloudinary.
    // Without it (dev), Payload falls back to local disk under media/.
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true, // Public media — individual files can be restricted later.
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
