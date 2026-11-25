---
publish: true
created: 2026-11-25T08:49:48.349Z
modified: 2026-11-25T08:50:49.186Z
tags:
  - Semi-Polished
---

## tl;dr

- Don't put notes in topic folders. Link them to map notes instead.
- Every note should have a `categories` property, which is a list of internal links to your map notes.
- My [vault template](https://github.com/anguswww/obsidian-vault-template/releases/latest) sets this up with sensible defaults.

---

[Obsidian](https://obsidian.md/) is a powerful note-taking application that allows you to hyperlink your notes together. I wrote this post because no single online tutorial made the app _click_ for me. Most tutorials either give very broad recommendations, which aren't helpful, or very specific recommendations, which are too tuned to the creator's use case.

I will teach you how to _actually_ use Obsidian in a way that works, without:

- Dumping 20 plugins on you
- Explaining the minute differences between five different note types
- Explaining a complex multi-layered folder system
- Giving long walkthroughs on obvious functionality

## What makes Obsidian better than any other app?

- You can link notes together across different topics and areas. This allows for connections to be made across disparate topics.
- Your notes are stored on your own device as readable text. If Obsidian disappeared tomorrow your notes would still be readable and safe. There are also ways to back up your notes to the cloud.
- If you want to start a [[Digital Gardening|Digital Garden]], Obsidian is the best, most well supported way to do so.

This post will assume you can download and install [Obsidian](https://obsidian.md/download), and know basic [markdown syntax](https://www.markdownguide.org/cheat-sheet/). Markdown is fairly simple to understand, and there are good tutorials online.

## Internal Links

Internal links are probably **Obsidian's most important feature**. They are created using `[[this syntax]]`. Pressing `[[` should give you a searchable list of notes to link to.

Whenever a thought about another note enters your mind while writing, you should link to it in the text. This lets you connect ideas across different domains, which is Obsidian's main strength. You should make links to things you _plan_ to write about as well. You can fill in these notes later, and they act as a 'to-write' list.

Internal links also make the graph view look more interesting, if that's what you care about.

![[Attachments/Pasted image 20261125172429.png]]
_Wow. I'm gleaning so many insights rn by seeing my notes as a big mess._

## Avoid folders

Folders should be avoided, and the desire to organise notes into topic folders should be avoided completely. Most notes should be stored in a flat directory. This probably goes against your instincts, which have been moulded by decades of arborescent propaganda. Try to resist these instincts.

We'll use my note on [[Chat interfaces as human disempowerment]] as an example. It ties together ideas in _UX Design_, _AI Safety_, and _Philosophy_. Great! I, the naive new Obsidian user, have folders for all of these topics in my vault!

![[Attachments/Pasted image 20261124141532.png|353]]

Wait... I can only put the note into one of these folders. Maybe I shouldn't be thinking in ways that cut across disciplines :( If only there was a better way.

We have run into the core limitation of folder structures. Folders can be thought of like 'trees.' Each subfolder branches off of one main folder. This mode of classification works for some concepts, but not for most.

![[Attachments/tree.webp]]
_A tree. Computer scientists haven't ever seen a tree so they draw them upside-down._

Philosophers Gilles Deleuze and Félix Guattari proposed an alternative: the [rhizome](https://en.wikipedia.org/wiki/Rhizome_\(philosophy\)). Instead of trees, where one branch has to come off of another, rhizomes grow and knot together into a web of interconnected roots. They don't impose a strict hierarchy like trees.

![[Attachments/rhizome.jpg]]
_A rhizome._

Most notes apps other than Obsidian default to a tree structure, even when a rhizomatic structure fits better.

![[Attachments/Rhizome_vs_tree.jpg]]
_In red, the evil, oppressive, arborescent tree. In green, the free, anarchic, messy rhizome._

The ideal structure for an Obsidian vault is rhizomatic. Ideas should be able to connect easily, and you shouldn't run into friction when doing so.

## Maps and Categories

Maps solve the problems with folders, and allow for rhizomatic structures. They are notes for specific topics which we link to from our other notes. There is nothing inherently special about these notes; they are just markdown files. I keep mine in a separate folder, which is fine since this is a type of note, not a subject.

![[Attachments/Pasted image 20261124144540.png|357]]

I'll add a property called `categories` to my notes, making sure it is set to the 'List' type. Properties can be easily queried, and they sit in the same place in every note.

![[Attachments/Pasted image 20261124144930.png|340]]

Pressing `[[` in the properties field unlocks an important 'secret' feature.

![[Attachments/Pasted image 20261124145055.png]]

A category can be a link to our maps!

![[Attachments/Pasted image 20261124145128.png]]

Even better, if we add a categories property to our other notes it auto-suggests previously used links.

![[Attachments/Pasted image 20261124145238.png]]

Now I'll use `Cmd/Ctrl`+`P` to open the command palette, and search for `Backlinks: Toggle backlinks in document` so I can see all the notes that link to the map.

![[Attachments/Pasted image 20261125182825.png]]

Great, now I can see all of my notes related to philosophy. I don't like the way it looks though.

I'll install and enable the [Dataview](https://community.obsidian.md/plugins/dataview) plugin, and paste this code block into my maps under a `## Notes` heading.

```markdown
| File                                                                          | Created  | Last Modified |
| ----------------------------------------------------------------------------- | -------- | ------------- |
| [[Meta; How to actually use Obsidian.md\|Meta; How to actually use Obsidian]] | 24/11/26 | 24/11/26      |

```

![[Attachments/Pasted image 20261124175254.png]]

Great! Now all my notes are presented nicely in my map.

You may want your notes displayed differently. I would recommend using an LLM to create custom queries that fit your needs, but you could also [learn dataview](https://blacksmithgu.github.io/obsidian-dataview/) and dataviewjs to make your own queries.

At this point we have a minimum viable Obsidian setup that avoids the most common pitfalls. I have a [vault template](https://github.com/anguswww/obsidian-vault-template/releases/latest) you should download that sets everything up along with some improvements, which are detailed in the appendix.

---

## Appendix

### Improvements

#### I don't want to manually add a categories property for each note.

The [Templater](https://community.obsidian.md/plugins/templater-obsidian) plugin allows you to set a template for every new note.

1. Create a folder for your templates, and a default note with a categories property using the process from [[#Maps and Categories]].

   ![[Attachments/Pasted image 20261124170840.png|277]]![[Attachments/Pasted image 20261124170746.png|242]]

   I have a tags property included as well, which isn't required. You can change the template to work for you.

2. Install and enable the [Templater](https://community.obsidian.md/plugins/templater-obsidian) plugin.

3. Set your template folder and turn on the 'Trigger Templater on new file creation' in the plugin settings.

   ![[Attachments/Pasted image 20261124171941.png]]

   ![[Attachments/Pasted image 20261124170029.png]]

4. Under 'Folder templates,' add a rule for the / (root) directory and select your template.

   ![[Attachments/Pasted image 20261124172108.png]]

#### I want an easy way to have a daily journal.

Obsidian has a daily notes plugin built in. I keep my daily notes in a subfolder and the template does the same.

You can create or open today's daily note through the command palette with `Cmd/Ctrl`+`P` -> `Daily notes: Open today's daily note`.

#### I want a cloud backup of my notes that syncs to all my devices.

The template doesn't set this up for you; you will have to do this yourself.

[Obsidian Sync](https://obsidian.md/sync) is simple to set up but costs \$4/month, which funds Obsidian's development. I have never used it but haven't heard anything bad about it.

[Git Sync](https://community.obsidian.md/plugins/git-obsi-sync) is harder to set up, but is free.

##### Git

- [Git Sync Plugin](https://community.obsidian.md/plugins/git-obsi-sync) - Use this on Mac, Linux, or Windows.
- [GitSync App](https://gitsync.viscouspotenti.al/) - Use this on iOS or Android.

To set up the Git Sync plugin and the GitSync phone app, **which are similarly named but separate things**, follow [this tutorial](https://viscouspotenti.al/posts/gitsync-all-devices-tutorial).

### Digital Gardening

To set up a [[Digital Gardening|digital garden]] I would recommend using [Quartz](https://quartz.jzhao.xyz/), with [Quartz Syncer](https://community.obsidian.md/plugins/quartz-syncer) publishing to [GitHub Pages](https://docs.github.com/en/pages). Follow [this guide](https://saberzero1.github.io/quartz-syncer-docs/guides/github-setup) to set everything up. You can look through themes in [this git repo](https://github.com/saberzero1/quartz-themes), or create your own custom theme.

#### Easier options

- [Obsidian Publish](https://obsidian.md/publish) is Obsidian's official paid publishing service with a simple setup process. Subscription costs help support Obsidian's development.
- [Forestry.md](https://forestry.md/) has a free tier that limits you to 30 updates a month. The setup process is fairly simple. It seems less flexible than the other options.

### Q\&A

#### Why not use tags instead of maps?

Tags are less flexible than maps. A map can have its own categories. If you want to set up a home map, link all your maps to it.

Tags also can't display any extra content. For example, my maps also have a task list at the top using the [Tasks](https://community.obsidian.md/plugins/obsidian-tasks-plugin) plugin.

I also think the UI/UX for seeing notes with specific tags is clunky and doesn't look great.

![[Attachments/Pasted image 20261124142607.png|322]]
_The tag search UI, which is too small and messy for me._

If tags work for you then that's great, and I won't try and convince you to switch.

#### Why not use Bases instead of Dataview for maps?

[Bases](https://obsidian.md/help/bases) seem better than I assumed. They have better UI/UX than basic dataview components.

I initially wrote them off, since I assumed you needed a separate .base file, but you can actually embed them in text. I'm keeping everything in this tutorial as dataview for now, but I could easily be converted into a Bases evangelist.

![[Attachments/Pasted image 20261124175101.png]]
