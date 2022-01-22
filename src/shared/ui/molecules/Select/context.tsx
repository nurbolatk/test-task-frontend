import React from 'react'

type SelectState = {
  show: boolean
  setShow: (show: boolean) => void
  toggleShow: () => void
}

const SelectContext = React.createContext<SelectState | undefined>(undefined)

function useSelectState(): SelectState {
  const values = React.useContext(SelectContext)
  if (values === undefined) {
    throw new Error('useSelectState must be used inside SelectProvider')
  }
  return values
}
export { useSelectState, SelectContext }
