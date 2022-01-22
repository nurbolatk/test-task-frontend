import React, { InputHTMLAttributes, PropsWithChildren } from 'react'
import { CheckMarkIcon } from 'shared/ui/icons'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const Checkbox = ({
  className,
  children,
  disabled,
  ...inputProps
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <label
      htmlFor={inputProps.id}
      className={`flex relative items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="appearance-none absolute"
        {...inputProps}
        disabled={disabled}
      />
      <span className="inline-block w-5 h-5 rounded-full border border-orange-500 mr-2 p-1 flex items-center justify-center">
        <CheckMarkIcon className="text-white w-full h-full" />
      </span>
      {children}
    </label>
  )
}
