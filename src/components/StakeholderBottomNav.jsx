import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Map, Bell, BarChart2, User } from 'lucide-react'

const navItems = [
  { path: '/stakeholder', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/stakeholder/farms', label: 'Farms', icon: Map },
  { path: '/alerts', label: 'Alerts', icon: Bell },
  { path: '/stakeholder/reports', label: 'Reports', icon: BarChart2 },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function StakeholderBottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="bottom-nav">
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = location.pathname === path
        return (
          <button
            key={path}
            className="nav-item"
            onClick={() => navigate(path)}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 2}
              color={isActive ? '#2E7D32' : '#9CA3AF'}
            />
            <span className={isActive ? 'text-primary font-semibold' : 'text-gray-400'}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
