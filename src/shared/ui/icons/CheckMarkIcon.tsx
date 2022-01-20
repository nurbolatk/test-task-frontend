import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLOrSVGElement>

export const CheckMarkIcon = ({ ...svgProps }: Props): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...svgProps}>
      <path d="M20.285 2 9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z" />
    </svg>
  )
}
