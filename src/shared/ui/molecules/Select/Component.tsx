import React, { useEffect, useState } from 'react'
import { SelectContext } from './context'
import { Target } from './lib/Target'
import { Content } from './lib/Content'
import { Option } from './lib/Option'
import { WithChildren } from 'shared/ui'

const Select = ({ children }: WithChildren): JSX.Element => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
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
          tabIndex={0}
          className="bg-transparent w-screen h-screen fixed inset-0 z-[9]"
          onClick={() => {
            setShow(false)
          }}
        />
      )}
    </SelectContext.Provider>
  )
}

Select.Option = Option
Select.Content = Content
Select.Target = Target
export { Select }
