// @quartz-community/bases-page prints "Showing {count} of {total} entries" above every
// view (in .base pages and in notes that embed a base) and has no option to change it.
// The string comes from the plugin's shared en-US locale object, so override it there.
//
// bases-page fills the template with `template.replace("{count}", …).replace("{total}", …)`.
// A plain template can't pluralise or drop "of {total}", so `showingCount` becomes an object
// whose `replace` collects both values and then returns the final text:
//   "3 entries", "1 entry", or "3 of 10 entries" when a view limit hides some.
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

function countTemplate(values = {}) {
  return {
    replace(placeholder, value) {
      const next = { ...values, [placeholder.slice(1, -1)]: value }
      if (next.count === undefined || next.total === undefined) return countTemplate(next)
      const noun = next.count === "1" ? "entry" : "entries"
      return next.count === next.total
        ? `${next.count} ${noun}`
        : `${next.count} of ${next.total} ${noun}`
    },
    toString: () => "{count} entries",
  }
}

// `i18n` isn't in the package's exports map, so load the bundled chunk that defines it
// (same file URL as bases-page's own import, hence the same module instance).
async function patchBasesLocale() {
  const dist = dirname(fileURLToPath(import.meta.resolve("@quartz-community/bases-page")))
  for (const name of readdirSync(dist)) {
    if (!name.endsWith(".js")) continue
    const path = join(dist, name)
    if (!readFileSync(path, "utf-8").includes("showingCount")) continue
    const mod = await import(pathToFileURL(path).href)
    if (typeof mod.i18n !== "function") continue
    mod.i18n("en-US").components.bases.showingCount = countTemplate()
    return true
  }
  return false
}

const patched = await patchBasesLocale().catch(() => false)

export default function BasesCount() {
  if (!patched) console.warn("[bases-count] couldn't find bases-page's locale; count text unchanged")
  // the work happens at import; Quartz wants a transformer to have at least one hook
  return { name: "BasesCount", textTransform: (_ctx, src) => src }
}
export { BasesCount }
