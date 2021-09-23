import lodash from 'lodash'
import { message, notification } from 'antd'

const show = (type, data) => {
  const className = type === 'error'
    ? 'ant-custom-error' : type === 'warning'
      ? 'ant-custom-warning' : ''

  if (lodash.isObject(data) && data.size === 'large') {
    notification[type](data)
  } else if (lodash.isString(data)) {
    message[type]({
      content: data,
      className
    })
  } else {
    message[type]({
      ...data,
      className
    })
  }
}

class Toast {
  static show(data) {
    show('success', data)
  }

  static warning(data) {
    show('warning', data)
  }

  static error(data) {
    show('error', data)
  }
}

export default Toast
