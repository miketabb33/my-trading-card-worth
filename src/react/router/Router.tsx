import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CatalogPage from '../pages/CatalogPage'
import CollectionPage from '../pages/CollectionPage'
import { getAuthReturnUrl } from './authReturnUrl'
import { useProfile } from '../providers/ProfileProvider'
import SpinnerPage from '../pages/SpinnerPage'
import DeleteUserDataPage from '../pages/DeleteUserDataPage'

const redirectToAuthReturnUrlUnlessMissing = () => {
  const authReturnUrl = getAuthReturnUrl()
  if (authReturnUrl) location.pathname = authReturnUrl
}

const Router = () => {
  const { isLoading } = useProfile()

  redirectToAuthReturnUrlUnlessMissing()

  if (isLoading) return <SpinnerPage />
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/collection', element: <CollectionPage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '/catalog/:expansionSlug', element: <CatalogPage /> },
  { path: '/delete-user-data', element: <DeleteUserDataPage /> },
  { path: '*', element: 'Page Not Found' },
])

export default Router
