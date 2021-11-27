import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'

interface IStyledProps {
  align?: string
  bold?: boolean
}

const StyledP = styled.p<IStyledProps>`
  text-align: ${(props) => props.align || 'left'};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  font-size: 14px;

  &.tiny {
    font-size: 10px;
  }

  &.small {
    font-size: 12px;
  }

  &.large {
    font-size: 16px;
  }

  &.big {
    font-size: 18px;
  }

  &.huge {
    font-size: 20px;
  }

  &.giant {
    font-size: 30px;
  }

  &.enormous {
    font-size: 40px;
  }

  &.link {
    cursor: pointer;
    user-select: none;
  }

  &.underline {
    text-decoration: underline;
  }

  &.primary {
    color: ${Colors.PRIMARY};
  }

  &.secondary {
    color: #a7a7a7;
  }

  &.center {
    text-align: center;
  }
`

interface IProps {
  className?: string
  size?: string
  link?: boolean
  primary?: boolean
  secondary?: boolean
  underline?: boolean
  center?: boolean
  bold?: boolean
  children: React.ReactNode
  style?: any
}

const Typography = ({
  className,
  children,
  link,
  underline,
  primary,
  secondary,
  center,
  size,
  ...props
}: IProps): JSX.Element => (
  <StyledP
    className={classnames(size || '', {
      link,
      underline,
      primary,
      secondary,
      center
    }, 'typography', className)}
    {...props}
  >
    {children}
  </StyledP>
)

export default Typography
