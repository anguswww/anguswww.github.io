---
publish: true
created: 2026-11-25T09:07:52.674Z
modified: 2026-11-25T10:38:28.015Z
published: 2026-11-25T10:38:28.015Z
tags:
  - Outline
categories:
dg-publish: true
---

Log of changes to my Quartz setup for this site.

| Date       | Changes                                                 |
| ---------- | ------------------------------------------------------- |
| 2026-11-25 | Fixed dot points being misaligned with text; Added Maps |

---

## testing area

i also use this note to test functionality

```base
formulas:
  Untitled: ""
properties:
  file.name:
    displayName: Name
  file.ctime:
    displayName: Created Time
views:
  - type: table
    name: View
    order:
      - file.name
      - file.ctime
    sort:
      - property: file.ctime
        direction: DESC
      - property: formula.Untitled
        direction: ASC
    columnSize:
      file.name: 504
  - type: list
    name: View 2
    filters:
      and:
        - file.tags.contains("Outline")
    markers: bullet
    indentProperties: false

```
