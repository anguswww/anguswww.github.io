# Angus's personal website

A minimal Jekyll site with an About landing page, Notes, and a project list. A small stylesheet handles layout and colours; a small script remembers your theme preference. No external fonts or JavaScript libraries are required.

## Run locally

Use Ruby 3.3 or newer with Bundler:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000. Build without the local server using `bundle exec jekyll build`.

## Make it yours

- Edit your name and GitHub link in `_data/profile.yml`, and your introduction in `index.html`.
- Set your production URL and site description in `_config.yml`. For a project site hosted at `/repository-name`, set `baseurl: /repository-name`.
- Add notes in `_posts/YYYY-MM-DD-title.md`. Give each note a `title` and `description` in its YAML front matter.
- Add projects in `_projects/name.md`. Use `title`, `description`, `category`, `status`, and `order`. Set `image` to a local image path and `image_alt` to its description for the project card; a placeholder is used when no image is supplied. An optional `project_url` adds an outbound link on the detail page.
- The rules in `assets/css/style.css` control reading width, typography, links, and basic spacing.
- The profile image sits beside the name on the About page. Update the image path and alt text in `index.html` to replace it.
- Click the theme button to cycle through System → Light → Dark. Its icon shows the current mode and its tooltip names the next one. The dark background is midnight blue (`#121a26`); your theme preference persists across pages and reloads.

Empty collections display “Coming soon…” automatically; adding Markdown content replaces that message with the existing lists and cards. RSS is available at `/feed.xml`.

The shared footer uses `assets/rss-icon.png` at its original 10 × 10 pixel size.

## Publish on GitHub Pages

This repository is named `anguswww.github.io`, so its production URL is `https://anguswww.github.io`.

The included workflow builds Jekyll and deploys on pushes to `main`, or manually from GitHub Actions. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Then push the site to `main`.

See [GitHub's Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Add content

Create `_posts/YYYY-MM-DD-title.md` for a note:

```markdown
---
title: Your note title
description: A short summary.
---
Write your note here.
```

Create `_projects/project-name.md` for a project:

```markdown
---
title: Your project title
description: A short summary.
order: 2
---
Write about your project here.
```

Optional project fields include `image`, `image_alt`, `project_url`, and `link_label`.
New entries automatically appear on their collection page and the homepage; notes also appear in RSS.
