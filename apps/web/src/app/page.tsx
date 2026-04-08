export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          DGTL Platform · scaffold
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Phase 01 — Setup
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Next.js 15 + Payload CMS v3 monorepo. Site and dashboard live here.
        </p>
      </div>
    </main>
  );
}
