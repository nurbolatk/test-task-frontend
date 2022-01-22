import React, { HTMLAttributes } from 'react'

type Props = {
  variant: 'info' | 'error' | 'success'
  message?: Record<string, string | number | boolean> | null
  index: string
  as?: string
} & HTMLAttributes<HTMLElement>

export const StatusMessage = ({
  variant,
  message,
  index,
  as = 'p',
  className,
}: Props): JSX.Element | null => {
  let styles = ''

  switch (variant) {
    case 'info':
      styles = 'text-orange-500'
      break
    case 'error':
      styles = 'text-red-500'
      break
    case 'success':
      styles = 'text-green-500'
  }

  const classes = `text-sm ${styles} ${className}`

  return message?.[index] ? React.createElement(as, { className: classes }, message[index]) : null
}
