export async function fetchBase64(url: string): Promise<string> {
  const res = await fetch(url)
  const blob = await res.blob()

  return await new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      const clean = result.replace(/^data:image\/[a-zA-Z]+;base64,/, "")
      resolve(clean)
    }
    reader.readAsDataURL(blob)
  })
}