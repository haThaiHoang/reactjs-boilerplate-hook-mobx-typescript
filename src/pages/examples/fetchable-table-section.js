import { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import Thumbnail from '@/components/thumbnail'
import FetchableTable from '@/components/fetchable-table'
import { TYPES } from '@/store/products'

@inject((stores) => ({
  productsStore: stores.products
}))
@observer
class FetchableTableSection extends Component {
  static propTypes = {
    productsStore: PropTypes.object
  }

  constructor(props) {
    super(props)

    this._columns = [{
      title: '#',
      width: 50,
      dataIndex: 'id',
      sortable: true,
      key: 'id'
    }, {
      title: 'Image',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      render: (cell) => (
        <Thumbnail
          url={cell}
          rounded
        />
      )
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sortable: true,
      width: 220
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 220
    }]
  }

  render() {
    const { productsStore } = this.props

    return (
      <section>
        <p className="section-title">
          Fetchable Table
        </p>
        <div className="section-body">
          <FetchableTable
            rowKey="id"
            columns={this._columns}
            action={productsStore.getProducts}
            total={productsStore.products.total}
            page={productsStore.products.page}
            items={productsStore.products.items}
            loading={productsStore.type === TYPES.GET_PRODUCTS}
            sort={productsStore.products.sort}
          />
        </div>
      </section>
    )
  }
}

export default FetchableTableSection
