import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Camera, Bell, MessageCircle, User } from 'lucide-react'

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/scan', label: 'Scan', icon: Camera },
  { path: '/alerts', label: 'Alerts', icon: Bell },
  { path: '/assistant', label: 'Assistant', icon: MessageCircle },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
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
