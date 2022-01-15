import React from 'react'

export const ErrorMessages = ({ errors }: { errors: Record<string, string> }) => {
  return (
    <ul>
      {Object.values(errors).map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )
}
