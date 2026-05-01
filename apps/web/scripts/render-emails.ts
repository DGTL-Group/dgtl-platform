/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Renders all React Email templates in src/emails/ to HTML files in
 * dist/emails/. Run with: pnpm email:render
 *
 * Output HTML can be:
 *   - Pasted directly into Mautic email templates (Email > Edit > HTML mode)
 *   - Or pushed via Mautic API (see scripts/sync-mautic-emails.ts — TODO)
 *
 * Templates with default exports are auto-discovered. Each template's
 * `PreviewProps` (if defined) is used as the rendering input.
 */
import { render } from '@react-email/render'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EMAILS_DIR = path.resolve(__dirname, '../src/emails')
const OUTPUT_DIR = path.resolve(__dirname, '../dist/emails')

async function findTemplates(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) continue // skip sub-dirs (components, etc.)
    if (entry.isFile() && entry.name.endsWith('.tsx')) files.push(full)
  }
  return files
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  const templates = await findTemplates(EMAILS_DIR)

  if (templates.length === 0) {
    console.log('No templates found in', EMAILS_DIR)
    return
  }

  for (const file of templates) {
    const name = path.basename(file, '.tsx')
    try {
      // Dynamic import; tsx-loader handles TSX
      const mod = await import(file)
      const Component = mod.default
      if (!Component) {
        console.warn(`Skipping ${name} — no default export`)
        continue
      }
      const props = (Component as { PreviewProps?: unknown }).PreviewProps ?? {}
      const html = await render(Component(props))
      const outPath = path.join(OUTPUT_DIR, `${name}.html`)
      await fs.writeFile(outPath, html, 'utf8')
      console.log(`✓ ${name}.html`)
    } catch (err) {
      console.error(`✗ ${name}:`, err)
    }
  }

  console.log(`\nRendered ${templates.length} template(s) → ${OUTPUT_DIR}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
