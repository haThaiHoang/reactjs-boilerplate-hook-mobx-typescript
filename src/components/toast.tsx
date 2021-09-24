import lodash from 'lodash'
import { message } from 'antd'

type TData = string | {
  content: string,
  duration?: number
}

const show = (type: 'success' | 'warning' | 'error', data: TData) => {
  const className = type === 'error'
    ? 'ant-custom-error' : type === 'warning'
      ? 'ant-custom-warning' : ''

  if (lodash.isString(data)) {
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
  static show(data: TData): void {
    show('success', data)
  }

  static warning(data: TData): void {
    show('warning', data)
  }

  static error(data: TData): void {
    show('error', data)
  }
}

export default Toast
