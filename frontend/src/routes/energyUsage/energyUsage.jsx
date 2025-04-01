import React from 'react'
import MainNavigation from '../../components/mainnavigation'
import MainFooter from '../../components/MainFooter'

const EnergyUsage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainNavigation />
      <div style={{ flex: 1 }}></div>
      <MainFooter />
    </div>
  )
}

export default EnergyUsage