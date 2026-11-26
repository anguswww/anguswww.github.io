---
publish: true
created: 2026-11-25T11:13:11.965Z
modified: 2026-11-26T04:56:42.762Z
published: 2026-11-26T04:56:42.762Z
tags:
  - map
categories:
dg-publish: true
---

_Notes related to philosophy._

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
      file.name: 458

```
