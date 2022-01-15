import React from 'react'

export const ErrorMessage = ({ message }: { message: string }): JSX.Element => {
  return <p className="text-red-500 text-sm">{message}</p>
}
