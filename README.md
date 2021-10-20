# PWA Ecom Storefront - UI Template

Current status: **Public Beta**

This is a React/Next.js based template for an ecommerce application, focused on delivering a rich search and discovery experience.
The design is based on the [Algolia ecommerce UI design kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/) and the implementation focuses on performance and customization. 

<p align="center">
  <a href="https://algolia-pwa-ui-template-preview.netlify.app/">View Demo</a>
</p>

<details>
  <summary>Table of content</summary>

  - [Introduction](#introduction)
  - [Why](#why)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Environment variables](#environment-variables)
    - [Structure](#structure)
    - [Record sample](#record-sample)
  - [Used technologies](#used-technologies)
    - [Front-end bricks](#front-end-bricks)
    - [The best of the Algolia platform](#the-best-of-the-algolia-platform)
  - [InstantSearch widgets](#instantsearch-widgets)
    - [Packaged widgets](#packaged-widgets)
    - [Core widgets](#core-widgets)
  - [Browser support](#browser-support)
  - [Troubleshooting](#troubleshooting)
  - [How to contribute](#how-to-contribute)
  - [License](#license)
</details>

## Introduction

The UI template is fully responsive.
Check out the [latest version](https://algolia-pwa-ui-template-preview.netlify.app/) deployed on Netlify.

## Why?

This UI template has two main objectives:

- **Inspire you** to create engaging search and discovery experiences.
- **Accelerate your development** by providing you with an end-to-end implementation with all building blocks you need. You can re-use 90% or 10% of it and customize the rest - it's your choice.

Wer'e building this UI template with the following guiding principles in mind:

- **Seamless searching and browsing:** navigate the catalog (and more) via a single product listing page for a unified search and browse experience.
- **Mobile-first:**: optimized for a cross-device device experience with mobile at the heart of it. 
- **Designed with "real-life" constraints in mind:** don't compromise on performance, SEO, or accessibility. As a start, this template reaches more than 90% on all Lighthouse scores.
- **Easily customizable:**: configure the UI template according to your needs. Create a custom theme, or add new pages to your site.
- **Modular and extensible by design:** builds on top of [InstantSearch widgets](#instantSearch-widgets) and [Autocomplete.js plugins](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/), which can be customized and extended.
- **UX best practices:** based on the [Algolia ecommerce UI design kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/)
- **Open source:** MIT License

Find more about the key characteristics of this PWA Storefront UI Template in the [Used technologies](#used-technologies) section.

## Getting started

You can use the UI template in two different ways:

- If you want to start a **new implementation**, see [Installation](#installation).
- If you **already have an implementation** and want to integrate parts of this UI template, start looking at the [project struture](#structure).

### Installation

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
1. [Clone the repository](https://help.github.com/articles/cloning-a-repository/)
1. Install the dependencies: `npm install` or `yarn install`
1. Configure the [environment variables](#configuration)
1. Start the development server: `npm run dev` or `yarn dev`
1. [Open the project in your browser](http://localhost:3000)

### Environment variables

Rename the [`.env.sample`](./.env.sample) file to `.env.local`.
The following environment variables are already filled with data from the [demo](https://algolia-pwa-ui-template-preview.netlify.app/):

<details>
  <summary>Expand</summary>

  | Name | Value |
  | -- | -- |
  | **NEXT_PUBLIC_INSTANTSEARCH_APP_ID** | Algolia Application ID |
  | **NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY** | Algolia Search API Key |
  | **NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME** | Algolia index name |
  | **NEXT_PUBLIC_INSTANTSEARCH_QUERY_SUGGESTIONS_INDEX_NAME** | Algolia Query Suggestions index name |
</details>

### Structure

- `/components`: Components (UI, Autocomplete, InstantSearch widgets).
- `/config`: Configuration files (for example, you can configure displayed refinement or search parameters).
- `/hooks`: Custom common hooks.
- `/layouts`: Application and page layouts.
- `/lib`: Library-related code.
- `/pages`: Pages (for example, home and product listing/detail pages).
- `/public`: Static assets.
- `/styles`: Themes (the default theme is using Tailwind CSS).
- `/typings`: TypeScript types.
- `/utils`: Various utility functions.

### Record sample

Below is a sample record for a product in the index:

<details>
  <summary>Expand</summary><br>

  ```json
  {
    "name": "Cirst Slim T-Shirt",
    "price": 35,
    "url": "women/t-shirts/d04445-2757-6370",
    "hierarchical_categories": {
      "lvl0": "women",
      "lvl1": "women > tops and jackets",
      "lvl2": "women > tops and jackets > t-shirts"
    },
    "priceFilter": "$0 - $50",
    "sizeFilter": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "availabilityDetail": "Product is available",
    "fullStock": true,
    "description": "With an open neckline and slim silhouette, this soft t-shirt is the perfect option for easy, daily style. A bold graphic brings the chest to life. And thanks to soft, lightweight jersey, it feels great against the skin. Throw it on for day and night.",
    "sizeFilter": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "hexColorCode": "Dark blue//#00008B",
    "reviewScore": 4,
    "reviewCount": 32
  }
  ```
</details>

## Used technologies

### Front-end

- [**Autocomplete.js**](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/)
- [**React InstantSearch**](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- Uses **React hooks/functional components**
- **SEO** optimized
- [**PWA**](https://web.dev/progressive-web-apps/) compliant
- Server-Side Rendering with [**Next.js**](https://nextjs.org/)
- Theming with [**Tailwind CSS**](https://tailwindcss.com/)
- [**Lighthouse**](https://developers.google.com/web/tools/lighthouse) scores >90%
- Built with [**TypeScript**](https://www.typescriptlang.org/)

### The best of the Algolia platform

- ✅ Search (fuzzy search, synonyms, ...) and Browse 
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

These ready-to-use _packaged_ widgets are distributed as separate NPM packages.

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

These _core_ widgets are part of InstantSearch and are [customized](https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/react/) using connectors:

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

The UI template supports the **last two versions of the major browsers:** Chrome, Edge, Firefox, Safari.

## Troubleshooting

Encountering an issue? Read the [FAQ](https://www.algolia.com/doc/guides/building-search-ui/troubleshooting/faq/react/) where you will find help for the most common issues and gotchas.

## How to contribute

We welcome all contributors, from casual to regular 💙. See [CONTRIBUTING](CONTRIBUTING.md) for more information about the contribution process. 

- **Bug report**. Is something not working as expected? [Send a bug report](https://github.com/algolia/pwa-storefront-ui-template/issues/new?template=Bug_report.md).
- **Feature request**. Would you like to add something to the library? [Send a feature request](https://github.com/algolia/pwa-storefront-ui-template/issues/new?template=Feature_request.md).
- **Documentation**. Did you find a typo in the doc? [Open an issue](https://github.com/algolia/pwa-storefront-ui-template/issues/new).
- **Development**. If you don't know where to start, you can check the open issues that are [tagged easy](https://github.com/algolia/pwa-storefront-ui-template/issues?q=is%3Aopen+is%3Aissue+label%3A%22Difficulty%3A++++++%E2%9D%84%EF%B8%8F+easy%22), the [bugs](https://github.com/algolia/pwa-storefront-ui-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9D%A4+Bug%22) or [chores](https://github.com/algolia/pwa-storefront-ui-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9C%A8+Chore%22).

See [Installation](#installation) for instructions how to install the project.

## License

The UI template is licensed under the [MIT license](LICENSE).
