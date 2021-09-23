import { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import styled from 'styled-components'
import { inject } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'

import Storage from '@/utils/storage'
import Clickable from '@/components/clickable'
import { Colors } from '@/theme'
import { history } from '@/store'

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-box {
      display: flex;
      align-items: center;

      .menu-button {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        div {
          height: 2px;
          width: 100%;
          background-color: white;
        }
      }

      .title {
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }

    .right-box {
      display: flex;
      align-items: center;

      .user-box {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        user-select: none;

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .name {
          font-size: 16px;
          letter-spacing: 0.21px;
          margin-bottom: 0;
          margin-right: 10px;
        }

        .anticon {
          font-size: 12px;
        }
      }
      
      .language-box {
        display: flex;
        
        .language-button {
          margin-left: 10px;
          border: 1px solid white;
          width: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          padding-top: 2px;
          transition: color 0.2s, background-color 0.2s;
          
          &.active {
            background-color: white;
            color: ${Colors.PRIMARY};
          }
        }
      }
    }
  }
`

@withTranslation('common')
@inject((stores) => ({
  uiStore: stores.ui
}))
class Header extends Component {
  static propTypes = {
    uiStore: PropTypes.object
  }

  _onLogout = (e) => {
    e.preventDefault()

    Storage.remove('ACCESS_TOKEN')
    history.replace('/login')
  }

  _onChangeLanguage = (language) => {
    const { i18n } = this.props

    i18n.changeLanguage(language)
  }

  _onToggleSideMenu = () => {
    const { uiStore } = this.props

    uiStore.toggleSideBar()
  }

  render() {
    const { t, i18n } = this.props

    return (
      <HeaderContainer>
        <div className="content">
          <div className="left-box">
            <Clickable
              className="menu-button"
              onClick={this._onToggleSideMenu}
            >
              <div />
              <div />
              <div />
            </Clickable>
            <p className="title">{t('header.title')}</p>
          </div>
          <div className="right-box">
            <Popover
              content={(
                <a href="/" onClick={this._onLogout}>Logout</a>
              )}
              trigger="click"
            >
              <div className="user-box">
                <img
                  className="avatar"
                  src="https://picsum.photos/300"
                  alt=""
                />
                <p className="name">hoanght</p>
              </div>
            </Popover>
            <div className="language-box">
              {['en', 'vi'].map((item) => (
                <Clickable
                  key={item}
                  className={classnames('language-button', { active: item === i18n.language })}
                  onClick={() => this._onChangeLanguage(item)}
                >
                  {item.toUpperCase()}
                </Clickable>
              ))}
            </div>
          </div>
        </div>
      </HeaderContainer>
    )
  }
}

export default Header
