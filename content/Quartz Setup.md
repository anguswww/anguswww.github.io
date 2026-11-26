---
publish: true
created: 2026-11-25T09:07:52.674Z
modified: 2026-11-26T07:27:25.222Z
published: 2026-11-26T07:27:25.222Z
tags:
  - Outline
categories:
dg-publish: true
---

This note stores information on my Quartz setup for this site along with prospective changes.

## Features

- Uses Quartz Syncer in my Obsidian vault
  - Only notes with publish flags are published.
  - Structure of the vault is reflected in the site
  - In Obsidian, published notes are indicated with a plant symbol next to them.
- Custom theming with a unified design system
  - Notes at different stages are given different colours and symbols
  - Newsreader is used for body text, Inter is used for interface
  - graph view is customised to follow note stage colours
- Map notes display lists using Obsidian Bases.

## Structure

- Follows my Obsidian vault, roughly the same as in [[Digital Gardening]]

### Status tags

Notes are graded on a scale using tags.

#Outline notes are dot points that probably don't make sense to anyone other than myself.

#Draft notes are minimally edited paragraphs. Basically anything that has moved beyond the dot-point stage.

#semi-polished notes are mostly readable, but not fully completed.

#polished notes are essentially complete, with no real edits to be made.

[Gwern](https://gwern.net/about#confidence-tags) seems to have independently come up with similar categories.

## Things to add/change

### To-do

- [x] Organise the sidebar ✅ 2026-11-26
- [x] Fix weird issues with sidebar: clicking folder name vs clicking arrow ✅ 2026-11-26
- [x] Fix dot point colour on multi level lists ✅ 2026-11-26
- [x] polished notes should have a better icon ✅ 2026-11-26
- [x] dead links should be crossed out ✅ 2026-11-26
- [x] 404 pages remove sidebar and leave users stranded ✅ 2026-11-26
- [x] quoted notes have large whitespace at the top ✅ 2026-11-26
- [x] quoted notes jump to the wrong place in the note ✅ 2026-11-26
- [x] checkboxes can be checked on the site and this saves to the device ✅ 2026-11-26
- [x] checked checkboxes shouldn't have weird tick mark ✅ 2026-11-26
- [x] hovered notes show the current note colours and icon ✅ 2026-11-26
- [x] map note bases need polishing ✅ 2026-11-26

\~~After all of this is done, probably take a break from editing configuration. Massive time sink. probably better to collect a list of issues and then delegate them to claude each week instead of constantly tweaking things.~~ Done. Time for a pause on editing config.

- [ ] fill in index on homepage when there are enough notes

### Possible changes

list of ideas that i'm not fully committed to.

- change ordering or design of symbols to be less arbitrary
- reading log for books/articles
- idea log for ideas that don't have their own notes? unsure about this, seems downstream of sidebar issue
- filtering maps by completion level
- maybe no sidebar?
- footnote specific hover preview
- comments? is this possible w/ github pages

## Changelog

| Date       | Changes                                                                                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-26 | Organised sidebar; Fixed folder clicks, quote jumps and spacing; Crossed out dead links; Read-only checkboxes; Gem icon for polished notes; Previews match their note; Sidebar on 404 page; Tidied map tables; Justified text |
| 2026-11-25 | Fixed dot points being misaligned with text; Added Maps                                                                                                                                                                       |

---

## testing area

i also use this note to test functionality without disturbing other notes.

Obsidian supports Markdown footnotes for citations and side notes[^1].
This point needs quick context^\[A brief note right where you write.].

[^1]: Author, A. (2025). _Title of Work_. Publisher.
