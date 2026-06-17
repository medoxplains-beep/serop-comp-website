/**
 * Batch image optimizer — converts PNG/JPG to WebP using Sharp.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp"
import { readdir, unlink } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.join(__dirname, "..", "public")

const JOBS = [
  // Hero slider images — photographic, no alpha
  { dir: "images/designs", exts: [".png"], quality: 82, lossless: false },
  // Tank product renders — PNG with alpha channel (transparent bg)
  { dir: "images/tanks", exts: [".png"], quality: 86, lossless: false, alphaQuality: 95 },
  // Root images — mixed
  { dir: "images", exts: [".png", ".jpg", ".jpeg"], quality: 85, lossless: false, alphaQuality: 92, shallow: true },
]

let totalSaved = 0
let totalConverted = 0

async function convertFile(filePath, quality, lossless, alphaQuality) {
  const ext = path.extname(filePath).toLowerCase()
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return

  const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp")
  if (existsSync(outPath)) {
    console.log(`  ⏭  already exists: ${path.basename(outPath)}`)
    return
  }

  const statBefore = (await import("fs")).statSync(filePath).size

  await sharp(filePath)
    .webp({ quality, lossless, alphaQuality: alphaQuality ?? 90 })
    .toFile(outPath)

  const statAfter = (await import("fs")).statSync(outPath).size
  const saved = statBefore - statAfter
  const pct = ((saved / statBefore) * 100).toFixed(1)

  totalSaved += saved
  totalConverted++

  console.log(
    `  ✅ ${path.basename(filePath)} → ${path.basename(outPath)}  ` +
    `${(statBefore / 1024).toFixed(0)}KB → ${(statAfter / 1024).toFixed(0)}KB  (-${pct}%)`
  )

  // Delete original after successful conversion
  await unlink(filePath)
}

for (const job of JOBS) {
  const dir = path.join(PUBLIC, job.dir)
  if (!existsSync(dir)) continue

  console.log(`\n📁 ${job.dir}`)
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory() && job.shallow) continue
    if (!entry.isFile()) continue
    const ext = path.extname(entry.name).toLowerCase()
    if (!job.exts.includes(ext)) continue

    await convertFile(
      path.join(dir, entry.name),
      job.quality,
      job.lossless,
      job.alphaQuality
    )
  }
}

console.log(`\n🎉 Done! ${totalConverted} files converted, ${(totalSaved / 1024 / 1024).toFixed(1)} MB saved.`)
