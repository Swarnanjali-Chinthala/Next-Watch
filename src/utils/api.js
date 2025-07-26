export async function fetchAPI(url, options) {
  try {
    const res = await fetch(url, options)
    if (res.ok) {
      const data = await res.json()
      return { success: true, data }
    }
    return { success: false, data: await res.json() }
  } catch {
    return { success: false, data: null }
  }
}
