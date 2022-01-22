import React, { ReactElement } from 'react'
import { WithChildren } from '../Component'
import { callAll } from 'shared/utils'
import { useSelectState } from '../context'

export const Target = ({ children }: WithChildren): JSX.Element => {
  const { toggleShow } = useSelectState()

  if (children) {
    const child = children as ReactElement
    return React.cloneElement(child, {
      onClick: callAll(child.props.onClick, toggleShow),
      className: `p-2 ${child.props.className}`,
    })
  }

  return (
    <button className="p-2" onClick={toggleShow}>
      Выберите...
    </button>
  )
}
