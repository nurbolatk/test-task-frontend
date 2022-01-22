import React from 'react'
import { WithChildren } from 'shared/ui'
import { useSelectState } from '../context'

export const Content = ({ children }: WithChildren): JSX.Element => {
  const { show } = useSelectState()

  return (
    <ul
      className={`transition-all -translate-y-2 z-10 absolute right-0 
        bg-white rounded overflow-hidden border-zinc-100 
        shadow shadow-zinc-300 w-max divide-y divide-zinc-100 ${
          show ? 'translate-y-0 opacity-100' : 'visually-hidden'
        }`}>
      {children}
    </ul>
  )
}
