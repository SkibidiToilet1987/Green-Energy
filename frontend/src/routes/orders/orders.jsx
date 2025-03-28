import React from 'react'
import MainNavigation from '../../components/MainNavigation'
import MainFooter from '../../components/MainFooter'

const Orders = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainNavigation/>
      <div style={{ flex: '1' }}></div>
      <MainFooter/>
    </div>
  )
}

export default Orders