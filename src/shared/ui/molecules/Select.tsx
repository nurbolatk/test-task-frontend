import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react'

export type SelectOption = {
  id: string | number
  label: string
  onClick: (id: string | number) => void
}

type Props = {
  selected?: React.ReactNode
  options: SelectOption[]
}

const Select = ({ selected, options, children }: PropsWithChildren<Props>): JSX.Element => {
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
  }, [])

  return (
    <>
      <div className="relative">
        <button className="p-2" onClick={toggleShow}>
          {selected ?? 'Выберите...'}
        </button>
        <ul
          className={`transition-all -translate-y-2 opacity-0 z-10 absolute 
        bg-white rounded overflow-hidden border-zinc-100 
        shadow shadow-zinc-300 w-max divide-y divide-zinc-100 ${
          show ? 'translate-y-0 opacity-100' : 'visually-hidden'
        }`}>
          {children}
        </ul>
      </div>
      {show && (
        <div
          className="bg-transparent w-screen h-screen fixed inset-0 z-[9]"
          onClick={() => {
            setShow(false)
          }}
        />
      )}
    </>
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
      onClick: () => option.onClick(option.id),
      className: `flex w-full items-center px-4 py-2 hover:bg-orange-100 ${child.props.className}`,
    })
  }
  return (
    <button
      onClick={() => option.onClick(option.id)}
      className="flex w-full items-center px-4 py-2 hover:bg-orange-100">
      {option.label}
    </button>
  )
}

const Target = ({ children, option }: OptionProps): JSX.Element => {
  if (children) {
    const child = children as ReactElement
    return React.cloneElement(child, {
      onClick: () => option.onClick(option.id),
      className: `flex w-full items-center px-4 py-2 hover:bg-orange-100 ${child.props.className}`,
    })
  }
  ;<button className="p-2" onClick={toggleShow}>
    {selected ?? 'Выберите...'}
  </button>
}

Select.Option = Option
export { Select }
