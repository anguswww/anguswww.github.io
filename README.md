# Angus's personal website

A minimal Jekyll site with an About landing page, Notes, and a project list. The stylesheet is just 10 lines. No JavaScript or external fonts are required.

## Run locally

Use Ruby 3.3 or newer with Bundler:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000. Build without the local server using `bundle exec jekyll build`.

## Make it yours

- Edit your name, introduction, bio, About paragraph, and GitHub link in `_data/profile.yml`. The personal copy is placeholder text.
- Set your production URL and site description in `_config.yml`. For a project site hosted at `/repository-name`, set `baseurl: /repository-name`.
- Add notes in `_posts/YYYY-MM-DD-title.md`. Give each note a `title` and `description` in its YAML front matter.
- Add projects in `_projects/name.md`. Use `title`, `description`, `category`, `status`, and `order`. An optional `project_url` adds an outbound link on the detail page.
- The two included notes and **Field notes** project are labelled examples. Replace or delete them; remove `sample: true` when adding your own content.
- The 10 rules in `assets/css/style.css` control reading width, typography, links, and basic spacing.

Both collections also have empty states. RSS is available at `/feed.xml`.

## Publish on GitHub Pages

This repository is named `anguswww.github.io`, so its production URL is `https://anguswww.github.io`.

The included workflow builds Jekyll and deploys on pushes to `main`, or manually from GitHub Actions. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Then push the site to `main`.

See [GitHub's Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
