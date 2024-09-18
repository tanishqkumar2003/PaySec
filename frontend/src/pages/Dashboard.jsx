import React from 'react'
import { Appbar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/User'

export const Dashboard= ()=> {
  return <div className='ml-28 mr-28 m-6'>
    <Appbar/>
    <div className='m-8'>
      <Balance value={"10,000"} />
      <Users/>
    </div>
  </div>
}
