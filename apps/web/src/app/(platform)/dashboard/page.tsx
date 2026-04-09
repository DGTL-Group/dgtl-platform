export default function DashboardHome() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-gold-pale flex items-center justify-center">
          <span className="text-gold text-2xl">⬡</span>
        </div>
        <p className="text-micro font-semibold uppercase tracking-[0.2em] text-gold mb-3">
          dashboard.dgtlgroup.io
        </p>
        <h1 className="text-heading-3 font-semibold text-white tracking-[-0.02em]">
          Client Dashboard
        </h1>
        <p className="mt-4 text-body text-muted">
          v1 modules (files, invoices, tasks, announcements, work requests)
          land in Phase 05. Authentication with Payload JWT is wired — waiting
          on the Postgres connection to run migrations.
        </p>
        <div className="mt-8 rounded-[var(--radius-md)] border border-line bg-surface p-4">
          <p className="text-caption text-stone">
            4 roles configured: <span className="text-gold font-semibold">Owner</span> ·
            Admin · Team · Client
          </p>
        </div>
      </div>
    </main>
  )
}
