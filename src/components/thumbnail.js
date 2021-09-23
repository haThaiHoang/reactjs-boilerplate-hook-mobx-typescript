import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'

import { Images } from '@/theme'

const Image = styled.div`
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

const Thumbnail = ({ url, size, style, placeholderUrl, rounded, className, contain, ...props }) => (
  <Image
    style={{ backgroundImage: `url(${url || placeholderUrl || Images.NO_IMAGE})`, ...style }}
    {...props}
    className={classNames(className, { rounded, contain: url })}
    size={size || 40}
    alt=""
  />
)
Thumbnail.propTypes = {
  url: PropTypes.string,
  placeholderUrl: PropTypes.string,
  size: PropTypes.number,
  rounded: PropTypes.bool,
  contain: PropTypes.bool
}

export default Thumbnail
