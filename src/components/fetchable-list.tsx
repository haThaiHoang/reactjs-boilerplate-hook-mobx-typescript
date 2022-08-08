import { Component, Fragment } from 'react'
import styled from 'styled-components'

import Configs from '@/configs'
import Button from '@/components/button'
import NoDataBox from '@/components/no-data-box'
import Loading from '@/components/loading'

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  
  .fetchable-no-data {
    padding: 60px 0;
    background-color: white;
    border-radius: 5px;
  }
  
  .bottom-box {
    display: flex;
    flex-direction: column;
    height: 40px;
  }
`

interface IFetchableList {
  autoFetchOnMount?: boolean
  pagination?: boolean
  noDataMessage?: string
  loading?: boolean
  onFetched?: (result: any) => void
  action: (data: any, options: any) => Promise<any>
  page: number
  total: number
  items: any[]
  payload?: any
  keyExtractor: (item: any, index: number) => number | string
  renderItem: (item: any, index: number) => JSX.Element
  className?: string
}

class FetchableList extends Component<IFetchableList> {
  static defaultProps = {
    pagination: true,
    autoFetchOnMount: true
  }

  state = {
    loadingMore: false,
    newPayload: {}
  }

  componentDidMount() {
    const { autoFetchOnMount } = this.props

    if (autoFetchOnMount) {
      this._fetchData(0)
    }
  }

  _fetchData = async (page: number, concat?: boolean) => {
    const { action, onFetched, payload } = this.props
    const { newPayload } = this.state

    const result = await action({
      offset: (page) * Configs.PAGINATION_PAGE_SIZE,
      limit: Configs.PAGINATION_PAGE_SIZE,
      ...payload,
      ...newPayload
    }, { page, concat })

    if (onFetched) {
      onFetched(result)
    }
  }

  fetchDataWithNewPayload = async (newPayload = {}) => {
    this.state.newPayload = newPayload

    await this._fetchData(0)
  }

  _onLoadMore = async () => {
    const { page } = this.props

    this.setState({
      loadingMore: true
    })

    await this._fetchData(page + 1, true)

    this.setState({
      loadingMore: false
    })
  }

  _renderItem = (item: any, index: number) => {
    const { renderItem, keyExtractor } = this.props

    return (
      <Fragment key={keyExtractor(item, index) || index}>
        {renderItem(item, index)}
      </Fragment>
    )
  }

  render(): JSX.Element {
    const { items, className, total, loading, noDataMessage, pagination } = this.props
    const { loadingMore } = this.state

    return (
      <StyledDiv className={className}>
        <div className="content-fetch-able">
          {items.map(this._renderItem)}
        </div>
        {items.length === 0 && !loading && (
          <div className="fetchable-no-data">
            <NoDataBox message={noDataMessage} />
          </div>
        )}
        {pagination && (
          <div className="bottom-box">
            {total > items.length && !loadingMore && (
              <Button
                onClick={this._onLoadMore}
              >
                Loadmore
              </Button>
            )}
            {(loadingMore || loading) && (
              <Loading size="small" />
            )}
          </div>
        )}
      </StyledDiv>
    )
  }
}

export default FetchableList
