export const REMEASURE_SCROLL_STOPS = 'billboard:remeasure-scroll-stops'

function offsetWithin(el, root) {
  let top = 0
  let node = el
  while (node && node !== root) {
    top += node.offsetTop
    node = node.offsetParent
  }
  return top
}

function stopAnchor(el) {
  const v = getComputedStyle(el).getPropertyValue('--stop-anchor').trim()
  if (!v) return 0
  if (/^-?[\d.]+px$/.test(v)) return Number.parseFloat(v)
  const probe = document.createElement('div')
  probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:0;height:${v}`
  el.appendChild(probe)
  const h = probe.getBoundingClientRect().height
  probe.remove()
  return Number.isFinite(h) ? h : 0
}

export function getScrollStops(root) {
  const max = Math.max(0, root.scrollHeight - root.clientHeight)
  return Array.from(root.querySelectorAll('[data-section-name]')).map((el) => {
    const top = offsetWithin(el, root) - stopAnchor(el)
    return {
      element: el,
      name: el.dataset.sectionName ?? '',
      group: el.dataset.sectionGroup,
      top: Math.max(0, Math.min(max, Math.ceil(top))),
    }
  })
}

export function nearestStopIndex(stops, scrollTop) {
  let idx = 0
  let best = Infinity
  stops.forEach((s, i) => {
    const d = Math.abs(s.top - scrollTop)
    if (d < best) {
      best = d
      idx = i
    }
  })
  return idx
}

export function stopProgress(stops, scrollTop) {
  if (stops.length === 0) return { index: 0, fraction: 0 }
  let idx = 0
  for (let i = 0; i < stops.length; i++) {
    if (stops[i] && stops[i].top <= scrollTop + 1) idx = i
    else break
  }
  const cur = stops[idx]
  const next = stops[idx + 1]
  if (cur && next && !(next.top <= cur.top)) {
    return { index: idx, fraction: Math.max(0, Math.min(1, (scrollTop - cur.top) / (next.top - cur.top))) }
  }
  return { index: idx, fraction: 0 }
}
