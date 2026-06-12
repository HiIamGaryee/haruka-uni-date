import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Heart,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Users,
  Clock,
} from 'lucide-react'
import { cn } from '../../lib/cn'

const links = [
  { to: '/admin-dash', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin-dash/users', label: 'Users', icon: Users },
  { to: '/admin-dash/waiting', label: 'Waiting Pool', icon: Clock },
  { to: '/admin-dash/matches', label: 'Match History', icon: Heart },
  { to: '/admin-dash/reports', label: 'Reports', icon: AlertTriangle },
  { to: '/admin-dash/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin-dash/logs', label: 'System Logs', icon: ScrollText },
]

export function AdminLayout() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('haruka_admin_key')
    navigate('/admin-dash/login')
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-bg-elevated p-4 lg:block">
        <div className="mb-8 px-2">
          <p className="font-display text-lg font-bold">Haruka Admin</p>
          <p className="text-xs text-dim">Match Engine Control</p>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-accent/15 text-accent-bright'
                    : 'text-muted hover:bg-white/5 hover:text-text',
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-8 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-text"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-bg/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <Activity className="size-5 text-accent" />
            <span className="font-display font-bold">Admin</span>
          </div>
          <p className="hidden text-xs text-dim lg:block">haruka.admin · Match Engine v1</p>
          <button type="button" onClick={logout} className="text-xs text-muted lg:hidden">
            Logout
          </button>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
