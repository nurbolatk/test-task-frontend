import React, { HTMLAttributes } from 'react'
import { OverlayLoader } from './index'

type Props = HTMLAttributes<HTMLDivElement>

export const Skeleton = ({ className, ...props }: Props): JSX.Element => {
  return (
    <div className={`relative ${className}`} {...props}>
      <OverlayLoader />
    </div>
  )
}
