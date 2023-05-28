import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { All } from './pages/All'
import * as Toast from '@radix-ui/react-toast'
import { createContext, useState } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Nav>
        <Home></Home>
      </Nav>
    ),
  },
  {
    path: '/all',
    element: (
      <Nav>
        <All></All>
      </Nav>
    ),
  },
  {
    path: '/about',
    element: (
      <Nav>
        <About></About>
      </Nav>
    ),
  },
])

export const ToastContext = createContext({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  show: (_: string) => {
    // void
  },
  hide: () => {
    // void
  },
  title: '',
  description: '',
})

function App() {
  const [toast, setToast] = useState({
    isOpen: false,
    title: '',
    description: '',
  })

  return (
    <ToastContext.Provider
      value={{
        isOpen: toast.isOpen,
        show: (message: string) => {
          setToast((prev) => ({ ...prev, isOpen: true, title: message }))
        },
        hide: () => {
          setToast((prev) => ({ ...prev, isOpen: false }))
        },
        title: toast.title,
        description: toast.description,
      }}
    >
      <Toast.Provider>
        <Toast.Root
          open={toast.isOpen}
          className="h-10 w-full border bg-pink-200"
        >
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed w-full"></Toast.Viewport>
        <RouterProvider router={router}></RouterProvider>
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export default App
