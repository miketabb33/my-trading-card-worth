import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CatalogPage from '../pages/CatalogPage'
import CollectionPage from '../pages/CollectionPage'
import { getAuthReturnUrl } from './authReturnUrl'

const redirects = () => {
  const authReturnUrl = getAuthReturnUrl()
  if (authReturnUrl) location.pathname = authReturnUrl
}

const Router = () => {
  redirects()
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/collection', element: <CollectionPage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '/catalog/:expansionSlug', element: <CatalogPage /> },
  { path: '*', element: 'Page Not Found' },
])

export default Router
