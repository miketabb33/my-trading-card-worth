import React from 'react'

import NavigationOptions from './NavigationOptions'
import NavigationUserControls from './NavigationUserControls'
import NavigationLayout from './NavigationLayout'

const Navigation = () => {
  return (
    <NavigationLayout
      options={<NavigationOptions />}
      userControls={<NavigationUserControls />}
    />
  )
}

export default Navigation
