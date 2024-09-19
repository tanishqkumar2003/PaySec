import React from 'react'
import { Appbar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/User'

export const Dashboard= ()=> {
  return <>
  <Appbar/>
  <div className='ml-28 mr-28 m-6'>
    <div className='m-8'>
      <Balance value={localStorage.getItem("balance")} />
      <Users/>
    </div>
  </div>
  </>
}
