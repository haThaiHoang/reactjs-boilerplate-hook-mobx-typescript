export default class {
  static isFile = (file: File): boolean => !!(file?.name && file?.size && file?.type)

  static getBase64 = (file: File): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  static openDownloadDialog = (
    { url, data, filename }: { url?: string, data?: ArrayBuffer, filename: string }
  ): void => {
    const downloadUrl: any = url || data
    const a = document.createElement('a')

    if (typeof a.download === 'undefined') {
      window.location = downloadUrl
    } else {
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
    }

    document.body.removeChild(a)
  }

  static openUploadDialog = (fileType?: string): Promise<Event> => {
    return new Promise<Event>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = fileType || '*.json'
      input.onchange = (e) => {
        resolve(e)
        document.body.removeChild(input)
      }
      document.body.appendChild(input)
      input.click()
    })
  }
}
