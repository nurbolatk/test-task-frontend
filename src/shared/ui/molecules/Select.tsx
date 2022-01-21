import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react'
import { callAll } from '../../utils'

export type SelectOption = {
  id: string | number
  label: string
  onClick?: (id: string | number) => void
}

export type WithChildren = {
  children?: ReactElement | ReactNode[]
}

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

const Select = ({ children }: WithChildren): JSX.Element => {
  const [show, setShow] = useState(true)
  const toggleShow = () => setShow(!show)

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key === 'Escape') {
        setShow(false)
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [setShow])

  return (
    <SelectContext.Provider value={{ show, setShow, toggleShow }}>
      <div className="relative">{children}</div>
      {show && (
        <div
          className="bg-transparent w-screen h-screen fixed inset-0 z-[9]"
          onClick={() => {
            setShow(false)
          }}
        />
      )}
    </SelectContext.Provider>
  )
}

const Content = ({ children }: WithChildren): JSX.Element => {
  const { show } = useSelectState()

  return (
    <ul
      className={`transition-all -translate-y-2 opacity-0 z-10 absolute 
        bg-white rounded overflow-hidden border-zinc-100 
        shadow shadow-zinc-300 w-max divide-y divide-zinc-100 ${
          show ? 'translate-y-0 opacity-100' : 'visually-hidden'
        }`}>
      {children}
    </ul>
  )
}

type OptionProps = {
  children?: ReactElement
  option: SelectOption
}

const Option = ({ children, option }: PropsWithChildren<OptionProps>): JSX.Element => {
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

const Target = ({ children }: WithChildren): JSX.Element => {
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

Select.Option = Option
Select.Content = Content
Select.Target = Target
export { Select }
