import React from 'react'
import PageLayout from '../components/base/layout/PageLayout'
import HeroBackground from '../components/home/HeroBackground'
import HeroCanvas from '../components/home/HeroCanvas'
import HeroContent from '../components/home/HeroContent'

const HomePage = () => (
  <PageLayout>
    <HeroBackground />
    <HeroCanvas>
      <HeroContent />
    </HeroCanvas>
  </PageLayout>
)

export default HomePage
