export default function ({ data, error, duration }) {
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
