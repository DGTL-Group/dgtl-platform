import type { CollectionConfig, Access } from 'payload'

// ─────────────────────────────────────────────────────────────────────────────
// Access helpers
// ─────────────────────────────────────────────────────────────────────────────

const isOwner: Access = ({ req }) => req.user?.role === 'owner'
const isOwnerOrAdmin: Access = ({ req }) =>
  req.user?.role === 'owner' || req.user?.role === 'admin'

const isOwnerOrAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'owner' || req.user.role === 'admin') return true
  // Clients and team members can only read/update their own record.
  return {
    id: { equals: req.user.id },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Users collection
//
// Four roles:
//   owner        — protected, cannot be deleted or demoted by anyone.
//                  Only Will holds this. Enforced at the access-control level
//                  AND via middleware/route handlers (upcoming phases).
//   admin        — full platform access, can promote other users to admin,
//                  but CANNOT touch the owner account.
//   team         — DGTL employees/contractors, access to assigned clients.
//   client       — end clients, sees only their own portal.
// ─────────────────────────────────────────────────────────────────────────────

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    read: isOwnerOrAdminOrSelf,
    create: isOwnerOrAdmin,
    update: isOwnerOrAdminOrSelf,
    // Only the owner can delete users — admins cannot touch the owner account.
    delete: isOwner,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'client',
      options: [
        { label: 'Owner (protected)', value: 'owner' },
        { label: 'Admin', value: 'admin' },
        { label: 'Team Member', value: 'team' },
        { label: 'Client', value: 'client' },
      ],
      access: {
        // Only owner/admin can set or change roles, and only owner can assign owner.
        update: ({ req }) =>
          req.user?.role === 'owner' || req.user?.role === 'admin',
      },
      // Prevent anyone other than owner from demoting an owner record.
      hooks: {
        beforeChange: [
          ({ value, originalDoc, req }) => {
            if (
              originalDoc?.role === 'owner' &&
              value !== 'owner' &&
              req.user?.role !== 'owner'
            ) {
              throw new Error('Only the Owner can change the Owner role.')
            }
            return value
          },
        ],
      },
    },
  ],
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        // Hard-block deleting any user whose role is 'owner', regardless of
        // who is performing the delete. Admins should never be able to remove
        // Will's account.
        const doc = await req.payload.findByID({
          collection: 'users',
          id,
          req,
          overrideAccess: true,
        })
        if (doc?.role === 'owner') {
          throw new Error('The Owner account cannot be deleted.')
        }
      },
    ],
  },
}
