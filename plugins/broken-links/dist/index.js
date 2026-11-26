// Links to notes that aren't published (or not written yet) get the class `broken`
// and `data-no-popover`, so CSS can cross them out and they don't open a 404 popover.
// quartz/styles/custom.scss makes them inert.
//
// The built-in links step (order 60) has `disableBrokenWikilinks` for this, but it
// checks `ctx.allSlugs`, which holds only files: links to tag pages (`tags/x`) and
// to folders without an index note would be marked broken too. This runs after it
// (order 65), reads the `data-slug` it sets, and treats those as present.

function visit(node, fn) {
  fn(node)
  if (node.children) for (const child of node.children) visit(child, fn)
}

function classList(node) {
  const c = node.properties?.className
  return Array.isArray(c) ? c : typeof c === "string" ? c.split(" ") : []
}

export default function BrokenLinks() {
  return {
    name: "BrokenLinks",
    htmlPlugins(ctx) {
      return [
        () => (tree) => {
          const slugs = new Set(ctx.allSlugs ?? [])
          const folders = new Set()
          for (const s of slugs) {
            const parts = s.split("/")
            for (let i = 1; i < parts.length; i++) folders.add(parts.slice(0, i).join("/") + "/index")
          }
          const exists = (slug) =>
            slugs.has(slug) || folders.has(slug) || slug === "index" || slug.startsWith("tags/")

          visit(tree, (node) => {
            if (node.type !== "element" || node.tagName !== "a") return
            const classes = classList(node)
            if (!classes.includes("internal") || classes.includes("tag-link")) return
            const slug = node.properties?.["data-slug"] ?? node.properties?.dataSlug
            if (typeof slug !== "string" || exists(slug)) return
            node.properties.className = [...classes.filter((c) => c !== "broken"), "broken"]
            node.properties["data-no-popover"] = "true"
            node.properties.title = "Not written yet"
          })
        },
      ]
    },
  }
}
export { BrokenLinks }
