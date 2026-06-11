import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, BarChart2, Bell, MessageCircle, Droplets, Wind, CloudRain, Leaf } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { weatherData, fieldStatus, farmerProfile } from '../data/mockData'

function CircularProgress({ percent, size = 80, strokeWidth = 7, color = '#2E7D32' }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E8F5E9" strokeWidth={strokeWidth}/>
      <circle
        cx={size/2} cy={size/2} r={radius}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  )
}

function QuickAction({ icon: Icon, label, color, bgColor, onClick }) {
  return (
    <button
      className="flex flex-col items-center gap-2 flex-1"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bgColor }}>
        <Icon size={22} color={color} strokeWidth={2}/>
      </div>
      <span className="text-xs text-gray-600 font-medium text-center leading-tight">{label}</span>
    </button>
  )
}

function FieldSummaryBar({ label, percent, color }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full" style={{ background: color }}/>
      <span className="text-xs text-gray-600 w-28">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${percent}%`, background: color }}/>
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{percent}%</span>
    </div>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[15px] font-semibold text-gray-800">Good Morning,</p>
              <span className="text-base">🌤️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Ahmad</h2>
          </div>
          <button onClick={() => navigate('/profile')}>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-primary overflow-hidden">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="#E8F5E9"/>
                <circle cx="14" cy="11" r="5" fill="#4CAF50"/>
                <path d="M4 24 C4 18 24 18 24 24" fill="#4CAF50"/>
              </svg>
            </div>
          </button>
        </div>

        <div className="px-4 space-y-3">
          {/* Weather Card */}
          <div className="card p-4" style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-4xl font-bold text-white">{weatherData.temperature}°C</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">☀️</span>
                  <span className="text-white/90 font-medium text-sm">{weatherData.condition}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Droplets size={14} color="rgba(255,255,255,0.9)"/>
                  <span className="text-white/90 text-sm font-medium">Humidity <span className="font-bold">{weatherData.humidity}%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CloudRain size={14} color="rgba(255,255,255,0.9)"/>
                  <span className="text-white/90 text-sm font-medium">Rain <span className="font-bold">{weatherData.rainProbability}%</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Field Status Card */}
          <div className="card p-4">
            <p className="text-xs text-gray-500 font-medium mb-3">Current Field Status</p>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-healthy-green animate-pulse"/>
                  <h3 className="text-2xl font-bold text-gray-900">{fieldStatus.overall}</h3>
                </div>
                <div className="flex gap-4 mt-3">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">NDVI Score</p>
                    <p className="text-lg font-bold text-primary">{fieldStatus.ndvi}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">Last Updated</p>
                    <p className="text-sm font-semibold text-gray-700">{fieldStatus.lastUpdated}</p>
                  </div>
                </div>
              </div>
              {/* Circular Progress */}
              <div className="relative">
                <CircularProgress percent={fieldStatus.healthyPercent} size={76} strokeWidth={7}/>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-primary">{fieldStatus.healthyPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</p>
            <div className="flex gap-3">
              <QuickAction icon={Camera} label="Scan Leaf" color="#2E7D32" bgColor="#E8F5E9" onClick={() => navigate('/scan')}/>
              <QuickAction icon={BarChart2} label="Crop Status" color="#1976D2" bgColor="#E3F2FD" onClick={() => navigate('/crop-status')}/>
              <QuickAction icon={Bell} label="Alerts" color="#E53935" bgColor="#FFEBEE" onClick={() => navigate('/alerts')}/>
              <QuickAction icon={MessageCircle} label="Ask AI" color="#7B1FA2" bgColor="#F3E5F5" onClick={() => navigate('/assistant')}/>
            </div>
          </div>

          {/* Field Summary */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Field Summary</p>
              <button
                className="text-xs text-primary font-medium"
                onClick={() => navigate('/crop-status')}
              >View Map →</button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <FieldSummaryBar label="Healthy" percent={fieldStatus.healthyPercent} color="#43A047"/>
                <FieldSummaryBar label="Moderate Stress" percent={fieldStatus.moderatePercent} color="#FB8C00"/>
                <FieldSummaryBar label="Severe Stress" percent={fieldStatus.severePercent} color="#E53935"/>
              </div>
              <div className="w-px bg-gray-100"/>
              <div className="flex-1">
                <FieldSummaryBar label="Nitrogen" percent={fieldStatus.nitrogenPercent} color="#9C27B0"/>
                <FieldSummaryBar label="Water" percent={fieldStatus.waterPercent} color="#1976D2"/>
              </div>
            </div>
          </div>

          {/* Recent Alerts Preview */}
          <div className="card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Recent Alerts</p>
              <button
                className="text-xs text-primary font-medium"
                onClick={() => navigate('/alerts')}
              >View All →</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CloudRain size={16} color="#2196F3"/>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Heavy Rain Forecast</p>
                  <p className="text-xs text-gray-500">Expected tomorrow</p>
                </div>
                <span className="text-[10px] text-blue-500 font-medium">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-red-50">
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                  <Leaf size={16} color="#E53935"/>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Possible Fungal Infection</p>
                  <p className="text-xs text-gray-500">Field B</p>
                </div>
                <span className="text-[10px] text-red-500 font-medium">4h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
