import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { CheckMarkIcon } from 'shared/ui/icons'

type Props = Omit<HTMLAttributes<HTMLInputElement>, 'type'> & {
  checked: boolean
  disabled: boolean
}

export const Checkbox = ({
  className,
  children,
  disabled,
  ...inputProps
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <label htmlFor={inputProps.id} className={`flex items-center cursor-pointer ${className}`}>
      <input type="checkbox" className="appearance-none" {...inputProps} disabled={disabled} />
      <span className="inline-block w-5 h-5 rounded-full border border-orange-500 mr-2 p-1 flex items-center justify-center">
        <CheckMarkIcon className="text-white" />
      </span>
      {children}
    </label>
  )
}
