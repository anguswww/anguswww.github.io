---
publish: true
created: 2026-11-19T11:39:46.762Z
modified: 2026-11-24T07:49:54.853Z
tags:
  - "#Draft"
---

[Obsidian](https://obsidian.md/) is an extremely powerful note taking application that allows you to hyperlink notes together. It is extremely customisable. This is great, since the app can be adapted to your very specific use case. It is also terrible, since new users are given basically zero direction. This leads to new users either abandoning the app, or using it in suboptimal ways carried over from other notes apps. Online tutorials don't really help either, as they are either (_in my experience_) over opinionated, and structured to fit the creators ideals, or under opinionated, and present options without much guidance.

I wrote this to fill the gap in tutorials, giving new users sensible defaults for organising their notes. No singular tutorial really made Obsidian _click_ for me, so I'm sort-of writing a tutorial that my past self would find useful.

## What makes Obsidian better than any other app?

- You can link notes together across different topics and areas. This may be possible in other apps but it's very well supported in Obsidian.
- Your notes are stored on your own device as readable text. If Obsidian disappeared tomorrow your notes would still be readable and safe. There are also ways to back up your notes to the cloud.
- If you want to start a [[Digital Gardening|Digital Garden]], Obsidian is the best, most well supported way to do this.

This post will assume you can download and install [Obsidian](https://obsidian.md/download), and know basic [markdown syntax](https://www.markdownguide.org/cheat-sheet/). Markdown is fairly simple to understand, and there are good tutorials online.

## Basics

1. [Internal Links](https://obsidian.md/help/links) to other notes are made using `[[note name]]`. This is a very important feature.
2. [Properties](https://obsidian.md/help/properties#Property+format) can be added by entering `---` at the start of notes or by pressing `Cmd/Ctrl`+`;`. Also very important.

## Trees vs Roots

### Folders

Folders should be mostly avoided, and the desire to organise each note into a corresponding topic folder should be avoided completely. This will seem scary and disorganised at first, but I can justify why this approach is better.

We'll use my note on [[Chat interfaces as human disempowerment]] as an example. It ties together ideas in _UX Design_, _AI Safety_, and _Philosophy_. Great! I, the naive new Obsidian user, have folders for all of these topics in my vault!

![[Attachments/Pasted image 20261124141532.png|353]]

Wait... I can only put the note into one of these folders. Maybe I shouldn't be thinking in ways that cut across disciplines :( If only there was a better way.

We have run into the core limitation of folder structures. Folders can be thought of like 'trees.' Each subfolder branches off of one main folder. This mode of classification works for some concepts, but not for most.

![[Attachments/tree.webp]]
_A tree. Computer Scientists haven't ever seen a tree so they draw them upside-down._

There is an alternative to the tree, the [Rhizome](https://en.wikipedia.org/wiki/Rhizome_\(philosophy\)). Instead of trees, where one branch has to come off of another, rhizomes grow and knot together into a web of interconnected roots.

![[Attachments/rhizome.jpg]]
_A rhizome._

Most notes apps other than Obsidian impose a tree structure onto your thoughts, even though a rhizomatic structure fits better.

![[Attachments/Rhizome_vs_tree.jpg]]
_In red, the evil, oppressive, arborescent, tree. In green, the free, anarchic, messy rhizome._

The ideal structure for an Obsidian vault is rhizomatic. Ideas should be able to connect easily, and you shouldn't run into friction when doing so.

## Maps and Categories

The solution to this issue is to use **Maps**, which are notes for specific topics that we link to from our other notes. There is nothing inherently special about these notes, they are just markdown files like all our other notes. I like to keep mine in a separate folder.

![[Attachments/Pasted image 20261124144540.png|357]]

I'll add a property called `categories` to my notes, making sure it is set to the 'List' type.

![[Attachments/Pasted image 20261124144930.png|340]]

Pressing `[[` in the properties' field unlocks an important 'secret' feature.

![[Attachments/Pasted image 20261124145055.png]]

A category can be a link to our maps!

![[Attachments/Pasted image 20261124145128.png]]

Even better, if we add a categories property to our other notes it auto populates with previously used links.

![[Attachments/Pasted image 20261124145238.png]]

At this point we have a minimum viable Obsidian setup that avoids most of the pitfalls. There are some usability issues that can be fixed using plugins. I will create a vault template addressing most of the important ones which I will link here later.

## Important Shortcuts and Syntax

### Shortcuts

Listed using `Cmd` for Mac, Windows/Linux equivalents should just be the same but with `Ctrl`.

- `Cmd`+`P` - **Command Palette.** Search a list of commands from Obsidian and Plugins.
- `Cmd`+`O` - **Quick Switcher.** Search for and open your notes easily.
- `Cmd`+`N` - **New Note**
- `Cmd`+`T` - **New Tab**
- `Cmd+B` / `Cmd+I` **Bold / italic.**
- `Cmd+K` **Insert a Markdown link.**

### Syntax

- `[[` - Link to a note in your vault
- `![[` - Embed a note or image.
- `[[Note|text]]` Internal link that shows custom text.

## Improvements

I will make a vault template with most of these set-up. I would still recommend skimming this to understand how everything works.

### I don't want to manually add a categories property for each note.

The [Templater](https://community.obsidian.md/plugins/templater-obsidian) plugin allows you to set a template for every new note.

1. Create a folder for your templates, and a default note with a categories property using the process from [[How to actually use Obsidian#Maps and Categories]]

![[Attachments/Pasted image 20261124170840.png|277]]![[Attachments/Pasted image 20261124170746.png|242]]

I have a tags property included as well, which isn't required. You can change the template to work for you.

2. Install and enable the [Templater](https://community.obsidian.md/plugins/templater-obsidian) plugin.
3. Set your template folder and turn on the 'Trigger Templater on new file creation' in the plugin settings
   ![[Attachments/Pasted image 20261124171941.png]]

![[Attachments/Pasted image 20261124170029.png]]

4. Under 'Folder templates,' add a rule for the / (root) directory and select your template.
   ![[Attachments/Pasted image 20261124172108.png]]

### My maps are just empty notes that don't display members of their category.

#### Dataview

The [Dataview](https://community.obsidian.md/plugins/dataview) plugin allows you to query your notes like a database. It is capable of lots of things, but for this use case we will just be using it to show notes that belong to a specific category.

1. Install and enable the [Dataview](https://community.obsidian.md/plugins/dataview) plugin.
2. Paste the following code block into your maps under a notes heading.

```markdown
| File                                                                          | Created  | Last Modified |
| ----------------------------------------------------------------------------- | -------- | ------------- |
| [[Meta; How to actually use Obsidian.md\|Meta; How to actually use Obsidian]] | 24/11/26 | 24/11/26      |

```

3. Your notes linking to the map should now be displayed ordered based on when they were last modified.

![[Attachments/Pasted image 20261124175254.png]]

You may want your notes displayed differently. I would recommend using an LLM to create custom queries that fit your needs, but you could also [learn dataview](https://blacksmithgu.github.io/obsidian-dataview/) and dataviewjs to make your own queries.

#### Bases

[Bases](https://obsidian.md/help/bases) are built into Obsidian and enabled by default. They have benefits and drawbacks compared to Dataview. They have better UI/UX than basic dataview components, but require a seperate .base file outside of your map.

To display a base inside of your map note, you use the syntax `![[Map.base]]`

![[Attachments/Pasted image 20261124175101.png]]

### I want a cloud backup of my notes that syncs to all my devices.

If you are tech savvy enough to know what Git is, I would recommend backing up your notes to a private GitHub repo using the [Git Sync](https://community.obsidian.md/plugins/git-obsi-sync) plugin. If you don't want to deal with version control, Obsidian sells an [Obsidian Sync](https://obsidian.md/sync) subscription for \$4/month.

For syncing via Git to my iPhone I use [GitSync](https://apps.apple.com/us/app/gitsync/id6744980427).

### I want an easy way to have a daily journal.

Obsidian has a daily notes plugin built in. I keep my daily notes in a subfolder and the template does the same.

### I want the app to look better

There are many [themes](https://community.obsidian.md/search?type=theme) available for Obsidian. You can also change fonts in settings. I currently use the [Minimal](https://community.obsidian.md/themes/minimal) theme.

### Attachments keep cluttering up my notes.

You should create an attachments folder, then open Obsidian's settings and set attachments to go there.

![[Attachments/Pasted image 20261124180915.png]]

### Links don't update when I rename notes.

When you first rename or move a note with links to it you will get this pop-up. You should click 'Always update.' This can be changed in settings if you have already clicked 'Do not update.'
![[Attachments/Pasted image 20261124180634.png|505]]

---

**Everything past here is WIP.**

## Digital Gardening

Use Quartz Syncer publishing to GitHub Pages. forestry.md is also an option.

## Why not Tags?

I'll add tags with Obsidian's [YAML Frontmatter](https://publish.obsidian.md/advanced-uri-doc/Actions/Frontmatter) by putting `---` at the top of my note.

![[Attachments/Pasted image 20261124142259.png]]

Great. This avoids the need to fit notes into only one category. Let's click the philosophy tag to see all my notes on philosophy.
![[Attachments/Pasted image 20261124142607.png|336]]

This is... Okay, but looks kind of ugly. I guess I'll live with it for now. It would be good to be able to see when
