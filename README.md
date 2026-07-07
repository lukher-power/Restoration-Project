# Digital Restoration Archive

A responsive Jekyll exhibit for mapping early revelations of the Doctrine and Covenants with an embedded Tableau Public dashboard.

## What’s in this project

- A project landing page with exhibit-style sections and a Tableau embed placeholder
- A sources and data page for the Joseph Smith Papers, Revelations in Context, and BYU Religious Studies Center research
- An archive stub for future revelation case studies
- Custom styling that shifts the original Clean Blog theme into a museum-like presentation

## Local development

1. Install the Ruby dependencies:
   ```bash
   bundle install
   ```
2. Start the site locally:
   ```bash
   bundle exec jekyll serve
   ```
3. Add your published Tableau Public share link to `tableau_public_url` in `_config.yml` when the dashboard is ready.

## Build notes

This repository is pinned to Jekyll 4.2.2 and ffi 1.16.3 so it can build with the Ruby 2.6 toolchain available in this environment.
