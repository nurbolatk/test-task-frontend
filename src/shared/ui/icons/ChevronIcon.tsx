import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLOrSVGElement> & {
  direction?: string
}

export const ChevronIcon = ({
  className,
  direction = 'right',
  ...svgProps
}: Props): JSX.Element => {
  let styles = ''

  switch (direction) {
    case 'left':
      styles = '-rotate-180'
      break
    case 'up':
      styles = '-rotate-90'
      break
    case 'down':
      styles = 'rotate-90'
      break
    default:
      break
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...svgProps}
      className={`${styles} ${className}`}>
      <path d="m5 3 3.057-3L20 12 8.057 24 5 21l9-9z" />
    </svg>
  )
}
