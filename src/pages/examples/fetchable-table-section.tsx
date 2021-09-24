import React from 'react'
import { observer } from 'mobx-react'

import Thumbnail from '@/components/thumbnail'
import FetchableTable from '@/components/fetchable-table'
import { TYPES } from '@/store/products'
import { useStore } from '@/store'

const COLUMNS = [{
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
  render: (cell: string) => (
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

const FetchableTableSection = observer((): JSX.Element => {
  const store = useStore()

  return (
    <section>
      <p className="section-title">
        Fetchable Table
      </p>
      <div className="section-body">
        <FetchableTable
          rowKey="id"
          columns={COLUMNS}
          action={store.products.getProducts}
          total={store.products.products.total}
          page={store.products.products.page}
          items={store.products.products.items}
          loading={store.products.type === TYPES.GET_PRODUCTS}
          sort={store.products.products.sort}
        />
      </div>
    </section>
  )
})

export default FetchableTableSection
