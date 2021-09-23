import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

import { Colors } from '@/theme'

const Box = styled.div`
  width: 0;
  box-shadow: 4px 0 22px 0 rgba(0, 0, 0, 0.07);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  transition: width 0.5s;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &.open {
    width: 300px;
  }

  .surfing-box {
    width: 300px;

    .menu {
      display: flex;
      flex-direction: column;
      padding: 10px 0;

      .menu-item {
        padding: 15px;
        color: black;
        margin-bottom: 5px;
        transition: background-color 0.2s;

        &:hover {
          background-color: ${({ theme }) => Colors.lighten(theme.primary, 67)};
        }

        &.active {
          background-color: ${({ theme }) => Colors.lighten(theme.primary, 30)};
          color: white;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`

const MENU_ITEMS = [{
  link: '/',
  name: 'home'
}, {
  link: '/examples',
  name: 'examples'
}]

@withTranslation('common')
@inject((stores) => ({
  uiStore: stores.ui
}))
@observer
class SideBar extends Component {
  static propTypes = {
    uiStore: PropTypes.object
  }

  state = {}

  render() {
    const { t, uiStore } = this.props

    return (
      <Box className={classnames({ open: uiStore.sideBarStatus })}>
        <div className="surfing-box">
          <div className="menu">
            {MENU_ITEMS.map((item, index) => (
              <NavLink
                exact
                key={index}
                to={item.link}
                className="menu-item"
              >
                {t(`side_bar.${item.name}`)}
              </NavLink>
            ))}
          </div>
        </div>
      </Box>
    )
  }
}

export default SideBar
