import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import { NO_IMAGE } from '@/assets/images'

const Image = styled.div<{ size: number }>`
  display: block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-position: center;
  background-size: cover;
  background-color: lightgray;

  &.rounded {
    border-radius: 50%;
  }

  &.contain {
    background-size: contain;
    background-repeat: no-repeat;
  }
`
interface IProps {
  url: string,
  className?: string,
  placeholderUrl?: string,
  size?: number,
  rounded?: boolean,
  style?: any
}

const Thumbnail = ({ url, size, style, placeholderUrl, rounded, className, ...props }: IProps) => (
  <Image
    style={{ backgroundImage: `url(${url || placeholderUrl || NO_IMAGE})`, ...style }}
    {...props}
    className={classNames(className, { rounded, contain: url })}
    size={size || 40}
  />
)

export default Thumbnail
