---
publish: true
aliases:
  - AI
created: 2026-11-25T11:13:11.956Z
modified: 2026-11-25T11:13:11.956Z
published: 2026-11-25T11:13:11.956Z
tags:
  - map
categories:
dg-publish: true
---

Notes related to AI research.

## Notes

```base
formulas:
  Created: file.ctime.format("DD/MM/YY")
  Last Modified: file.mtime.format("DD/MM/YY")
views:
  - type: table
    name: Notes
    filters:
      and:
        - categories.contains(this.file.asLink())
    order:
      - file.name
      - formula.Created
      - formula.Last Modified
    sort:
      - property: file.mtime
        direction: DESC
    columnSize:
      file.name: 455

```
