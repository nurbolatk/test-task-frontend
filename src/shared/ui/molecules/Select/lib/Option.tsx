import React, { PropsWithChildren, ReactElement } from 'react'

export type SelectOption = {
  id: string | number
  label: string
  onClick?: (id: string | number) => void
}

type OptionProps = {
  children?: ReactElement
  option: SelectOption
}

export const Option = ({ children, option }: PropsWithChildren<OptionProps>): JSX.Element => {
  if (children) {
    const child = children as ReactElement
    return React.cloneElement(child, {
      className: `flex w-full items-center px-4 py-2 hover:bg-orange-100 ${child.props.className}`,
    })
  }
  return (
    <button
      onClick={() => option.onClick?.(option.id)}
      className="flex w-full items-center px-4 py-2 hover:bg-orange-100">
      {option.label}
    </button>
  )
}
