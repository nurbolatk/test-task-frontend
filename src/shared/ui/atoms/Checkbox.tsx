import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { CheckMarkIcon } from '../icons/CheckMarkIcon'

type Props = Omit<HTMLAttributes<HTMLInputElement>, 'type'>

export const Checkbox = ({ children, ...inputProps }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <label htmlFor={inputProps.id} className="flex items-center cursor-pointer">
      <input type="checkbox" className="appearance-none" {...inputProps} />
      <span className="inline-block w-5 h-5 rounded-full border border-orange-500 mr-2 p-1 flex items-center justify-center">
        <CheckMarkIcon className="text-white" />
      </span>
      {children}
    </label>
  )
}
