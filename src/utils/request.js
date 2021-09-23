import lodash from 'lodash'

let accessToken = null

class Request {
  static create(options) {
    return new Request(options)
  }

  static setAccessToken(token) {
    accessToken = token
  }

  static getAccessToken() {
    return accessToken
  }

  static removeAccessToken() {
    accessToken = null
  }

  constructor(options) {
    this._options = options
  }

  get(url, params, headers) {
    return this._request({ method: 'GET', url, params, headers })
  }

  post(url, data, params, headers) {
    return this._request({ method: 'POST', url, params, data, headers })
  }

  put(url, data, params, headers) {
    return this._request({ method: 'PUT', url, params, data, headers })
  }

  delete(url, data, params, headers) {
    return this._request({ method: 'DELETE', url, params, data, headers })
  }

  async _request(requestOptions) {
    const { method = 'GET', data = null, headers } = requestOptions
    let { url, params = null } = requestOptions

    url = this._options.endpoint + url

    if (this._options.handleToken && accessToken) {
      this._authorization = `Bearer ${accessToken}`
    } else {
      this._authorization = null
    }

    if (params) {
      url += this._getQueryString(params)
    }

    const options = {
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

  _getQueryString(params) {
    const parts = []

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
