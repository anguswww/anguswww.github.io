// `categories: ["[[Obsidian]]", "[[Books]]"]` in a note's frontmatter links it to
// map notes (which list their members through an embedded Category.base).
// This puts those links in a row at the top of the note body:
//
//   <nav class="note-categories"><a href="Obsidian">Obsidian</a>…</nav>
//
// It must run before the built-in links step (order 60), which resolves the bare
// hrefs like wikilinks (shortest path), marks them internal or broken, and makes
// popovers work. A category whose map note isn't published gets the class
// `missing` (the built-in only marks broken links when disableBrokenWikilinks is
// on site-wide). Styled in quartz/styles/custom.scss.

const WIKILINK = /^\s*!?\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]\s*$/

function parse(value) {
  if (typeof value !== "string" || value.trim() === "") return null
  const m = value.match(WIKILINK)
  if (m) return { target: m[1].trim(), label: (m[2] ?? m[1]).trim() }
  return { target: value.trim(), label: value.trim() }
}

export default function CategoryLinks() {
  return {
    name: "CategoryLinks",
    htmlPlugins(ctx) {
      // last path segment of every published page, the way shortest resolution matches
      const names = new Set((ctx.allSlugs ?? []).map((s) => s.split("/").pop().toLowerCase()))
      const published = (target) =>
        names.has(target.split("/").pop().trim().replace(/ /g, "-").toLowerCase())
      return [
        () => (tree, file) => {
          const raw = file.data.frontmatter?.categories
          const list = (Array.isArray(raw) ? raw : [raw]).map(parse).filter(Boolean)
          if (list.length === 0) return
          tree.children.unshift({
            type: "element",
            tagName: "nav",
            properties: { className: ["note-categories"], ariaLabel: "Categories" },
            children: list.map(({ target, label }) => ({
              type: "element",
              tagName: "a",
              properties: {
                href: target.replace(/ /g, "-"),
                ...(published(target) ? {} : { className: ["missing"] }),
              },
              children: [{ type: "text", value: label }],
            })),
          })
        },
      ]
    },
  }
}
export { CategoryLinks }
