import  { ReactNode } from 'react'



const AuthLayout = ({ children }: {children: ReactNode}) => {
  return (
    <div>
      <div className='auth-layout'>{children}</div>
    </div>
  )
}

export default AuthLayout 
  