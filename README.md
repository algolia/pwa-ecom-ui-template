# PWA Ecom Storefront - UI Template

React/Next.js based boilerplate, focused on delivering a rich Search & Discovery e-com experience.  
Focused on performance and customization - based on the [Algolia - Ecom UI Design Kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/).

## Table of content

<details>
  <summary>Expand</summary>

  - [Introduction](#introduction)
  - [Why](#why)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Environment variables](#environment-variables)
    - [Structure](#structure)
  - [Used technologies](#used-technologies)
    - [Front-end bricks](#front-end-bricks)
    - [The best of the Algolia platform](#the-best-of-the-algolia-platform)
  - [InstantSearch widgets](#instantsearch-widgets)
    - [Packaged widgets](#packaged-widgets)
    - [Core widgets](#core-widgets)
  - [Browser support](#browser-support)
  - [Troubleshooting](#troubleshooting)
  - [Contributing & License](#contributing--license)
    - [How to contribute](#how-to-contribute)
    - [License](#license)
</details>

## Introduction

Check out the [latest version](https://algolia-pwa-ui-template-preview.netlify.app/) deployed on Netlify.

### Mobile

[![UI Template mobile demo](https://i.ibb.co/Kjrd162/ezgif-7-bc660a09c6b5.gif)](https://algolia-pwa-ui-template-preview.netlify.app/)

### Desktop

<details>
  <summary>Expand</summary>

  [![UI Template desktop demo](https://i.ibb.co/YkWsYjW/ezgif-6-fbf5988705da.gif)](https://algolia-pwa-ui-template-preview.netlify.app/)
</details>

## Why?

This UI Template is built with 2 main objectives:
- Inspire you on the creation of a engaging Search & Discovery experiences.
- Accelerate your development by providing you an end-to-end implementation with building blocks ready to be cherry picked. So you can re-use 90% or 10% of it - your choice.

We are building this UI Template based on the following guiding principals:
- **Seemless Search & Discovery experience**: Navigate the catalog (and more) via a unified Search & Browse experience that takes place in a single Product Listing Page - allowing the end-users to explore products the same way they'd do in a store.
- **Mobile-first**: Optimized for a cross-device device experience with Mobile at the heart of it. 
- **Designed with "real life" constraints in mind**: We know that no compromize can be made when it comes to Performance, SEO via SRR and Accessibility. As a benchmark we design it to reach > 90% on all Google Vital / Lighthouse criteria (see the report).
- **Easily customizable**: Configure it according to your needs, by creating a custom theme or new pages for example.
- **Modular and extensible by design**: Built leveraging [InstantSearch widgets](#instantSearch-widgets) and Autocomplete.js plugins which can be easily customized and extended.
- **UX Best Practices**: Based on [Algolia Ecom UI Design Kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/).
- **Open source**.

Find more about the key characteristics of this PWA Storefront UI Template in the [Used technologies](#used-technologies) section.

## Getting started

Pick out of those two paths:

- You want to start a **new implementation**, you can fork the project and follow the [**steps below**](#installation).
- You **already have an implementation**, you can start looking at the [**project struture**](#structure) and cherry pick some code.

### Installation

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
1. [Clone the repository](https://help.github.com/articles/cloning-a-repository/)
1. Install the dependencies: `npm install` or `yarn install`
1. Configure the [environment variables](#configuration) below
1. Run the development mode: `npm run dev` or `yarn dev`
1. [Open the project locally](http://localhost:3000)

### Environment variables

Duplicate the [`.env`](./.env) file to `.env.local` and fill in the environment variables as follow:

<details>
  <summary>Expand</summary><br>

  | Name | Value |
  | -- | -- |
  | **NEXT_PUBLIC_INSTANTSEARCH_APP_ID** | InstantSearch Application ID |
  | **NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY** | InstantSearch Search API Key |
  | **NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME** | InstantSearch Index name |
  | **NEXT_PUBLIC_INSTANTSEARCH_QUERY_SUGGESTIONS_INDEX_NAME** | InstantSearch Query Suggestions index name |
</details>

### Structure

- `/components`: Components (UI, Autocomplete, InstantSearch widgets).
- `/config`: Configurations (for example, you can configure displayed refinement or search parameters).
- `/hooks`: Custom common hooks.
- `/layouts`: Application and page layouts.
- `/lib`: Library-related code.
- `/pages`: Pages (for example, home and product listing/detail pages).
- `/public`: Static assets.
- `/styles`: Themes (default one is using Tailwind CSS).
- `/typings`: TypeScript types.
- `/utils`: Various utils.

## Used technologies

### Front-end bricks

- [**Autocomplete.js**](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/)
- [**React InstantSearch**](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- Uses **React hooks/functional components**
- **SEO** optimized
- [**PWA**](https://web.dev/progressive-web-apps/) compliant
- Server-Side Rendering (with [**Next.js**](https://nextjs.org/))
- Theming (uses [**Tailwind CSS**](https://tailwindcss.com/) by default)
- [**Lighthouse**](https://developers.google.com/web/tools/lighthouse) scores >90%
- Built with [**TypeScript**](https://www.typescriptlang.org/)

### The best of the Algolia platform

- ✅ Search (fuzzy search, synonyms, ...) & Browse 
- ✅ AI Re-Ranking
- ✅ AI Personalisation
- ✅ Sending Events / Insights API
- ✅ Advanced Analytics
- ✅ A/B Testing
- ✅ Merchandizing
- ✅ Rules (Banners)
- ✅ Query Suggestions
- ✅ Multiple sorts + Relevant sort
- 🔄 Recommend

## InstantSearch widgets

The UI Template uses **core** and **packaged** **React InstantSearch widgets**.

### Packaged widgets

- ✅ [ColorRefinementList](https://github.com/algolia/react-instantsearch-widget-color-refinement-list)
- ✅ [SizeRefinementList](https://github.com/algolia/react-instantsearch-widget-size-refinement-list)
- ✅ [LoadMoreWithProgressBar](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar)
- 🔄 [ExpandablePanel](./components/%40instantsearch/widgets/expandable-panel/expandable-panel.tsx)
- 🔄 [RefinementsDropdown](./components/%40instantsearch/widgets/refinements-dropdown/refinements-dropdown.tsx)
- 🔄 [RatingSelector](./components/%40instantsearch/widgets/rating-selector/rating-selector.tsx)
- 🔄 [NoResultsHandler](./components/%40instantsearch/widgets/no-results-handler/no-results-handler.tsx)
- 🔄 [BreadcrumbWithQuery](./components/%40instantsearch/widgets/breadcrumb/breadcrumb.tsx)

✅ Published / 🔄 To be published

### Core widgets

List of Core widgets customized using connectors.

<details>
  <summary>Expand</summary>
  
  #### Basics
  - InstantSearch
  - Index
  - Configure
  - SearchBox (virtual)

  #### Results
  - Hits/InfiniteHits
  - Highlight/Snippet

  #### Refinements
  - RefinementList
  - DynamicWidgets
  - HierarchicalMenu
  - CurrentRefinements
  - RangeInput
  - RatingMenu
  - ClearRefinements

  #### Metadata
  - Breadcrumb
  - Stats
  - StateResults

  #### Sorting
  - SortBy
  - RelevantSort
</details>

## Browser support

The UI Template supports the **last two versions of major browsers:** Chrome, Edge, Firefox, Safari.

## Troubleshooting

Encountering an issue? Before reaching out to support, we recommend heading to our [FAQ](https://www.algolia.com/doc/guides/building-search-ui/troubleshooting/faq/react/) where you will find answers for the most common issues and gotchas with the library.

## Contributing & License

### How to contribute

We welcome all contributors, from casual to regular 💙

- **Bug report**. Is something not working as expected? [Send a bug report](https://github.com/algolia/pwa-storefront-ui-template/issues/new?template=Bug_report.md).
- **Feature request**. Would you like to add something to the library? [Send a feature request](https://github.com/algolia/pwa-storefront-ui-template/issues/new?template=Feature_request.md).
- **Documentation**. Did you find a typo in the doc? [Open an issue](https://github.com/algolia/pwa-storefront-ui-template/issues/new) and we'll take care of it.
- **Development**. If you don't know where to start, you can check the open issues that are [tagged easy](https://github.com/algolia/pwa-storefront-ui-template/issues?q=is%3Aopen+is%3Aissue+label%3A%22Difficulty%3A++++++%E2%9D%84%EF%B8%8F+easy%22), the [bugs](https://github.com/algolia/pwa-storefront-ui-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9D%A4+Bug%22) or [chores](https://github.com/algolia/pwa-storefront-ui-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9C%A8+Chore%22).

To start contributing to code, you need to:

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
1. [Clone the repository](https://help.github.com/articles/cloning-a-repository/)
1. Install the dependencies: `npm install` or `yarn install`
1. Run the development mode: `npm run dev` or `yarn dev`
1. [Open the project](http://localhost:3000)

Please read [our contribution process](CONTRIBUTING.md) to learn more.

### License

Licensed under the [MIT license](LICENSE).
