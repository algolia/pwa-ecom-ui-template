# PWA Ecom UI Template

This is a React 18/Next.js based template for an ecommerce application, focused on delivering a rich search and discovery experience.
The design is based on the [Algolia ecommerce UI design kit](https://www.algolia.com/doc/guides/solutions/ecommerce/ui-kits/) and the implementation focuses on performance and customization.

[View Preview](https://algolia-pwa-ecom-ui-template.netlify.app/)

<details>
  <summary>Table of content</summary>

  - [Introduction](#introduction)
  - [Why](#why)
  - [Getting started](#getting-started)
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

The PWA Ecom UI Template is fully responsive.
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

You can find the [Getting started](https://www.algolia.com/doc/guides/building-search-ui/ecommerce-ui-template/getting-started) page in the docs.

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

These ready-to-use _custom_ widgets are distributed as separate NPM packages (only those with with the 📦 icon for now) or present in this repository.

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
