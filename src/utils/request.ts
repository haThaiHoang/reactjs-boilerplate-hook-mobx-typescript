import lodash from 'lodash'

let accessToken: string | null = null

interface IOption {
  endpoint: string
  handleToken?: boolean
  handleBlob?: boolean
}
interface IRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  params?: any
  data?: any
}

class Request {
  constructor(options: IOption) {
    this._options = options
  }

  _options: IOption

  static create(options: IOption): any {
    return new Request(options)
  }

  static setAccessToken(token: string): void {
    accessToken = token
  }

  static getAccessToken(): string | null {
    return accessToken
  }

  static hasAccessToken(): boolean {
    return !!accessToken
  }

  static removeAccessToken(): void {
    accessToken = null
  }

  get(url: string, params: any): Promise<any> {
    return this._request({ method: 'GET', url, params })
  }

  post(url: string, data: any, params: any): Promise<any> {
    return this._request({ method: 'POST', url, params, data })
  }

  put(url: string, data: any, params: any): Promise<any> {
    return this._request({ method: 'PUT', url, params, data })
  }

  delete(url: string, data: any, params: any): Promise<any> {
    return this._request({ method: 'DELETE', url, params, data })
  }

  async _request(requestOptions: IRequestOptions): Promise<any> {
    const { method = 'GET', data = null } = requestOptions
    let { url } = requestOptions
    const { params = null } = requestOptions

    url = this._options.endpoint + url

    if (params) {
      url += this._getQueryString(params)
    }

    const options: any = {
      method,
      headers: {}
    }

    if (this._options.handleToken && accessToken) {
      options.headers.Authorization = `Bearer ${accessToken}`
    }

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      if (data) {
        const serializable = lodash.isPlainObject(data) || lodash.isArray(data)

        if (serializable) {
          options.body = JSON.stringify(data)
          options.headers['Content-Type'] = 'application/json'
        } else {
          options.body = data
        }
      }
    }

    const res = await fetch(url, options)

    if (!res.ok) {
      throw res
    }

    try {
      if (this._options.handleBlob) {
        const blob = await res.blob()

        return { data: blob }
      }

      const text = await res.text()
      const responseData = text !== '' ? JSON.parse(text) : ''

      return responseData
    } catch (error) {
      /* eslint-disable no-console */
      console.error('[request] parse JSON response error:', method, url, data, params, error)
      throw error
    }
  }

  _getQueryString(params: any): string {
    const parts: string[] = []

    lodash.forEach(params, (value, key) => {
      const values = lodash.isArray(value) ? value : [value]
      const operator = lodash.isArray(value) ? '[]=' : '='

      lodash.forEach(values, (v) => {
        parts.push(key + operator + encodeURIComponent(v))
      })
    })

    const queryString = parts.join('&')

    return queryString ? `?${queryString}` : ''
  }
}

export default Request
