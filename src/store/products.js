import { types } from 'mobx-state-tree'

import { Model } from '@/utils/mobx-model-helper'
import { getProducts } from '@/api/products'

const TYPES = {
  'GET_PRODUCTS': 1
}

const Product = types.model('Product')
  .props({
    id: types.identifierNumber,
    avatar: types.maybeNull(types.string),
    name: types.string,
    description: types.maybeNull(types.string)
  })

const ProductsStore = Model.named('ProductsStore')
  .props({
    products: types.model({
      items: types.array(Product),
      page: types.number,
      sort: types.maybeNull(types.string),
      total: types.number
    })
  })
  .actions((self) => ({
    getProducts(payload, { page, sort }) {
      return self.request({
        type: TYPES.GET_PRODUCTS,
        api: getProducts,
        payload,
        onSuccess: (result) => {
          self.products = {
            items: result.products,
            page,
            sort,
            total: result.total
          }
        }
      })
    }
  }))

export {
  TYPES
}
export default ProductsStore.create({
  products: {
    item: [],
    page: 1,
    total: 0
  }
})
