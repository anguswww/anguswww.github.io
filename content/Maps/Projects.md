---
publish: true
created: 2026-09-21T23:15:06.530Z
modified: 2026-11-25T10:25:36.907Z
published: 2026-11-25T10:25:36.907Z
tags:
  - MOC
categories:
dg-publish: true
---

Map of content for projects.

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
