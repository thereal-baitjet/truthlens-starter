export function parseArticle(doc: Document) {
  // Very naive parser; replace with Readability or custom selectors
  const article = doc.querySelector('article') || doc.querySelector('main') || doc.body
  if (!article) return null
  const text = article.innerText || ''
  const title = (doc.querySelector('h1')?.textContent || doc.title || '').trim()
  return { title, text, summary: text.slice(0, 2000) }
}
