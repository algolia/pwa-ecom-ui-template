export function parseUrl(url: string = '') {
  return new URL(url, 'http://base.com')
}
