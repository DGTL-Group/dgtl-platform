export default function DashboardHome() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          dashboard.dgtlgroup.io · phase 01 scaffold
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Client Dashboard
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Placeholder. v1 modules (files, invoices, tasks, announcements, work
          requests) land in Phase 05.
        </p>
      </div>
    </main>
  )
}
