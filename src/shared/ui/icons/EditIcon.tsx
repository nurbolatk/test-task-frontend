import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLOrSVGElement>

export const EditIcon = ({ ...svgProps }: Props): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...svgProps}>
      <path d="m8.424 12.282 4.402 4.399L7 18l1.424-5.718zM24 5.534l-9.689 9.804-4.536-4.536L19.464 1 24 5.534zm-6 8.916V21H2V9h6.743l1.978-2H0v16h20V12.427l-2 2.023z" />
    </svg>
  )
}
