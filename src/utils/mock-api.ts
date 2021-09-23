export default function ({ data, error, duration } : { data?: any, error?: any, duration?: number }): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    }, duration || 300)
  })
}
