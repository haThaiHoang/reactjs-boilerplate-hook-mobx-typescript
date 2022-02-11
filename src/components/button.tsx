import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'
import Typography from '@/components/typography'
import Media from '@/utils/media'

const StyledButton = styled.button<{ background: string, textcolor?: string }>`
  overflow: hidden;
  position: relative;
  background-color: ${(props) => props.background};
  font-size: 14px;
  padding: 0 20px;
  height: 36px;
  transition: opacity 0.2s;
  outline: none;
  border: none;
  color: ${(props) => (props.textcolor || (Colors.isLight(props.background) ? '#200040' : 'white'))} !important;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 300;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &.small {
    height: 30px;
  }

  &.rounded {
    border-radius: 50px;
  }

  &.square {
    width: 36px;

    &.small {
      width: 30px;
    }
  }

  &.loading {
    cursor: wait;

    &::after, &::before {
      display: flex;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::before {
    background-color: ${(props) => props.background};
    content: '';
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }

  &::after {
    animation: rotation 0.7s infinite linear;
    content: '';
    border: 2px solid #ffffff;
    width: 20px;
    height: 20px;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    border-radius: 50%;
    position: absolute;
    border-bottom-color: transparent;
    border-top-color: transparent;
  }

  &::after, &::before {
    position: absolute;
    display: none;
  }

  ${Media.lessThan(Media.SIZE.MD)} {
  }
`

interface IProps {
  size?: 'small' | 'large'
  loading?: boolean
  rounded?: boolean
  disabled?: boolean
  square?: boolean
  background: string
  textColor?: string
  onClick: (e: any) => void
  icon?: string
  className?: string,
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  size,
  className,
  loading,
  onClick,
  background,
  textColor,
  icon,
  rounded,
  disabled,
  square,
  ...props
}: IProps): JSX.Element => (
  <StyledButton
    {...props}
    disabled={disabled}
    background={background}
    textcolor={textColor}
    className={classnames(size, {
      loading,
      rounded,
      square
    }, 'button', className)}
    onClick={(loading || disabled) ? () => null : onClick}
  >
    {icon && <img src={icon} alt="" />}
    <Typography>
      {children}
    </Typography>
  </StyledButton>
)
Button.defaultProps = {
  background: Colors.PRIMARY
}

export default Button
