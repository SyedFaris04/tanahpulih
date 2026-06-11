import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, TrendingUp, Map, Bell, BarChart2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts'
import StatusBar from '../components/StatusBar'
import StakeholderBottomNav from '../components/StakeholderBottomNav'
import { stakeholderData } from '../data/mockData'

function MetricCard({ label, value, icon, color, bgColor }) {
  return (
    <div className="card p-4 flex-1">
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: bgColor }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl p-2.5 shadow-lg border border-gray-100">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-bold text-primary">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export default function StakeholderScreen() {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState('Selangor')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Stakeholder Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">BERNAS Analytics Portal</p>
          </div>
        </div>

        <div className="px-4 space-y-3">
          {/* Region selector */}
          <div className="relative">
            <button
              className="w-full card p-3 flex items-center justify-between"
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
            >
              <div className="flex items-center gap-2">
                <Map size={16} color="#2E7D32"/>
                <span className="text-sm font-semibold text-gray-800">Region: {selectedRegion}</span>
              </div>
              <ChevronDown size={16} color="#6B7280" style={{ transform: showRegionDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}/>
            </button>
            {showRegionDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 z-10 overflow-hidden">
                {stakeholderData.regions.map(region => (
                  <button
                    key={region}
                    className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    style={{ color: selectedRegion === region ? '#2E7D32' : '#212121' }}
                    onClick={() => { setSelectedRegion(region); setShowRegionDropdown(false) }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metric cards */}
          <div className="flex gap-3">
            <MetricCard
              label="Total Farms"
              value={stakeholderData.totalFarms}
              icon={<Map size={16} color="#1976D2"/>}
              bgColor="#E3F2FD"
            />
            <MetricCard
              label="Total Alerts"
              value={stakeholderData.totalAlerts}
              icon={<Bell size={16} color="#E53935"/>}
              bgColor="#FFEBEE"
            />
          </div>

          {/* Average health score */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-700">Average Health Score</p>
              <div className="flex items-center gap-1">
                <TrendingUp size={13} color="#43A047"/>
                <span className="text-xs text-healthy-green font-semibold">+6% vs last month</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-primary mb-4">{stakeholderData.avgHealthScore}%</p>
            <ResponsiveContainer width="100%" height={90}>
              <LineChart data={stakeholderData.healthTrend}>
                <Line type="monotone" dataKey="score" stroke="#2E7D32" strokeWidth={2.5} dot={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip />}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts by type — pie chart */}
          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Alerts by Type</p>
            <div className="flex items-center gap-4">
              <PieChart width={120} height={120}>
                <Pie
                  data={stakeholderData.alertsByType}
                  cx={55} cy={55}
                  innerRadius={30}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {stakeholderData.alertsByType.map((entry, i) => (
                    <Cell key={i} fill={entry.color}/>
                  ))}
                </Pie>
              </PieChart>
              <div className="flex-1 space-y-2">
                {stakeholderData.alertsByType.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }}/>
                    <span className="text-xs text-gray-600 flex-1">{item.name}</span>
                    <span className="text-xs font-bold text-gray-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional table */}
          <div className="card p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Regional Overview</p>
            <div className="space-y-2">
              {/* Header */}
              <div className="flex gap-2 text-[10px] font-semibold text-gray-400 px-1">
                <span className="flex-1">Region</span>
                <span className="w-12 text-right">Farms</span>
                <span className="w-16 text-right">Health</span>
                <span className="w-14 text-right">Alerts</span>
              </div>
              {stakeholderData.farmsData.map((row, i) => (
                <div key={i} className="flex gap-2 items-center p-2.5 rounded-xl" style={{ background: '#F8F9F4' }}>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"/>
                    <span className="text-sm font-medium text-gray-800">{row.region}</span>
                  </div>
                  <span className="w-12 text-right text-sm font-semibold text-gray-700">{row.farms}</span>
                  <span className="w-16 text-right text-sm font-bold text-primary">{row.healthy}%</span>
                  <span className="w-14 text-right text-sm font-semibold text-alert-red">{row.alerts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StakeholderBottomNav />
    </div>
  )
}
