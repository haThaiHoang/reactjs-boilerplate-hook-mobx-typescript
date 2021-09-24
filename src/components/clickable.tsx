import React, { FC } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  user-select: none;
  transition: filter 0.2s ease;
  display: block;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(0.8);
  }
`

interface IProps {
  children: React.ReactNode,
  className?: string,
  onClick: (e: React.MouseEvent) => void
  href?: string
}

const Clickable: FC<IProps> = ({ children, className, onClick, href }) => (
  <StyledDiv
    href={href}
    as={href && 'a'}
    className={className}
    onClick={(e: React.MouseEvent) => {
      if (href) {
        e.preventDefault()
      }

      onClick(e)
    }}
  >
    {children}
  </StyledDiv>
)

export default Clickable
