---
publish: true
created: 2026-11-25T09:07:52.674Z
modified: 2026-11-25T14:46:48.499Z
published: 2026-11-25T14:46:48.499Z
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
- Notes are on a scale from outline -> draft -> semi-polished -> polished
  - outline - dot points that probably don't make sense to anyone other than myself
  - draft - notes with minimally edited paragraphs
  - semi-polished - notes that are mostly readable, but not fully completed
  - polished - notes that are essentially complete. no real edits to be made.
  - unsure if these are the ideal categories or words to use. e.g. is a reading log a draft? or an outline? maybe there is a place for uncategorised notes in this system.
- maybe projects shouldn't be in a separate folder? there should be a projects map that highlights the main projects. the highlights could be embedded in the index on the homepage

## Things to add/change

### To-do

- [ ] Organise the sidebar
- [ ] Fix weird issues with sidebar: clicking folder name vs clicking arrow
- [ ] Fix dot point colour on multi level lists
- [ ] polished notes should have a better icon
- [ ] dead links should be crossed out
- [ ] 404 pages remove sidebar and leave users stranded
- [ ] quoted notes have large whitespace at the top
- [ ] quoted notes jump to the wrong place in the note
- [ ] checkboxes can be checked on the site and this saves to the device
- [ ] checked checkboxes shouldn't have weird tick mark
- [ ] hovered notes show the current note colours and icon
- [ ] map note bases need polishing

After all of this is done, probably take a break from editing configuration. Massive time sink. probably better to collect a list of issues and then delegate them to claude each week instead of constantly tweaking things.

- [ ] fill in index on homepage when there are enough notes

### Possible changes

list of ideas that i'm not fully committed to.

- change ordering or design of symbols to be less arbitrary
- reading log for books/articles
- idea log for ideas that don't have their own notes? unsure about this, seems downstream of sidebar issue
- maybe no sidebar?

## Changelog

| Date       | Changes                                                 |
| ---------- | ------------------------------------------------------- |
| 2026-11-25 | Fixed dot points being misaligned with text; Added Maps |

---

## testing area

i also use this note to test functionality without disturbing other notes.

Obsidian supports Markdown footnotes for citations and side notes[^1].
This point needs quick context^\[A brief note right where you write.].

[^1]: Author, A. (2025). _Title of Work_. Publisher.
