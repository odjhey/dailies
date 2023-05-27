import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { IconHome, IconInfoCircle, IconDashboard } from '@tabler/icons-react'

export default function Nav({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="navbar bg-primary"></nav>
      <div className="pb-14">{children}</div>
      <nav className="btm-nav bg-primary pb-4">
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/"
        >
          <IconHome></IconHome>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/all"
        >
          <IconDashboard></IconDashboard>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <IconInfoCircle></IconInfoCircle>
        </NavLink>
      </nav>
    </>
  )
}
