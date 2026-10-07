/**
 * Formatting helpers for Gantry UI.
 * All functions accept ISO datetime strings and return human-readable output.
 * Invalid or empty input returns an empty string without throwing.
 */

function parse(iso: string): Date | null {
  if (!iso) return null
  const d = new Date(iso)
  return isNaN(d.getTime()) ? null : d
}

/** Returns "HH:MM" (24-hour) from an ISO string. */
export function formatTime(iso: string): string {
  const d = parse(iso)
  if (!d) return ''
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

/** Returns "YYYY-MM-DD" from an ISO string. */
export function formatDate(iso: string): string {
  const d = parse(iso)
  if (!d) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/** Returns "YYYY-MM-DD HH:MM" from an ISO string. */
export function formatDateTime(iso: string): string {
  const date = formatDate(iso)
  const time = formatTime(iso)
  if (!date || !time) return ''
  return `${date} ${time}`
}
