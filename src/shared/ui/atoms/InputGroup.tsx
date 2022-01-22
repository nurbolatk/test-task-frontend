import React, { InputHTMLAttributes } from 'react'
import { StatusMessage } from './StatusMessage'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: Record<string, string> | null
}

export const InputGroup = ({ className, error, ...props }: Props): JSX.Element => {
  return (
    <div className={className}>
      <input className="input" {...props} />
      <StatusMessage message={error} index={props.name ?? ''} variant="error" />
    </div>
  )
}
