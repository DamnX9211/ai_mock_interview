/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default RootLayout
