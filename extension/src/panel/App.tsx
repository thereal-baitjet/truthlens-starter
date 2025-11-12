// Simple injected panel with a Verify button and results area
export function mountPanel() {
  const root = document.createElement('div')
  root.className = 'tl-panel'
  document.documentElement.appendChild(root)
  root.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <strong>TruthLens</strong>
      <button class="tl-btn" id="tl-verify">Verify (Alt+V)</button>
    </div>
    <div id="tl-results" style="margin-top:8px;"></div>
  `

  const listeners = { verify: (selection: string | null) => {} as any }

  function onVerify(fn: (selection: string | null) => void) {
    listeners.verify = fn
  }

  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'v') {
      const sel = getSelection()?.toString() || null
      listeners.verify(sel)
    }
  })
  root.querySelector('#tl-verify')?.addEventListener('click', () => {
    const sel = getSelection()?.toString() || null
    listeners.verify(sel)
  })

  function render(data: any) {
    const el = root.querySelector('#tl-results') as HTMLElement
    if (!el) return
    if (data?.error) {
      el.innerHTML = `<div style="color:#b91c1c">Error: ${data.error}</div>`
      return
    }
    const claims = data?.claims || []
    const spin = data?.spin_flags || []
    el.innerHTML = [
      ...claims.map((c: any) => {
        const chips = (c.evidence || []).slice(0,4).map((e: any) =>
          `<a class="tl-chip" href="${e.url}" target="_blank" rel="noopener">${e.stance||'source'}</a>`
        ).join('')
        const conf = c.confidence ? `<span class="tl-chip">${c.confidence}</span>` : ''
        const notes = c.notes ? `<div style="font-size:12px;color:#4b5563">${c.notes}</div>` : ''
        return `<div class="tl-claim"><div><strong>${c.text||''}</strong> ${conf}</div><div>${chips}</div>${notes}</div>`
      }),
      spin.length ? `<div><strong>Spin flags</strong><ul>` + spin.map((s: any) =>
        `<li><em>${s.type}</em>: “${s.quote}” — ${s.why}</li>`
      ).join('') + `</ul></div>` : ''
    ].join('\n')
  }

  return { onVerify, render }
}
