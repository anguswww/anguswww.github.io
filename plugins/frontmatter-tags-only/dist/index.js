// With parseTags on, obsidian-flavored-markdown (order 40) renders inline #tags
// as links but also merges them into frontmatter.tags, so they show in the page's
// tag list and on tag pages. This snapshots the frontmatter tags before OFM runs
// (markdown stage, after the built-in frontmatter step at 0) and restores them in
// the HTML stage, which runs after every markdown plugin.
const KEY = "frontmatterTagsOnly"

export default function FrontmatterTagsOnly() {
  return {
    name: "FrontmatterTagsOnly",
    markdownPlugins() {
      return [
        () => (_tree, file) => {
          const fm = file.data.frontmatter
          if (fm) file.data[KEY] = Array.isArray(fm.tags) ? [...fm.tags] : undefined
        },
      ]
    },
    htmlPlugins() {
      return [
        () => (_tree, file) => {
          const fm = file.data.frontmatter
          if (!fm || !(KEY in file.data)) return
          const saved = file.data[KEY]
          if (saved === undefined) delete fm.tags
          else fm.tags = saved
          delete file.data[KEY]
        },
      ]
    },
  }
}
export { FrontmatterTagsOnly }
