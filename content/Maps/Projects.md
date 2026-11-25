---
publish: true
created: 2026-11-25T11:13:11.973Z
modified: 2026-11-25T11:13:11.974Z
published: 2026-11-25T11:13:11.974Z
tags:
  - map
categories:
dg-publish: true
---

Projects, both complete and in progress

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
      file.name: 463

```
