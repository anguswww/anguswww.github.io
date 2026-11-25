// Oculus theme: mark internal links with the status of the page they point to,
// so CSS can colour them by status (#outline → #draft → #semi-polished → #polished).
// Links get `data-status="<status>"`. Pages without a status tag get nothing.
// Maps of content (#MOC notes, and Home) are not on the status scale; they get
// `data-status="map"`, which wins over any status tag.
// The explorer renders asynchronously, so links are re-marked whenever the DOM changes.

declare const fetchData: Promise<Record<string, unknown>>

type Entry = { tags?: string[] }

const STATUSES = ["outline", "draft", "semi-polished", "polished"] as const

let index: Record<string, Entry> | null = null

async function loadIndex(): Promise<Record<string, Entry>> {
  if (index) return index
  const data = (await fetchData) as { content?: Record<string, Entry> } & Record<string, Entry>
  index = (data.content ?? data) as Record<string, Entry>
  return index
}

function statusOf(entry: Entry | undefined, slug: string): string | undefined {
  const tags = (entry?.tags ?? []).map((t) => t.toLowerCase())
  if (slug === "index" || tags.includes("moc")) return "map"
  return STATUSES.find((s) => tags.includes(s))
}

function slugFromHref(href: string): string {
  const url = new URL(href, location.href)
  let path = decodeURIComponent(url.pathname)
  const base = (document.body.dataset.basepath ?? "").replace(/\/$/, "")
  if (base && path.startsWith(base + "/")) path = path.slice(base.length)
  path = path.replace(/^\/+/, "").replace(/\.html$/, "")
  if (path === "" || path.endsWith("/")) path += "index"
  return path
}

// Inline #tags link to /tags/<tag>, but tag pages only exist for tags some page
// has in its frontmatter. Disable links to missing tag pages (styled as plain chips).
function unlinkMissingTags(idx: Record<string, Entry>) {
  const known = new Set<string>()
  for (const entry of Object.values(idx)) {
    for (const t of entry?.tags ?? []) {
      const parts = t.toLowerCase().split("/")
      for (let i = 1; i <= parts.length; i++) known.add(parts.slice(0, i).join("/"))
    }
  }
  const links = document.querySelectorAll<HTMLAnchorElement>("article a.tag-link[data-slug^='tags/']")
  for (const a of links) {
    const tag = a.dataset.slug!.slice("tags/".length).toLowerCase()
    if (tag === "" || tag === "index" || known.has(tag)) continue
    // keep the <a> (and its href) so tag-chip styles still apply; CSS disables it
    a.dataset.noPage = ""
    a.tabIndex = -1
    a.setAttribute("aria-disabled", "true")
  }
}

async function mark() {
  const idx = await loadIndex()
  unlinkMissingTags(idx)
  const links = document.querySelectorAll<HTMLAnchorElement>(
    ".explorer a[href], .backlinks a[href], .recent-notes a.internal:not(.tag-link)",
  )
  for (const a of links) {
    if (a.getAttribute("href")?.startsWith("#")) continue
    const slug = slugFromHref(a.href)
    const status = statusOf(idx[slug], slug)
    if (status) {
      if (a.dataset.status !== status) a.dataset.status = status
    } else if (a.dataset.status) {
      delete a.dataset.status
    }
  }
}

let scheduled = false
function schedule() {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => {
    scheduled = false
    void mark()
  })
}

// childList only: setting data-status is an attribute change, so this never loops
const observer = new MutationObserver(schedule)

document.addEventListener("nav", () => {
  observer.disconnect()
  observer.observe(document.body, { childList: true, subtree: true })
  schedule()
})
