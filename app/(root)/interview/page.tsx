import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <>
    <h1>Interview Generation</h1>
    <Agent userName={''} type={'interview'} />
    </>
  )
}

export default page
