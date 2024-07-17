import React from 'react'
import NavigationOptions from './NavigationOptions'
import NavigationUserControls from './NavigationUserControls'
import NavigationLayout from './NavigationLayout'
import NavigationStoreStatus from './NavigationStoreStatus'

const Navigation = () => {
  return (
    <NavigationLayout
      options={<NavigationOptions />}
      userControls={<NavigationUserControls />}
      storeStatus={<NavigationStoreStatus />}
    />
  )
}

export default Navigation
