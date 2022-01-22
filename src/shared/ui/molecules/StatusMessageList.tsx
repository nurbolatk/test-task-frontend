import React, { HTMLAttributes } from 'react'
import { StatusMessage } from '../atoms'

type Props = {
  variant: 'info' | 'error' | 'success'
  messages: Record<string, string | number | boolean> | null
  as?: string
} & HTMLAttributes<HTMLUListElement>

export const StatusMessageList = ({
  messages,
  as = 'li',
  variant,
  className,
}: Props): JSX.Element | null => {
  return messages ? (
    <ul className={className}>
      {Object.entries(messages ?? {}).map(([key, value]) => (
        <StatusMessage key={key} variant={variant} message={{ [key]: value }} index={key} as={as} />
      ))}
    </ul>
  ) : null
}
