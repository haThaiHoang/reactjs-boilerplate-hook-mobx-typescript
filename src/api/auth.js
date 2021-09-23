// import { MainApi } from './endpoint'
import mockData from '@/utils/mock-api'

export function login(payload) {
  // return MainApi.post('/login', payload)

  if (payload.username === 'admin' && payload.password === '123123123') {
    return mockData({
      data: {
        token: 'SH6643HDHJSGFJSD73475674856'
      },
      duration: 1000
    })
  }

  return mockData({
    error: {
      statusText: 'USERNAME_OR_PASSWORD_INCORRECT'
    },
    duration: 1000
  })
}
