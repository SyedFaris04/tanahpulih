import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search, Droplets, CloudRain, Waves } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { recommendations } from '../data/mockData'

const iconMap = {
  inspect: Search,
  fertilize: Droplets,
  rain: CloudRain,
  drain: Waves,
}

function RecommendationCard({ rec }) {
  const Icon = iconMap[rec.icon] || Search
  const priorityColors = {
    high: { text: '#E53935', bg: '#FFEBEE' },
    medium: { text: '#FB8C00', bg: '#FFF3E0' },
    low: { text: '#43A047', bg: '#E8F5E9' },
  }
  const colors = priorityColors[rec.priorityLevel]

  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
           style={{ background: rec.iconBg }}>
        <Icon size={22} color={rec.color}/>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{rec.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{rec.description}</p>
        <div className="mt-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: colors.bg, color: colors.text }}>
            {rec.priority}
          </span>
        </div>
      </div>
      <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
        <ChevronLeft size={16} color="#9CA3AF" style={{ transform: 'rotate(180deg)' }}/>
      </button>
    </div>
  )
}

export default function RecommendationsScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft size={22} color="#212121" strokeWidth={2.5}/>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Recommendations</h1>
        </div>

        <div className="px-4 space-y-3">
          {/* Date section */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">Today's Actions</h2>
            <span className="text-xs text-gray-400">4 actions</span>
          </div>

          {/* Recommendation cards */}
          {recommendations.map(rec => (
            <RecommendationCard key={rec.id} rec={rec}/>
          ))}

          {/* Summary insight */}
          <div className="card p-4" style={{ background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white text-lg">🌾</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Farm Health Summary</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your overall farm health is <span className="font-bold text-primary">85%</span>. 
                  Focus on treating the fungal infection in Field B to prevent spreading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
