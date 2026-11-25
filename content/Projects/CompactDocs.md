---
publish: true
created: 2026-11-25T00:21:27.242Z
modified: 2026-11-25T09:36:06.178Z
published: 2026-11-25T09:36:06.178Z
tags:
  - "#Semi-Polished"
categories:
  - "[[UX Design]]"
  - "[[Projects]]"
dg-publish: true
---

![[Attachments/marquee-promo.png]]

[Chrome Web Store](https://chromewebstore.google.com/detail/compactdocs/lilnjbpiikjfknobepdnlepjgalgdcfi) ・[Website](https://anguswww.github.io/compactdocs-chrome-extension/)・[GitHub](https://github.com/anguswww/compactdocs-chrome-extension)

This is a Chrome Extension that removes useless whitespace from Google Docs. It was partially born out of frustration. This should really be a settings toggle in Google Docs.

## What issue does it solve?

I often have a document I'm working on tiled to one side of the screen, and another document I'm referencing tiled to the other side. Google Docs makes this workflow annoying, since it takes up lots of whitespace for it's document tabs, even when the tabs are minimised. This small amount of whitespace makes the text much harder to read.
The whitespace on each side is also uneven, which is ugly.

**Without CompactDocs**
![[Attachments/before-tabs-minimised-fit-780.png]]

CompactDocs reclaims the lost whitespace, and makes both sides the same width.

**With CompactDocs**
![[Attachments/fit-780.png]]

Document tabs can still be accessed by hovering over the left edge of the screen.

![[Attachments/hover-left-780.png]]

## Am I missing something?

I'm kind of perplexed at why a solution to this problem didn't already exist, either as an extension or inbuilt. Google Docs has over one billion monthly active users according to a quick search. I feel like using one half of the screen for your writing and the other for a source is a common workflow. The document tabs feature has been around since 2024 so this has been an issue for two years.

Surely some small percentage of the one billion Google Docs users are annoyed by this and have the skillset to solve it. My conservative back of the napkin calculations give me 250,000 people who would be annoyed by this and could solve it (one billion users \* 0.5% being software devs, a lowball estimate \* 5% finding this annoying). At least one of these 250,000 people would probably be annoyed enough to make an extension.

Am I missing something? I feel like one of these core assumptions must be wrong:

1. Very few people have documents tiled to one half of the screen. This feels hard to believe since it seems like such an obvious workflow.
2. An extremely small subset of people find this issue annoying enough to write a simple extension or make AI do it for them. Opus 4.5 could probably write this extension, and it came out a year ago.
3. There is a solution to this issue already, either hidden in Docs' settings or an extension Opus 5.5 couldn't find by search.

It just seems like such low hanging fruit. If you know of some hidden toggle in Docs that reclaims this whitespace or know why my assumptions are wrong, please DM me on Discord `@anguswww`.
