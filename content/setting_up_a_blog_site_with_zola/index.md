+++
title="setting up a blog site with zola"
description="a walkthrough of how I set up this current website"
date=2021-12-01

[taxonomies]
tags = ["zola"]
categories = ["software"]
+++

## What is Zola?

[Zola](https://www.getzola.org/) is a fast and easy static site generator written in [Rust](https://www.rust-lang.org/) that builds pages from HTML templates, SASS, and page content written in markdown. It comes bundled as a single exectuable, making installing and configuring via the CLI a breeze; very ergonomic. It's also pretty pluggable, allowing for themes such as the [zerm](https://www.getzola.org/themes/zerm) theme that this site is currently using. 

## Comparisons with other static site generators

Here's a rip from the Zola docs comparing it to some other similar solutions (which may or may not interest you):

|                                 | Zola   | Cobalt | Hugo   | Pelican |
|:--------------------------------|:------:|:------:|:------:|:-------:|
| Single binary                   | ✔      | ✔      | ✔      | ✘       |
| Language                        | Rust   | Rust   | Go     | Python  |
| Syntax highlighting             | ✔      | ✔      | ✔      | ✔       |
| Sass compilation                | ✔      | ✔      | ✔      | ✔       |
| Assets co-location              | ✔      | ✔      | ✔      | ✔       |
| Multilingual site               | ✘      | ✘      | ✔      | ✔       |
| Image processing                | ✔      | ✘      | ✔      | ✔       |
| Sane template engine            | ✔      | ✔      | ✘      | ✔       |
| Themes                          | ✔      | ✘      | ✔      | ✔       |
| Shortcodes                      | ✔      | ✘      | ✔      | ✔       |
| Internal links                  | ✔      | ✘      | ✔      | ✔       |
| Link checker                    | ✔      | ✘      | ✘      | ✔       |
| Table of contents               | ✔      | ✘      | ✔      | ✔       |
| Automatic header anchors        | ✔      | ✘      | ✔      | ✔       |
| Aliases                         | ✔      | ✘      | ✔      | ✔       |
| Pagination                      | ✔      | ✘      | ✔      | ✔       |
| Custom taxonomies               | ✔      | ✘      | ✔      | ✘       |
| Search                          | ✔      | ✘      | ✘      | ✔       |
| Data files                      | ✔      | ✔      | ✔      | ✘       |
| LiveReload                      | ✔      | ✘      | ✔      | ✔       |
| Netlify support                 | ✔      | ✘      | ✔      | ✘       |
| Vercel support                  | ✔      | ✘      | ✔      | ✔       |
| Cloudflare Pages support        | ✔      | ✘      | ✔      | ✔       |
| Breadcrumbs                     | ✔      | ✘      | ✘      | ✔       |
| Custom output formats           | ✘      | ✘      | ✔      | ✘       |

## How I set up this site with Zola

Aside from simply installing the `zola` tool by following the docs, I just initialized a new zola project and installed a theme from the catalog of themes on the zola site. From there, I took some of my blog posts (which I also tend to write in markdown anyway), and pulled those documents in as content in the project. Viola! Some tweaking in the `config.toml` aside, I tested by serving locally and everything was looking good so it was time to set up an integration and deployment via Github Actions.

I chose Github Actions so that changes made to my repository could all be built and deploy as new versions of the site, all from within Github (making management a breeze on my end). 