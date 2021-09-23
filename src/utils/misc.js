import lodash from 'lodash'

import Configs from '@/configs'

function isFetchError(error) {
  return !!error && lodash.hasIn(error, 'status') && lodash.isFunction(error.json)
}

async function getFetchError(error) {
  try {
    return await error.json()
  } catch (e) {
    return null
  }
}

export default class Misc {
  static trimObjectProperties = (obj, properties) => {
    const data = lodash.cloneDeep(obj)

    if (lodash.isArray(properties)) {
      properties.forEach((property) => {
        data[property] = data[property]?.trim()
      })
    } else {
      lodash.keys(obj).forEach((key) => {
        data[key] = data[key]?.trim()
      })
    }

    return data
  }

  static getImageURL = (name) => name && `${Configs.API_URL}/${name}`

  static getErrorJsonBody = async (error) => {
    if (isFetchError(error)) {
      error = await getFetchError(error)
    }

    return error
  }
}
