// eslint-disable-next-line
const lodash = require('lodash')

const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEV = NODE_ENV === 'local'

const configs = {
  plugins: {
    autoprefixer: {
      flexbox: 'no-2009'
    }
  }
}

const prodConfigs = {
  plugins: {
    cssnano: {}
  }
}

module.exports = IS_DEV ? configs : lodash.merge(configs, prodConfigs)
