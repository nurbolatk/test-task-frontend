import React, { HTMLAttributes } from 'react'
import { SpinnerIcon } from '../icons'

type Props = HTMLAttributes<HTMLDivElement>

export const OverlayLoader = ({ className, ...props }: Props): JSX.Element => {
  return (
    <div
      className={`w-full h-full bg-white bg-opacity-50 flex items-center justify-center absolute inset-0 ${className}`}
      {...props}>
      <SpinnerIcon className="animate-spin" />
    </div>
  )
}
