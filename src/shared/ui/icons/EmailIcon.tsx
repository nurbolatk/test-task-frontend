import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLOrSVGElement>

export const EmailIcon = ({ ...svgProps }: Props): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...svgProps}>
      <path d="M12 12.713.015 3h23.971L12 12.713zm-5.425-1.822L0 5.562v12.501l6.575-7.172zm10.85 0L24 18.063V5.562l-6.575 5.329zm-1.557 1.261L12 15.287l-3.868-3.135L.022 21h23.956l-8.11-8.848z" />
    </svg>
  )
}
