// Quartz Syncer escapes markdown punctuation in plain text, which turns
// bare URLs like https://en.wikipedia.org/wiki/Rhizome_(philosophy) into
// https://en.wikipedia.org/wiki/Rhizome\_(philosophy). GFM autolinking then
// keeps the backslash (%5C) and the link breaks. Undo escapes inside URLs.
const URL_RE = /\bhttps?:\/\/[^\s<>"'`]+/g
const ESCAPE_RE = /\\([!-\/:-@\[-`{-~])/g

export default function UnescapeUrls() {
  return {
    name: "UnescapeUrls",
    textTransform(_ctx, src) {
      return src.replace(URL_RE, (url) => url.replace(ESCAPE_RE, "$1"))
    },
  }
}
export { UnescapeUrls }
