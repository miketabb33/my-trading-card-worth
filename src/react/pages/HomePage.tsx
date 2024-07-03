import React, { useEffect } from 'react'
import { useRouter } from '../router/useRouter'

const HomePage = () => {
  const { navigateTo } = useRouter()

  useEffect(() => {
    navigateTo('/catalog')
  }, [])

  return <></>
}

export default HomePage
