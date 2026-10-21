// Local stubs replacing PostHog and the avec.ai backend (no network calls at runtime).
export function track() {}

export async function joinWaitlist() {
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true }
}

export async function recordScore() {
  return { ok: false }
}

// Local stand-in for the leaderboard API: a fixed synthetic distribution.
export async function getScoreStats(score) {
  await new Promise((r) => setTimeout(r, 300))
  const buckets = []
  for (let b = -2; b <= 30; b++) {
    const count = Math.max(0, Math.round(120 * Math.exp(-((b - 12) ** 2) / 60)))
    buckets.push({ bucket: b, count })
  }
  const total = buckets.reduce((a, x) => a + x.count, 0)
  const below = buckets.filter((x) => x.bucket < score).reduce((a, x) => a + x.count, 0)
  return {
    percentile: total ? (below / total) * 100 : 50,
    histogram: buckets,
    isNewRecord: false,
    isTiedRecord: false,
    isNewWorstScore: false,
    isTiedWorstScore: false,
  }
}
