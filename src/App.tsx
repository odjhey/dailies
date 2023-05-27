import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Nav from './layouts/Nav'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { All } from './pages/All'

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

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
