import React from 'react'
import Topics from './Topics'
import { featureConsiderations } from './considerations'

const FeatureConsiderations = () => {
  return (
    <div>
      <h1>Feature Considerations</h1>
      <Topics topics={featureConsiderations} />
    </div>
  )
}

export default FeatureConsiderations
