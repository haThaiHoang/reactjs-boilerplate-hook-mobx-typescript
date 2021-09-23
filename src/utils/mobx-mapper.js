/* eslint-disable */
import lodash from 'lodash'

const converter = {
  fields: mapFields,
  assign: assignFields,
  camelCase: mapCamelCase,
  snakeCase: mapSnakeCase
}

const mapper = applyMappers((data) => data)

export default mapper
export { converter }

function createMapper(mapFn) {
  return (...args) => applyMappers((data) => mapFn(data, ...args))
}

function applyMappers(fn) {
  lodash.forEach(converter, (mapFn, key) => {
    fn[key] = createMapper((data, ...args) => mapFn(fn(data), ...args))
  })

  return fn
}

function mapFields(data, fields = {}, options) {
  options = lodash.assign({
    strip: false
  }, options)

  data = lodash.clone(data)

  lodash.forEach(fields, (value, key) => {
    data = mapField(data, key, value)
  })

  if (options.strip) {
    data = lodash.pick(data, lodash.keys(fields))
  }

  return data
}

function mapField(data, key, options) {
  if (!data) return

  if (lodash.isFunction(options)) {
    const value = options(data)

    lodash.set(data, key, value)

    return data
  }

  if (lodash.isString(options)) {
    options = { field: options }
  }

  options = lodash.assign({
    field: key
  }, options)

  if (options.prevent) {
    return lodash.omit(data, key)
  }

  let value = lodash.get(data, options.field, data[key])

  if (options.cast === 'number') {
    const numericValue = lodash.toNumber(value)

    if ((lodash.isString(value) || lodash.isNumber(value)) && !lodash.isNaN(numericValue)) {
      value = numericValue
    }
  }

  lodash.set(data, key, value)

  return data
}

function assignFields(data, target, fields) {
  const items = lodash.concat(fields)

  fields = {}

  items.forEach((value) => {
    if (lodash.isString(value)) {
      fields[value] = value
    } else if (lodash.isArray(value) && value.length === 2) {
      fields[value[0]] = value[1]
    } else if (lodash.isPlainObject(value)) {
      lodash.assign(fields, value)
    }
  })

  lodash.forEach(fields, (value, key) => {
    lodash.set(target, key, lodash.get(data, value))
  })

  return target
}


function mapCamelCase(data, options) {
  options = lodash.assign({ recursive: true }, options)

  return camelCase(data, options.recursive)
}

function mapSnakeCase(data, options = {}) {
  options = lodash.assign({ recursive: true }, options)

  return snakeCase(data, options.recursive)
}

function convertCase(object, convertFunc, recursive = false) {
  if (Array.isArray(object)) {
    return object.map((value) => convertCase(value, convertFunc, recursive))
  } if (object !== null && lodash.isObject(object)) {
    const result = {}

    lodash.keys(object).forEach((key) => {
      result[convertFunc(key)] = recursive
        ? convertCase(object[key], convertFunc, recursive)
        : object[key]
    })

    return result
  }

  return object
}

function camelCase(object, recursive = false) {
  return convertCase(object, lodash.camelCase, recursive)
}

function snakeCase(object, recursive = false) {
  return convertCase(object, lodash.snakeCase, recursive)
}
