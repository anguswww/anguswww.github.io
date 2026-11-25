---
publish: true
created: 2026-11-24T02:57:12.679Z
modified: 2026-11-25T10:46:47.004Z
published: 2026-11-25T10:46:47.004Z
tags:
  - MOC
categories:
dg-publish: true
---

Notes related to philosophy.

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
```
