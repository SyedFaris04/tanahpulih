import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, MapPin, Settings, LogOut, BarChart2, Bell, Heart } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { farmerProfile } from '../data/mockData'

function StatCard({ label, value, color }) {
  return (
    <div className="flex-1 text-center p-3 card">
      <p className="text-xl font-bold" style={{ color: color || '#2E7D32' }}>{value}</p>
      <p className="text-[10px] text-gray-500 font-medium mt-0.5">{label}</p>
    </div>
  )
}

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-green-light flex items-center justify-center">
          <Icon size={14} color="#2E7D32" />
        </div>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
      </div>
      <span className="text-sm text-gray-800 font-semibold">{value}</span>
    </div>
  )
}

function SettingRow({ icon: Icon, label, iconBg, iconColor, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
             style={{ background: iconBg || (danger ? '#FFEBEE' : '#F8F9F4') }}>
          <Icon size={16} color={iconColor || (danger ? '#E53935' : '#6B7280')} />
        </div>
        <span className={`text-sm font-medium ${danger ? 'text-alert-red' : 'text-gray-800'}`}>{label}</span>
      </div>
      <ChevronRight size={16} color={danger ? '#E53935' : '#9CA3AF'} />
    </button>
  )
}

export default function ProfileScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-4">
          <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
        </div>

        <div className="px-4 space-y-3">
          {/* Profile card */}
          <div className="card p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
                   style={{ border: '3px solid #2E7D32' }}>
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#E8F5E9" />
                    <circle cx="24" cy="19" r="8" fill="#66BB6A" />
                    <path d="M8 42 C8 30 40 30 40 42" fill="#66BB6A" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{farmerProfile.name}</h2>
                <p className="text-sm text-gray-500">{farmerProfile.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} color="#6B7280" />
                  <p className="text-xs text-gray-500">{farmerProfile.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <StatCard label="Total Scans" value={farmerProfile.stats.totalScans} color="#1976D2" />
            <StatCard label="Total Alerts" value={farmerProfile.stats.totalAlerts} color="#E53935" />
            <StatCard label="Health Score" value={`${farmerProfile.stats.healthScore}%`} color="#2E7D32" />
          </div>

          {/* Farm info */}
          <div className="card p-4">
            <p className="text-sm font-bold text-gray-800 mb-3">Farm Information</p>
            <ProfileRow icon={BarChart2} label="Farm Size" value={farmerProfile.farmSize} />
            <ProfileRow icon={Heart} label="Rice Variety" value={farmerProfile.riceVariety} />
            <ProfileRow icon={Bell} label="Planting Date" value={farmerProfile.plantingDate} />
          </div>

          {/* Settings & actions */}
          <div className="card p-4">
            <p className="text-sm font-bold text-gray-800 mb-2">Account</p>
            <SettingRow
              icon={Settings}
              label="Settings"
              iconBg="#F3F4F6"
              iconColor="#6B7280"
              onClick={() => navigate('/settings')}
            />
            <SettingRow
              icon={Bell}
              label="Notifications"
              iconBg="#FFF3E0"
              iconColor="#FB8C00"
              onClick={() => navigate('/notifications')}
            />
            <SettingRow
              icon={LogOut}
              label="Logout"
              danger
              onClick={() => navigate('/')}
            />
          </div>

          {/* Stakeholder access */}
          <div className="card p-4 mb-4"
               style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">Stakeholder View</p>
                <p className="text-white/70 text-xs mt-0.5">Access analytics dashboard</p>
              </div>
              <button
                onClick={() => navigate('/stakeholder')}
                className="px-4 py-2 bg-white rounded-xl text-primary text-xs font-bold"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
