import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'

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

@observer
class FetchableList extends Component {
  static propTypes = {
    renderItem: PropTypes.func,
    keyExtractor: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    payload: PropTypes.object,
    items: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onFetched: PropTypes.func,
    loading: PropTypes.bool,
    noDataMessage: PropTypes.string,
    pagination: PropTypes.bool,
    autoFetchOnMount: PropTypes.bool
  }

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

  _fetchData = async (page, concat) => {
    const { action, onFetched, payload } = this.props
    const { newPayload } = this.state

    const result = await action({
      offset: (page) * Configs.PAGINATION_PAGE_SIZE,
      limit: Configs.PAGINATION_PAGE_SIZE,
      ...payload,
      ...newPayload
    }, { page, concat })

    if (onFetched) {
      onFetched(result, { page })
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

  _renderItem = (item, index) => {
    const { renderItem, keyExtractor } = this.props

    return (
      <Fragment key={keyExtractor(item, index) || index}>
        {renderItem(item, index)}
      </Fragment>
    )
  }

  render() {
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
                color="white"
                onClick={this._onLoadMore}
              >
                もっと見る
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
