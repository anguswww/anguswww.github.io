---
publish: true
created: 2026-11-25T09:07:52.674Z
modified: 2026-11-25T09:22:34.076Z
tags:
  - Outline
---

Log of changes to my Quartz setup for this site.

- 2026-11-25

---

## testing area

i also use this note to test functionality

```base
formulas:
  Untitled: ""
views:
  - type: table
    name: View
    filters:
      and:
        - note["dg-publish"] == true
    order:
      - file.name
      - file.ctime
    sort:
      - property: formula.Untitled
        direction: ASC
  - type: list
    name: View 2
    filters:
      and:
        - file.tags.contains("Outline")
    markers: bullet
    indentProperties: false

```
