// Local stub: the original toggles a hidden iOS "switch" checkbox for haptics.
const noop = () => {}
const api = { light: noop, error: noop }
export function useIosHaptics() {
  return api
}
