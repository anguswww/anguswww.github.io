// Oculus theme: mark internal links with the status of the page they point to,
// so CSS can colour them by status (#outline → #draft → #semi-polished → #polished).
// Links get `data-status="<status>"`. Pages without a status tag get nothing.
// Maps of content (#map notes, and Home) are not on the status scale; they get
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
  if (slug === "index" || tags.includes("map")) return "map"
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
    ".explorer a[href], .backlinks a[href], .recent-notes a.internal:not(.tag-link), article .bases-table td a.internal:not(.tag-link)",
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

// plugins/category-links renders a note's categories at the top of the body
// (a transformer can't reach the header). Move them into the header:
//  - categories that are maps (or unpublished, so unknown) become violet chips
//    in the tag row, next to the status chip;
//  - categories that are ordinary notes go in a row underneath, each with its
//    status circle, the way notes appear in the explorer and backlinks.
// CSS hides the body copy until then.
async function moveCategories() {
  const nav = document.querySelector<HTMLElement>("article nav.note-categories")
  const header = document.querySelector<HTMLElement>(".page-header")
  if (!nav || !header) return
  const idx = await loadIndex()
  // the page may have changed while the index loaded
  if (!nav.isConnected) return

  let chips = header.querySelector<HTMLUListElement>("ul.tags")
  let notes: HTMLElement | null = null
  for (const a of Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"))) {
    const slug = a.dataset.slug ?? ""
    const entry = idx[slug]
    const status = entry ? statusOf(entry, slug) : "map"
    if (status === "map") {
      if (!chips) {
        chips = document.createElement("ul")
        chips.className = "tags"
        header.appendChild(chips)
      }
      a.classList.add("tag-link", "category-chip")
      const li = document.createElement("li")
      li.appendChild(a)
      chips.appendChild(li)
    } else {
      if (!notes) {
        notes = document.createElement("nav")
        notes.className = "note-related"
        notes.setAttribute("aria-label", "Related notes")
      }
      if (status) a.dataset.status = status
      notes.appendChild(a)
    }
  }
  // directly under the tag row, so the two rows read as one block
  if (notes) {
    if (chips) chips.after(notes)
    else header.appendChild(notes)
  }
  nav.remove()
}

// A task's text starts with the space after its checkbox; a checked task's
// strikethrough then begins in the gap ("-Checked task"). Drop that space
// (the checkbox has its own margin).
function trimTaskSpaces() {
  for (const box of document.querySelectorAll<HTMLInputElement>("article li input[type='checkbox']")) {
    const next = box.nextSibling
    if (next?.nodeType === Node.TEXT_NODE && /^\s/.test(next.textContent ?? "")) {
      next.textContent = next.textContent!.replace(/^\s+/, "")
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
  void moveCategories()
  trimTaskSpaces()
  // The 404 page is served at whatever URL was missing, so its relative links
  // (the wordmark's ".") resolve against that path. Point it at the site root.
  if (document.body.dataset.slug === "404") {
    const base = (document.body.dataset.basepath ?? "").replace(/\/$/, "")
    document.querySelector<HTMLAnchorElement>(".page-title a")?.setAttribute("href", base + "/")
  }
  observer.observe(document.body, { childList: true, subtree: true })
  schedule()
})

// Crossed-out links (plugins/broken-links) go nowhere: don't open the 404.
// Capture phase, so it runs before the SPA router's window listener.
if (!(window as unknown as { __oculusBroken?: boolean }).__oculusBroken) {
  ;(window as unknown as { __oculusBroken?: boolean }).__oculusBroken = true
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a.broken")
      if (!a) return
      e.preventDefault()
      e.stopPropagation()
    },
    true,
  )
}
