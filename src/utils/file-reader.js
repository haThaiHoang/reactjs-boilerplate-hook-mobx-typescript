export default class {
  static isFile = (file) => !!(file?.name && file?.size && file?.type)

  static getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  static openDownloadLink = ({ url, data, filename }) => {
    const downloadUrl = url || data
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
}
