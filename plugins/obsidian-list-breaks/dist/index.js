// In CommonMark an unindented line straight after a list item is a "lazy
// continuation" and gets folded into that item:
//
//   - last item
//   This should be a new paragraph.
//
// Obsidian ends the list there instead. Insert a blank line so Quartz
// renders it the way it looks in Obsidian. Frontmatter and fenced code
// blocks are left alone.
const LIST_ITEM_RE = /^\s*(?:[-*+]|\d+[.)])(?:\s|$)/
const FENCE_RE = /^\s*(```|~~~)/

export default function ObsidianListBreaks() {
  return {
    name: "ObsidianListBreaks",
    textTransform(_ctx, src) {
      const lines = src.split("\n")
      const out = []
      let i = 0

      // Skip YAML frontmatter
      if (lines[0]?.trim() === "---") {
        const end = lines.findIndex((l, n) => n > 0 && l.trim() === "---")
        if (end > 0) {
          out.push(...lines.slice(0, end + 1))
          i = end + 1
        }
      }

      let fence = null
      let inList = false
      let prevBlank = false
      for (; i < lines.length; i++) {
        const line = lines[i]
        const f = line.match(FENCE_RE)
        if (fence) {
          if (f && f[1] === fence) fence = null
          out.push(line)
          continue
        }
        if (f) fence = f[1]

        const blank = line.trim() === ""
        if (blank) {
          // an indented line after a blank still belongs to the list
        } else if (LIST_ITEM_RE.test(line)) {
          inList = true
        } else if (/^\S/.test(line)) {
          if (inList && !prevBlank) out.push("")
          inList = false
        }
        prevBlank = blank
        out.push(line)
      }
      return out.join("\n")
    },
  }
}
export { ObsidianListBreaks }
