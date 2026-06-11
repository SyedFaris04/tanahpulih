import React, { useState } from 'react'
import { CloudRain, Leaf, Droplets, Sun, RefreshCw, Bell, Wind, Thermometer, Bug, FlaskConical } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

// Full alert list — more items so "View All" is meaningful
const ALL_ALERTS = [
  {
    id: 1, type: 'weather', icon: 'rain',
    title: 'Heavy Rain Forecast',
    description: 'Expected tomorrow afternoon — 25mm rainfall predicted',
    risk: 'Medium', time: '2h ago',
    color: '#2196F3', bgColor: '#E3F2FD',
  },
  {
    id: 2, type: 'disease', icon: 'leaf',
    title: 'Possible Fungal Infection',
    description: 'Field B — Brown spot symptoms detected. Please inspect.',
    risk: 'High', time: '4h ago',
    color: '#E53935', bgColor: '#FFEBEE',
  },
  {
    id: 3, type: 'field', icon: 'nitrogen',
    title: 'Nitrogen Deficiency',
    description: 'Field A — Apply nitrogen fertilizer within 3–5 days',
    risk: 'Low', time: '6h ago',
    color: '#FB8C00', bgColor: '#FFF3E0',
  },
  {
    id: 4, type: 'weather', icon: 'sun',
    title: 'High UV Index Alert',
    description: 'UV index 8 today — monitor crop heat stress',
    risk: 'Low', time: '8h ago',
    color: '#FB8C00', bgColor: '#FFF3E0',
  },
  {
    id: 5, type: 'weather', icon: 'wind',
    title: 'Strong Wind Warning',
    description: 'Wind speed 45 km/h expected — secure young plants',
    risk: 'Medium', time: '10h ago',
    color: '#0288D1', bgColor: '#E1F5FE',
  },
  {
    id: 6, type: 'disease', icon: 'bug',
    title: 'Pest Activity Detected',
    description: 'Field C — Brown planthopper signs observed near edge rows',
    risk: 'High', time: '12h ago',
    color: '#E53935', bgColor: '#FFEBEE',
  },
  {
    id: 7, type: 'field', icon: 'water',
    title: 'Water Level Low',
    description: 'Field B irrigation water level below optimal threshold',
    risk: 'Medium', time: '1d ago',
    color: '#0288D1', bgColor: '#E1F5FE',
  },
  {
    id: 8, type: 'field', icon: 'temp',
    title: 'Soil Temperature High',
    description: 'Field A soil temp at 34°C — consider irrigation',
    risk: 'Low', time: '1d ago',
    color: '#FB8C00', bgColor: '#FFF3E0',
  },
  {
    id: 9, type: 'system', icon: 'update',
    title: 'Satellite Data Updated',
    description: 'New NDVI scan available for all fields',
    risk: null, time: '1d ago',
    color: '#2E7D32', bgColor: '#E8F5E9',
  },
  {
    id: 10, type: 'system', icon: 'flask',
    title: 'Soil Report Ready',
    description: 'Monthly soil nutrient analysis report is available',
    risk: null, time: '2d ago',
    color: '#7B1FA2', bgColor: '#F3E5F5',
  },
]

const PREVIEW_COUNT = 4   // show this many before "View All"

const categories = ['All', 'Weather', 'Disease', 'Field', 'System']

const iconMap = {
  rain:     CloudRain,
  leaf:     Leaf,
  nitrogen: Droplets,
  sun:      Sun,
  update:   RefreshCw,
  wind:     Wind,
  bug:      Bug,
  water:    Droplets,
  temp:     Thermometer,
  flask:    FlaskConical,
}

function AlertCard({ alert }) {
  const Icon = iconMap[alert.icon] || Bell
  return (
    <div className="card p-3.5 flex items-start gap-3">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
           style={{ background: alert.bgColor }}>
        <Icon size={18} color={alert.color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900 leading-tight">{alert.title}</p>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap flex-shrink-0">{alert.time}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{alert.description}</p>
        {alert.risk && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[10px] text-gray-400 font-medium">Risk:</span>
            <span className={`text-[11px] font-bold ${
              alert.risk === 'High' ? 'text-red-500'
              : alert.risk === 'Medium' ? 'text-orange-500'
              : 'text-green-600'
            }`}>
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
  const [showAll, setShowAll] = useState(false)

  const filtered = activeCategory === 'All'
    ? ALL_ALERTS
    : ALL_ALERTS.filter(a => a.type.toLowerCase() === activeCategory.toLowerCase())

  // Reset showAll when category changes
  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  const visible = showAll ? filtered : filtered.slice(0, PREVIEW_COUNT)
  const hiddenCount = filtered.length - PREVIEW_COUNT

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-3">
          <h1 className="text-xl font-bold text-gray-900">Alerts</h1>
          <p className="text-xs text-gray-500 mt-0.5">{filtered.length} alerts {activeCategory !== 'All' ? `in ${activeCategory}` : 'total'}</p>
        </div>

        {/* Category tabs */}
        <div className="px-4 mb-3">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => {
              const count = cat === 'All' ? ALL_ALERTS.length
                : ALL_ALERTS.filter(a => a.type.toLowerCase() === cat.toLowerCase()).length
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 flex items-center gap-1"
                  style={{
                    background: activeCategory === cat ? '#2E7D32' : 'white',
                    color: activeCategory === cat ? 'white' : '#6B7280',
                    boxShadow: activeCategory === cat
                      ? '0 2px 8px rgba(46,125,50,0.25)'
                      : '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {cat}
                  <span
                    className="text-[10px] font-bold px-1 py-0.5 rounded-full min-w-[16px] text-center"
                    style={{
                      background: activeCategory === cat ? 'rgba(255,255,255,0.25)' : '#F3F4F6',
                      color: activeCategory === cat ? 'white' : '#6B7280',
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Alert cards */}
        <div className="px-4 space-y-2.5">
          {visible.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Bell size={40} color="#D1D5DB" className="mx-auto mb-3" />
              <p className="text-gray-400 font-medium text-sm">No alerts in this category</p>
            </div>
          )}
        </div>

        {/* View All / Show Less button */}
        {filtered.length > PREVIEW_COUNT && (
          <div className="px-4 mt-3 mb-4">
            <button
              onClick={() => setShowAll(v => !v)}
              className="w-full py-3 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 active:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              {showAll ? (
                <>Show Less</>
              ) : (
                <>View All Alerts <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: '#2E7D32' }}>+{hiddenCount} more</span></>
              )}
            </button>
          </div>
        )}

        {filtered.length > 0 && filtered.length <= PREVIEW_COUNT && (
          <div className="pb-4" />
        )}
      </div>
      <BottomNav />
    </div>
  )
}
