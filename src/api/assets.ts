import { MainApi, ExternalApi } from './endpoint'

type TSignedData = {
  presignUrl: string,
  url: string
}

// Upload files to generated presigned S3 URL
export const uploadFiles = ({ files }: { files: File[] }): Promise<any> => new Promise(async (resolve, reject) => {
  try {
    const signedPayload = Array.from(files)
      .map((file) => {
        const fileNamePaths = file.name.split('.')
        return ({
          filename: fileNamePaths[0],
          filetype: (fileNamePaths[fileNamePaths.length - 1]).toLowerCase()
        })
      })

    const signedResult: { data: TSignedData[] } = await MainApi.post('/presign', { files: signedPayload })

    const promiseArray: Promise<any>[] = []
    signedResult.data.forEach(async (item: TSignedData, index: number) => {
      promiseArray.push(ExternalApi.put(item.presignUrl, files[index]))
    })
    await Promise.all(promiseArray)

    resolve({
      data: signedResult.data.map((item: TSignedData) => item.url)
    })
  } catch (e) {
    reject(e)
  }
})
