// Oculus theme: mark internal links with the status of the page they point to,
// so CSS can colour them by status (#outline → #draft → #semi-polished → #polished).
// Links get `data-status="<status>"`. Pages without a status tag get nothing.
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

function statusOf(entry: Entry | undefined): string | undefined {
  const tags = (entry?.tags ?? []).map((t) => t.toLowerCase())
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

async function mark() {
  const idx = await loadIndex()
  const links = document.querySelectorAll<HTMLAnchorElement>(
    ".explorer a[href], .backlinks a[href], .recent-notes a.internal:not(.tag-link)",
  )
  for (const a of links) {
    if (a.getAttribute("href")?.startsWith("#")) continue
    const status = statusOf(idx[slugFromHref(a.href)])
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
