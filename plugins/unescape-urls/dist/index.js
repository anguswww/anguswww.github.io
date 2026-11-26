// Quartz Syncer escapes markdown punctuation in plain text, which turns
// bare URLs like https://en.wikipedia.org/wiki/Rhizome_(philosophy) into
// https://en.wikipedia.org/wiki/Rhizome\_(philosophy). GFM autolinking then
// keeps the backslash (%5C) and the link breaks. Undo escapes inside URLs.
const URL_RE = /\bhttps?:\/\/[^\s<>"'`]+/g
const ESCAPE_RE = /\\([!-\/:-@\[-`{-~])/g

// It also escapes a strikethrough that opens a line (`\~~done~~`), so the
// tildes print literally. Unescape it when the line closes the strikethrough.
const STRIKE_RE = /\\~~(?=[^~\s])([^\n]*?[^~\s\\])~~/g

function unescapeStrikes(src) {
  let inFence = false
  return src
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
      return inFence ? line : line.replace(STRIKE_RE, "~~$1~~")
    })
    .join("\n")
}

export default function UnescapeUrls() {
  return {
    name: "UnescapeUrls",
    textTransform(_ctx, src) {
      return unescapeStrikes(src.replace(URL_RE, (url) => url.replace(ESCAPE_RE, "$1")))
    },
  }
}
export { UnescapeUrls }
