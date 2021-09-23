import moment from 'moment'

export default class Format {
  static FORMATS = {
    DATE: 'YYYY-MM-DD',
    DATE_TIME: 'YYYY-MM-DD HH:mm'
  }

  static numeric = (number) => (number || 0).toLocaleString(
    undefined, { minimumFractionDigits: 0 }
  )

  static date = (date, format) => (date ? moment(date).format(format || 'YYYY-MM-DD') : '')

  static time = (time, format) => (time ? moment(time, 'HH:mm:ss').format(format || 'HH:mm') : '')
}
