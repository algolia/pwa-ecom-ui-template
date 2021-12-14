# PWA Ecom UI Template

Current status: **Public Beta**

This is a React/Next.js based template for an ecommerce application, focused on delivering a rich search and discovery experience.
The design is based on the [Algolia ecommerce UI design kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/) and the implementation focuses on performance and customization.

[View Preview](https://algolia-pwa-ecom-ui-template.netlify.app/)

<details>
  <summary>Table of content</summary>

  - [Introduction](#introduction)
  - [Why](#why)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Import datasets and configurations](#import-datasets-and-configurations)
    - [Environment variables](#environment-variables)
    - [Structure](#structure)
    - [Record sample](#record-sample)
  - [Used technologies](#used-technologies)
    - [Front-end](#front-end)
    - [The best of the Algolia platform](#the-best-of-the-algolia-platform)
  - [InstantSearch widgets](#instantsearch-widgets)
    - [Custom widgets](#custom-widgets)
    - [Core widgets](#core-widgets)
  - [Browser support](#browser-support)
  - [Troubleshooting](#troubleshooting)
  - [How to contribute](#how-to-contribute)
  - [License](#license)
</details>

## Introduction

The UI template is fully responsive.
Check out the [latest version](https://algolia-pwa-ecom-ui-template.netlify.app/) deployed on Netlify.

### Mobile

[![UI Template mobile preview](https://i.ibb.co/THpSJcB/pwa-ecom-ui-template-mobile-preview.gif)](https://algolia-pwa-ecom-ui-template.netlify.app/)

### Desktop

<details>
  <summary>Expand</summary>

  [![UI Template desktop preview](https://i.ibb.co/v45SfGQ/pwa-ecom-ui-template-desktop-preview.gif)](https://algolia-pwa-ecom-ui-template.netlify.app/)
</details>

## Why?

This UI template has two main objectives:

- **Inspire you** to create engaging search and discovery experiences.
- **Accelerate your development** by providing you with an end-to-end implementation with all building blocks you need. You can re-use 90% or 10% of it and customize the rest - it's your choice.

Wer'e building this UI template with the following guiding principles in mind:

- **Seamless searching and browsing:** navigate the catalog (and more) via a single product listing page for a unified search and browse experience.
- **Mobile-first:**: optimized for a cross-device device experience with mobile at the heart of it. 
- **Designed with "real-life" constraints in mind:** don't compromise on performance, SEO, or accessibility. As a start, this template reaches more than 90% on all Lighthouse scores.
- **Easily customizable:** configure the UI template according to your needs. Create a custom theme, or add new pages to your site.
- **Modular and extensible by design:** builds on top of [InstantSearch widgets](#instantsearch-widgets) and [Autocomplete.js plugins](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/), which can be customized and extended.
- **UX best practices:** based on the [Algolia ecommerce UI design kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/)
- **Open source:** MIT License

Find more about the key characteristics of this PWA Ecom UI Template in the [Used technologies](#used-technologies) section.

## Getting started

You can use the PWA Ecom UI Template in two different ways:

- If you want to start a **new implementation**, see [Installation](#installation).
- If you **already have an implementation** and want to integrate parts of this UI template, start looking at the [project struture](#structure).

### Installation

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
1. [Clone the repository](https://help.github.com/articles/cloning-a-repository/)
1. Install the dependencies: `npm install` or `yarn install`
1. Configure the [environment variables](#environment-variables)
1. Start the development server: `npm run dev` or `yarn dev`
1. [Open the project in your browser](http://localhost:3000)

### Import datasets and configurations

By default, the PWA Ecom UI Template uses environment variables pointing to the `latency` Algolia application. It lets you run locally right away the template but not customize the records or the indices configurations (settings, rules or synonyms for example).

If you want to import the preview datasets along with their configurations or directly your own datasets to your own Algolia application, you can do so using the [CLI tool](./cli) as explained below.

#### Using the preview datasets and configurations

1. Make sure the dependencies are installed: `npm install` or `yarn install`
1. Run the CLI: `npm run cli`
1. Follow the CLI steps using the `Import` action, now, you should have 4 indices in your Algolia application
1. Configure the environment variables in the `.env.local` file as described below using your __Algolia app ID__, __search API key__ and the __products index and query suggestions names__ you used in the CLI
1. Start the development server: `npm run dev` or `yarn dev`

__Note:__ You can fill in the `CLI_APP_ID` and `CLI_ADMIN_API_KEY` environment variables described below in the `.env.local` file so that the CLI tool uses these defaults when requested.

#### Using your own datasets and configurations

The preview datasets and configurations are located in the folder `cli/data` as JSON files:

- `products_configuration.json`
- `products_dataset.json`
- `products_query_suggestions_configuration.json`
- `products_query_suggestions_dataset.json`

You can replace these files with your own and use the CLI tool again to import your own data instead of the preview ones.

### Environment variables

Rename the [`.env.sample`](./.env.sample) file to `.env.local`.
The following environment variables are already filled with data from the [preview](https://algolia-pwa-ecom-ui-template.netlify.app/):

<details>
  <summary>Expand</summary>

  | Name | Value |
  | -- | -- |
  | **NEXT_PUBLIC_INSTANTSEARCH_APP_ID** | Your Algolia Application ID |
  | **NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY** | Your Algolia Search API Key |
  | **NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME** | Your Algolia index name |
  | **NEXT_PUBLIC_INSTANTSEARCH_QUERY_SUGGESTIONS_INDEX_NAME** | Your Algolia Query Suggestions index name |
  | **CLI_APP_ID** | Your Algolia Application ID used by the CLI to import/delete datasets and configurations |
  | **CLI_ADMIN_API_KEY** | Your Algolia Admin API key used by the CLI to import/delete datasets and configurations |
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
- `/cli`: Command line interface tool to import/delete datasets and configurations to your Algolia application.
- `/typings`: TypeScript types.
- `/utils`: Various utility functions.

### Record sample

Below is a sample record for a product in the dataset:

<details>
  <summary>Expand</summary><br>

  ```json
  {
    "objectID": "A0E200000002GZB",
    "name": "Michael Kors – shopper “Jet Set Travel”",
    "description": "The sleek leather shopper from Michael Kors is the perfect Everyday- Bag, which offers enough space for the most important essentials in the office, while traveling or shopping. The longer handles allow you to carry the bag comfortably on the shoulder while the black leather and silver tag provide subtle elegance. A real investment piece that will accompany you from season to season.",
    "brand": "Michael Kors",
    "gender": "women",
    "hierarchical_categories": {
      "lvl0": "Women",
      "lvl1": "Women > Bags",
      "lvl2": "Women > Bags > Shopper"
    },
    "image_urls": [
      "https://res.cloudinary.com/hilnmyskv/image/upload/v1638375538/flagship_sunrise/A0E200000002GZB_0.jpg"
    ],
    "reviews": {
      "rating": 4,
      "count": 42,
      "bayesian_avg": 3.906976744186046
    },
    "color": {
      "filter_group": "black;#333",
      "original_name": "black"
    },
    "available_sizes": [
      "one size"
    ],
    "price": {
      "currency": "EUR",
      "value": 343.75,
      "discounted_value": 0,
      "discount_level": -100,
      "on_sales": false
    }
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

### Custom widgets

These ready-to-use _custom_ widgets are distributed as separate NPM packages (only those with with the 📦 icon for now).

- 📦 [ColorRefinementList](https://github.com/algolia/react-instantsearch-widget-color-refinement-list)
- 📦 [SizeRefinementList](https://github.com/algolia/react-instantsearch-widget-size-refinement-list)
- 📦 [LoadMoreWithProgressBar](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar)
- [ExpandablePanel](./components/%40instantsearch/widgets/expandable-panel/expandable-panel.tsx)
- [RefinementsDropdown](./components/%40instantsearch/widgets/refinements-dropdown/refinements-dropdown.tsx)
- [RatingSelector](./components/%40instantsearch/widgets/rating-selector/rating-selector.tsx)
- [NoResultsHandler](./components/%40instantsearch/widgets/no-results-handler/no-results-handler.tsx)
- [BreadcrumbWithQuery](./components/%40instantsearch/widgets/breadcrumb/breadcrumb.tsx)

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

- **Bug report**. Is something not working as expected? [Send a bug report](https://github.com/algolia/pwa-ecom-ui-template/issues/new?template=Bug_report.md).
- **Feature request**. Would you like to add something to the library? [Send a feature request](https://github.com/algolia/pwa-ecom-ui-template/issues/new?template=Feature_request.md).
- **Documentation**. Did you find a typo in the doc? [Open an issue](https://github.com/algolia/pwa-ecom-ui-template/issues/new).
- **Development**. If you don't know where to start, you can check the open issues that are [tagged easy](https://github.com/algolia/pwa-ecom-ui-template/issues?q=is%3Aopen+is%3Aissue+label%3A%22Difficulty%3A++++++%E2%9D%84%EF%B8%8F+easy%22), the [bugs](https://github.com/algolia/pwa-ecom-ui-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9D%A4+Bug%22) or [chores](https://github.com/algolia/pwa-ecom-ui-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9C%A8+Chore%22).

See [Installation](#installation) for instructions how to install the project.

## License

The UI template is licensed under the [MIT license](LICENSE).
