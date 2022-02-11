import { Component } from 'react'
import styled from 'styled-components'
import memoizeOne from 'memoize-one'
import classnames from 'classnames'

import Configs from '@/configs'
import Table from './table'
import Clickable from './clickable'

const StyledDiv = styled.div`
  .sort-clickable {
    height: 100%;
    display: flex;
    align-items: center;
    
    .sort-icon {
      margin-left: 10px;
      opacity: 0.1;
      transition: transform 0.5s;
    }
    
    &.active {
      .sort-icon {
        opacity: 1;
      }
    }
    
    &.asc {
      .sort-icon {
        transform: rotate(-180deg);
      }
    }
  }
`

interface IFetchableList {
  autoFetchOnMount?: boolean
  pagination?: boolean
  loading?: boolean
  onFetched?: (result: any) => void
  action: (data: any, options: any) => Promise<any>
  page: number
  total: number
  items: any[]
  columns: any[]
  payload?: any
  defaultSort?: {
    key: string
    type: 'asc' | 'desc'
  }
  sort?: string | null
  limit?: number
  rowKey?: string
}

class FetchableTable extends Component<IFetchableList> {
  static defaultProps = {
    autoFetchOnMount: true,
    pagination: true
  }

  state = {
    newPayload: {}
  }

  static SORT_TYPES = {
    ASC: 'asc',
    DESC: 'desc'
  }

  componentDidMount() {
    const { autoFetchOnMount, defaultSort } = this.props

    if (autoFetchOnMount) {
      this._fetchData(1, defaultSort && `${defaultSort.key}|${defaultSort.type}`)
    }
  }

  _fetchData = async (page: number, sort?: string | null) => {
    const { action, onFetched, payload, limit } = this.props
    const { newPayload } = this.state
    const result = await action({
      page,
      limit: limit || Configs.PAGINATION_PAGE_SIZE,
      ...payload,
      ...newPayload,
      ...(sort ? { sort } : {})
    }, {
      page,
      sort
    })

    if (onFetched) {
      onFetched(result)
    }
  }

  fetchDataWithNewPayload = async (newPayload = {}, sort?: string) => {
    this.state.newPayload = newPayload

    await this._fetchData(1, sort)
  }

  _onPaginationChange = (page: number) => {
    const { sort } = this.props
    const sortParts = (sort || '').split('|')

    this._fetchData(page, sort && `${sortParts[0]}|${sortParts[1]}`)
  }

  _onSortChange = (column: string, sortDirection: 'asc' | 'desc') => {
    this._fetchData(1, `${column}|${sortDirection === 'asc' ? 'desc' : 'asc'}`)
  }

  _getColumns = memoizeOne((sort) => {
    const { columns } = this.props
    const sortParts = (sort || '').split('|')

    return columns.map((column) => ({
      ...column,
      title: !column.sortable ? column.title : (
        <Clickable
          className={classnames('sort-clickable', {
            active: sortParts[0] === column.dataIndex,
            asc: sortParts[1] === 'asc' && sortParts[0] === column.dataIndex
          })}
          onClick={() => this._onSortChange(column.dataIndex, sortParts[1])}
        >
          {column.title}
          <p className="sort-icon">v</p>
        </Clickable>
      )
    }))
  })

  render() {
    const { items, page, total, sort, pagination, limit, ...props } = this.props
    const columns = this._getColumns(sort)
    const finalLimit = limit || Configs.PAGINATION_PAGE_SIZE

    return (
      <StyledDiv>
        <Table
          {...props}
          columns={columns}
          dataSource={items}
        />
        {pagination && (
          <Table.Pagination
            total={total}
            pageSize={finalLimit}
            current={page + 1}
            showSizeChanger={false}
            onChange={this._onPaginationChange}
          />
        )}
      </StyledDiv>
    )
  }
}

export default FetchableTable
