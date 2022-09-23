import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { QueryRuleCustomDataProvided } from 'react-instantsearch-core'
import { connectQueryRules } from 'react-instantsearch-dom'

function QueryRuleRedirectComponent({ items }: QueryRuleCustomDataProvided) {
  const match = items.find((data: any) => Boolean(data.redirectUrl))
  if (match) window.location.href = match.redirectUrl
  return null
}

/**
  Triggers when a rule returns custom data with a `redirectUrl` property.
 */
export const QueryRuleRedirect = connectQueryRules(
  memo(QueryRuleRedirectComponent, isEqual)
)
