// Environment
export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

// InstantSearch
export const appId = process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID!
export const searchApiKey =
  process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY!
export const indexName = process.env.NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME!
export const querySuggestionsIndexName =
  process.env.NEXT_PUBLIC_INSTANTSEARCH_QUERY_SUGGESTIONS_INDEX_NAME!
