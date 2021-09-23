// import { MainApi } from './endpoint'
import mockData from '@/utils/mock-api'
/* eslint-disable max-len */
export function getProducts() {
  // return MainApi.get('/schedules', payload)

  return mockData({
    data: {
      products: [{
        id: 1,
        avatar: 'https://picsum.photos/id/1/300',
        name: 'Apple',
        description: 'Ngon'
      }, {
        id: 2,
        avatar: 'https://picsum.photos/id/2/300',
        name: 'Carrot',
        description: 'Quá Ngon'
      }, {
        id: 3,
        avatar: 'https://picsum.photos/id/3/300',
        name: 'Milk',
        description: 'Hơi béo'
      }, {
        id: 4,
        avatar: 'https://picsum.photos/id/4/300',
        name: 'Orange',
        description: 'Chua'
      }, {
        id: 5,
        avatar: 'https://picsum.photos/id/5/300',
        name: 'Orange juice',
        description: 'Quá Tuyệt'
      }, {
        id: 6,
        avatar: 'https://picsum.photos/id/6/300',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }, {
        id: 7,
        avatar: 'https://picsum.photos/id/7/300',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 8,
        avatar: 'https://picsum.photos/id/8/300',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 9,
        avatar: 'https://picsum.photos/id/9/300',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }, {
        id: 11,
        avatar: 'https://picsum.photos/id/11/300',
        name: 'Apple',
        description: 'Ngon'
      }, {
        id: 12,
        avatar: 'https://picsum.photos/id/12/300',
        name: 'Carrot',
        description: 'Quá Ngon'
      }, {
        id: 13,
        avatar: 'https://picsum.photos/id/13/300',
        name: 'Milk',
        description: 'Hơi béo'
      }, {
        id: 14,
        avatar: 'https://picsum.photos/id/14/300',
        name: 'Orange',
        description: 'Chua'
      }, {
        id: 15,
        avatar: 'https://picsum.photos/id/15/300',
        name: 'Orange juice',
        description: 'Quá Tuyệt'
      }, {
        id: 16,
        avatar: 'https://picsum.photos/id/16/300',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }, {
        id: 17,
        avatar: 'https://picsum.photos/id/17/300',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 18,
        avatar: 'https://picsum.photos/id/18/300',
        name: 'Candy',
        description: 'Ngọt'
      }, {
        id: 19,
        avatar: 'https://picsum.photos/id/19/300',
        name: 'Cocacola',
        description: 'Hơi ngọt'
      }],
      total: 100
    }
  })
}
