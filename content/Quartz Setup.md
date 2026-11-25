---
publish: true
created: 2026-11-25T09:07:52.674Z
modified: 2026-11-25T09:26:21.085Z
tags:
  - Outline
---

Log of changes to my Quartz setup for this site.

| Date       | Changes                                     |
| ---------- | ------------------------------------------- |
| 2026-11-25 | Fixed dot points being misaligned with text |

---

## testing area

i also use this note to test functionality

```base
formulas:
  Untitled: ""
views:
  - type: table
    name: View
    order:
      - file.name
      - file.ctime
    sort:
      - property: formula.Untitled
        direction: ASC
    columnSize:
      file.name: 549
  - type: list
    name: View 2
    filters:
      and:
        - file.tags.contains("Outline")
    markers: bullet
    indentProperties: false

```
