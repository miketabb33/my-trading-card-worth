import React from 'react'
import Catalog from '../components/catalog/Catalog'
import ScrollToTopButton from '../components/ScrollToTopButton'
import PageLayout from '../components/base/layout/PageLayout'

const CatalogPage = () => {
  return (
    <PageLayout>
      <Catalog />
      <ScrollToTopButton />
    </PageLayout>
  )
}

export default CatalogPage
