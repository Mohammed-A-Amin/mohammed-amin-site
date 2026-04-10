export function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      const parts = u.pathname.split('/')
      const last = parts[parts.length - 1]
      if (last) return `https://www.youtube.com/embed/${last}`
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '')
      return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.replace('/', '')
      return `https://player.vimeo.com/video/${id}`
    }
    return url
  } catch {
    return url
  }
}
