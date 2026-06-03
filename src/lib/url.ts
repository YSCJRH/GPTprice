const allowedExternalProtocols = new Set(['https:'])

export function safeExternalUrl(value: string | null): string | null {
  if (!value) return null

  try {
    const url = new URL(value)
    if (!allowedExternalProtocols.has(url.protocol)) return null
    return url.href
  } catch {
    return null
  }
}
