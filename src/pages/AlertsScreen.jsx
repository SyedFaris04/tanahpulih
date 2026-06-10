import React, { useState } from 'react'
import { CloudRain, Leaf, Droplets, Sun, RefreshCw, Bell } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { alerts } from '../data/mockData'

const categories = ['All', 'Weather', 'Disease', 'Field', 'System']

const iconMap = {
  rain: CloudRain,
  leaf: Leaf,
  nitrogen: Droplets,
  sun: Sun,
  update: RefreshCw,
}

function AlertCard({ alert }) {
  const Icon = iconMap[alert.icon] || Bell

  return (
    <div className="card p-3.5 flex items-start gap-3">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
           style={{ background: alert.bgColor }}>
        <Icon size={18} color={alert.color}/>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{alert.time}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{alert.description}</p>
        {alert.risk && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[10px] text-gray-400 font-medium">Risk:</span>
            <span className={`text-[11px] font-semibold ${alert.risk === 'High' ? 'text-alert-red' : alert.risk === 'Medium' ? 'text-warning-orange' : 'text-healthy-green'}`}>
              {alert.risk}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AlertsScreen() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? alerts
    : alerts.filter(a => a.type.toLowerCase() === activeCategory.toLowerCase())

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-4">
          <h1 className="text-xl font-bold text-gray-900">Alerts</h1>
          <p className="text-xs text-gray-500 mt-0.5">{alerts.length} active alerts</p>
        </div>

        {/* Category tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all flex-shrink-0"
                style={{
                  background: activeCategory === cat ? '#2E7D32' : 'white',
                  color: activeCategory === cat ? 'white' : '#6B7280',
                  boxShadow: activeCategory === cat ? '0 2px 8px rgba(46,125,50,0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alert cards */}
        <div className="px-4 space-y-2.5">
          {filtered.map(alert => (
            <AlertCard key={alert.id} alert={alert}/>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Bell size={40} color="#D1D5DB" className="mx-auto mb-3"/>
              <p className="text-gray-400 font-medium">No alerts in this category</p>
            </div>
          )}
        </div>

        {/* View all button */}
        {filtered.length > 0 && (
          <div className="px-4 mt-4 mb-4">
            <button className="w-full py-3 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 active:bg-gray-50">
              View All Alerts
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
