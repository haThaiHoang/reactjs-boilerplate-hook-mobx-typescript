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
  headers?: any
}

class Request {
  constructor(options: IOption) {
    this._options = options
  }

  _options: IOption
  _authorization: string | null | undefined

  static create(options: IOption): any {
    return new Request(options)
  }

  static setAccessToken(token: string): void {
    accessToken = token
  }

  static getAccessToken(): string | null {
    return accessToken
  }

  static removeAccessToken(): void {
    accessToken = null
  }

  get(url: string, params: any, headers: any): Promise<any> {
    return this._request({ method: 'GET', url, params, headers })
  }

  post(url: string, data: any, params: any, headers: any): Promise<any> {
    return this._request({ method: 'POST', url, params, data, headers })
  }

  put(url: string, data: any, params: any, headers: any): Promise<any> {
    return this._request({ method: 'PUT', url, params, data, headers })
  }

  delete(url: string, data: any, params: any, headers: any): Promise<any> {
    return this._request({ method: 'DELETE', url, params, data, headers })
  }

  async _request(requestOptions: IRequestOptions): Promise<any> {
    const { method = 'GET', data = null, headers } = requestOptions
    let { url } = requestOptions
    const { params = null } = requestOptions

    url = this._options.endpoint + url

    if (this._options.handleToken && accessToken) {
      this._authorization = `Bearer ${accessToken}`
    } else {
      this._authorization = null
    }

    if (params) {
      url += this._getQueryString(params)
    }

    const options: {
      method: string
      headers: any,
      body?: any
    } = {
      method,
      headers: {}
    }

    if (this._authorization) {
      options.headers.Authorization = this._authorization
    }

    options.headers = lodash.merge(options.headers, headers)

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      if (data) {
        const serializable = lodash.isPlainObject(data) || lodash.isArray(data)

        options.body = serializable ? JSON.stringify(data) : data

        let contentType = null

        if (serializable) {
          contentType = 'application/json'
        }

        if (contentType) {
          options.headers['Content-Type'] = contentType
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
