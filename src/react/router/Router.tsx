import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CatalogPage from '../pages/CatalogPage'
import CollectionPage from '../pages/CollectionPage'

const Router = () => {
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
