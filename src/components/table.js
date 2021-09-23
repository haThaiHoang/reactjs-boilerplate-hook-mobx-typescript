import { Component } from 'react'
import PropTypes from 'prop-types'
import { Table as AntdTable, Pagination } from 'antd'
import styled from 'styled-components'

const StyledTable = styled(AntdTable)`
  // Put your custom styles for table here
  .ant-table {
    .ant-table-container {
      .ant-table-content {
        .ant-table-thead {
          .ant-table-cell {
            background-color: #f8f8f8;
            font-size: 16px;
            color: #55595c;
            padding: 0px 16px;
            height: 50px;
          }
        }

        .ant-table-tbody {
          .ant-table-row {
            .ant-table-cell {
              font-size: 16px;
              padding: 0px 16px;
              height: 50px;
              border-bottom: 1px solid #dddddd;
            }
          }
        }
      }
    }
  }
`
const PaginationBox = styled.div`
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Table extends Component {
  static propTypes = {
    dataSource: PropTypes.array
  }

  static Pagination = (props) => (
    <PaginationBox>
      <p>Total: <b>{props.total}</b></p>
      <Pagination {...props} />
    </PaginationBox>
  )

  scroll = (x = 0, y = 0) => {
    const tableBody = document.getElementsByClassName('ant-table-body')[0]
    if (tableBody) tableBody.scroll(x, y)
  }

  render() {
    const { dataSource } = this.props

    return (
      <StyledTable
        {...this.props}
        pagination={false}
        dataSource={dataSource.toJSON ? dataSource.toJSON() : dataSource}
      />
    )
  }
}

export default Table
