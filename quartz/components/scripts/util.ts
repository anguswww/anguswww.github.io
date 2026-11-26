export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
  if (!outsideContainer) return
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return
    e.preventDefault()
    e.stopPropagation()
    cb()
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }

  outsideContainer?.addEventListener("click", click)
  window.addCleanup(() => outsideContainer?.removeEventListener("click", click))
  document.addEventListener("keydown", esc)
  window.addCleanup(() => document.removeEventListener("keydown", esc))
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

// AliasRedirect emits HTML redirects which also have the link[rel="canonical"]
// containing the URL it's redirecting to.
// Extracting it here with regex is _probably_ faster than parsing the entire HTML
// with a DOMParser effectively twice (here and later in the SPA code), even if
// way less robust - we only care about our own generated redirects after all.
const canonicalRegex = /<link rel="canonical" href="([^"]*)">/

export async function fetchCanonical(url: URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${url}`, init)
  if (!res.headers.get("content-type")?.startsWith("text/html")) {
    return res
  }

  // reading the body can only be done once, so we need to clone the response
  // to allow the caller to read it if it's was not a redirect
  const text = await res.clone().text()
  const [_, redirect] = text.match(canonicalRegex) ?? []
  return redirect ? fetch(`${new URL(redirect, url)}`, init) : res
}

const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const

/**
 * Scroll to an anchor and keep it there while the content around it settles.
 *
 * Images (and embeds) above the anchor load after the first scroll and push it down,
 * so a link to `note#heading` used to land thousands of pixels short. Each time one of
 * `watch` changes size the scroll is redone, until the reader scrolls themselves, or
 * `maxMs` passes. Returns a function that stops it early (e.g. on the next navigation).
 */
export function holdScroll(scroll: () => void, watch: Element[], maxMs = 8000): () => void {
  scroll()
  let done = false
  const rescroll = () => {
    if (!done) scroll()
  }
  const observer = new ResizeObserver(rescroll)
  // an image's `load` doesn't bubble, but it can be caught on the way down
  const onLoad = (e: Event) => {
    if (watch.some((el) => el.contains(e.target as Node))) requestAnimationFrame(rescroll)
  }
  const stop = () => {
    if (done) return
    done = true
    observer.disconnect()
    clearTimeout(timer)
    document.removeEventListener("load", onLoad, true)
    for (const ev of USER_SCROLL_EVENTS) window.removeEventListener(ev, stop, true)
  }
  for (const el of watch) observer.observe(el)
  document.addEventListener("load", onLoad, true)
  const timer = setTimeout(stop, maxMs)
  for (const ev of USER_SCROLL_EVENTS) {
    window.addEventListener(ev, stop, { capture: true, passive: true })
  }
  return stop
}
