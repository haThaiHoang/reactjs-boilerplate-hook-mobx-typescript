import moment from 'moment'

export default class Format {
  static FORMATS = {
    DATE: 'YYYY-MM-DD',
    DATE_TIME: 'YYYY-MM-DD HH:mm',
    TIME: 'HH:mm'
  }

  static numeric = (number: number): string => (number || 0).toLocaleString(
    undefined, { minimumFractionDigits: 0 }
  )

  static date = (date: string, format?: string) => (date ? moment(date).format(format || 'YYYY-MM-DD') : '')

  static time = (time: string, format?: string) => (time ? moment(time, 'HH:mm:ss').format(format || 'HH:mm') : '')
}
