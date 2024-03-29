import React from 'react'
import { observer } from 'mobx-react-lite'

import Thumbnail from '@/components/thumbnail'
import FetchableTable from '@/components/fetchable-table'
import { useStore } from '@/hooks/store'

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
  const { products: productsStore } = useStore()

  return (
    <section>
      <p className="section-title">
        Fetchable Table
      </p>
      <div className="section-body">
        <FetchableTable
          rowKey="id"
          columns={COLUMNS}
          action={productsStore.getProducts}
          total={productsStore.products.total}
          page={productsStore.products.page}
          items={productsStore.products.items.toJSON()}
          sort={productsStore.products.sort}
        />
      </div>
    </section>
  )
})

export default FetchableTableSection
