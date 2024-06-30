import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

const Router = () => {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/:expansionId', element: <HomePage /> },
  { path: '*', element: 'Page not Found' },
])

export default Router
