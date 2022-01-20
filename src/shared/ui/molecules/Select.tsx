import React, { useEffect, useState } from 'react'

export type SelectOption = {
  id: string | number
  label: string
  onClick: (id: string | number) => void
}

type Props = {
  selected?: React.ReactNode
  options: SelectOption[]
}

export const Select = ({ selected, options }: Props): JSX.Element => {
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
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => option.onClick(option.id)}
              className="flex w-full items-center px-4 py-2 hover:bg-orange-100">
              {option.label}
            </button>
          ))}
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
