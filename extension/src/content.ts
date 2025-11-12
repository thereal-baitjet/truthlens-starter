import { parseArticle } from './lib/parseArticle'
import { mountPanel } from './panel/App'

;(async () => {
  const article = parseArticle(document)
  if (!article) return

  const ui = mountPanel()
  ui.onVerify(async (selection: string | null) => {
    try {
      const body = {
        url: location.href,
        selection,
        language: navigator.language.slice(0,2),
        max_claims: 3
      }
      const res = await fetch('http://localhost:8000/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      const data = await res.json()
      ui.render(data)
    } catch (e) {
      console.warn('TruthLens verify failed', e)
      ui.render({ error: String(e) })
    }
  })
})()
