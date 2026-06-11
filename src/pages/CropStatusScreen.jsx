import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, TrendingUp, TrendingDown } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine,
} from 'recharts'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { cropStatusData } from '../data/mockData'

/* ── Farm Map ─────────────────────────────────────────────────── */
function FarmMap() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 200 }}>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg,#81C784 0%,#A5D6A7 40%,#66BB6A 100%)',
      }} />

      {/* Field A – Healthy */}
      <div className="absolute flex items-center justify-center"
           style={{ left: '8%', top: '14%', width: '35%', height: '44%',
                    background: 'rgba(76,175,80,0.85)', border: '2px solid rgba(46,125,50,0.55)',
                    borderRadius: 10 }}>
        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>Field A</span>
      </div>

      {/* Field B – Moderate */}
      <div className="absolute flex items-center justify-center"
           style={{ right: '9%', top: '11%', width: '33%', height: '42%',
                    background: 'rgba(255,193,7,0.82)', border: '2px solid rgba(245,124,0,0.55)',
                    borderRadius: 10 }}>
        <span style={{ color: '#333', fontSize: 11, fontWeight: 700 }}>Field B</span>
      </div>

      {/* Field C – Healthy */}
      <div className="absolute flex items-center justify-center"
           style={{ left: '14%', bottom: '9%', width: '28%', height: '34%',
                    background: 'rgba(76,175,80,0.82)', border: '2px solid rgba(46,125,50,0.5)',
                    borderRadius: 10 }}>
        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>Field C</span>
      </div>

      {/* Critical patch inside Field B */}
      <div className="absolute"
           style={{ right: '14%', bottom: '17%', width: '20%', height: '26%',
                    background: 'rgba(229,57,53,0.76)', border: '2px solid rgba(183,28,28,0.5)',
                    borderRadius: 8 }} />

      {/* Compass */}
      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
        <span style={{ fontSize: 10, fontWeight: 800, color: '#333' }}>N</span>
      </div>

      {/* Pin */}
      <div className="absolute" style={{ left: '24%', top: '28%' }}>
        <div className="w-4 h-4 rounded-full bg-white shadow flex items-center justify-center">
          <div className="w-2 h-2 rounded-full" style={{ background: '#2E7D32' }} />
        </div>
      </div>

      {/* Scale */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1">
        <div className="w-7 h-0.5 bg-white/70" />
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>100m</span>
      </div>
    </div>
  )
}

/* ── Vegetation metric card ───────────────────────────────────── */
function VegCard({ label, value, change, positive }) {
  return (
    <div className="card p-3 flex-1">
      <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-1 mt-0.5">
        {positive
          ? <TrendingUp size={11} color="#43A047" />
          : <TrendingDown size={11} color="#E53935" />}
        <span className={`text-[10px] font-semibold ${positive ? 'text-healthy-green' : 'text-alert-red'}`}>
          {change}
        </span>
      </div>
      <p className="text-[9px] text-gray-400">vs last week</p>
    </div>
  )
}

/* ── Custom tooltip ───────────────────────────────────────────── */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'white', borderRadius: 10, padding: '6px 10px',
      boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12,
    }}>
      <p style={{ color: '#9CA3AF', marginBottom: 2 }}>{label}</p>
      <p style={{ fontWeight: 700, color: '#2E7D32' }}>{payload[0].value}</p>
    </div>
  )
}

/* ── Main screen ──────────────────────────────────────────────── */
export default function CropStatusScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('map')      // 'map' | 'index'
  const [chartView, setChartView] = useState('ndvi')   // 'ndvi' | 'evi'

  const chartData = chartView === 'ndvi' ? cropStatusData.ndviTrend : cropStatusData.eviTrend
  const chartColor = chartView === 'ndvi' ? '#2E7D32' : '#1976D2'
  const chartDomain = chartView === 'ndvi' ? [0.6, 0.9] : [0.5, 0.9]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-4 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft size={22} color="#212121" strokeWidth={2.5} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Crop Status</h1>
        </div>

        <div className="px-4 space-y-3">

          {/* ── Tab switcher ── */}
          <div className="flex gap-2">
            {(['map', 'index']).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: tab === t ? '#2E7D32' : 'white',
                  color: tab === t ? 'white' : '#6B7280',
                  boxShadow: tab === t ? '0 2px 8px rgba(46,125,50,.3)' : 'none',
                }}
              >
                {t === 'map' ? 'Map View' : 'Index View'}
              </button>
            ))}
          </div>

          {/* ══════════════ MAP VIEW ══════════════ */}
          {tab === 'map' && (
            <>
              <FarmMap />

              {/* Legend */}
              <div className="flex gap-4 justify-center">
                {[
                  { color: '#43A047', label: 'Healthy' },
                  { color: '#FB8C00', label: 'Moderate' },
                  { color: '#E53935', label: 'Critical' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
                    <span className="text-xs text-gray-600 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Field summary cards */}
              {cropStatusData.fields.map(f => (
                <div key={f.id} className="card p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{
                         background: f.status === 'healthy' ? '#E8F5E9'
                           : f.status === 'moderate' ? '#FFF3E0' : '#FFEBEE',
                       }}>
                    <span className="font-bold text-sm"
                          style={{
                            color: f.status === 'healthy' ? '#2E7D32'
                              : f.status === 'moderate' ? '#FB8C00' : '#E53935',
                          }}>
                      {f.id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800">{f.name}</p>
                      <span className={
                        f.status === 'healthy' ? 'tag-healthy'
                          : f.status === 'moderate' ? 'tag-moderate' : 'tag-critical'
                      }>
                        {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{f.area}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">NDVI</p>
                    <p className="text-sm font-bold text-gray-800">{f.ndvi}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ══════════════ INDEX VIEW ══════════════ */}
          {tab === 'index' && (
            <>
              {/* Big metric cards */}
              <div className="flex gap-3">
                <VegCard label="NDVI" value="0.81" change="+0.05" positive />
                <VegCard label="EVI"  value="0.74" change="+0.02" positive />
              </div>

              {/* What-is card */}
              <div className="card p-3" style={{ background: '#F0FDF4' }}>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-bold text-primary">NDVI</span> (Normalized Difference Vegetation Index) measures plant greenness.{' '}
                  <span className="font-bold text-blue-600">EVI</span> (Enhanced Vegetation Index) is more sensitive in dense canopy areas.{' '}
                  Values above <span className="font-bold">0.6</span> indicate healthy crops.
                </p>
              </div>

              {/* Chart sub-tabs */}
              <div className="flex gap-2">
                {(['ndvi', 'evi']).map(v => (
                  <button
                    key={v}
                    onClick={() => setChartView(v)}
                    className="flex-1 py-2 rounded-xl font-semibold text-xs transition-all"
                    style={{
                      background: chartView === v
                        ? (v === 'ndvi' ? '#2E7D32' : '#1976D2')
                        : 'white',
                      color: chartView === v ? 'white' : '#6B7280',
                    }}
                  >
                    {v.toUpperCase()} Trend
                  </button>
                ))}
              </div>

              {/* Trend chart */}
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-700">
                    {chartView === 'ndvi' ? 'NDVI' : 'EVI'} — 6 Week Trend
                  </p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: chartView === 'ndvi' ? '#E8F5E9' : '#E3F2FD',
                          color: chartView === 'ndvi' ? '#2E7D32' : '#1976D2',
                        }}>
                    {chartView === 'ndvi' ? '↑ 0.05' : '↑ 0.02'} this week
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={chartData} margin={{ left: -10, right: 4, top: 4, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis domain={chartDomain} tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={32} />
                    <Tooltip content={<ChartTip />} />
                    <ReferenceLine y={0.6} stroke="#FB8C00" strokeDasharray="4 3" strokeWidth={1} label={{ value: 'min', fontSize: 9, fill: '#FB8C00', position: 'right' }} />
                    <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2.5}
                          dot={{ fill: chartColor, r: 3.5 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Per-field index table */}
              <div className="card p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Field-by-Field Index</p>
                {/* Header row */}
                <div className="flex gap-2 mb-1 px-1">
                  <span className="flex-1 text-[10px] font-bold text-gray-400 uppercase">Field</span>
                  <span className="w-14 text-right text-[10px] font-bold text-gray-400 uppercase">NDVI</span>
                  <span className="w-14 text-right text-[10px] font-bold text-gray-400 uppercase">EVI</span>
                  <span className="w-16 text-right text-[10px] font-bold text-gray-400 uppercase">Status</span>
                </div>
                {cropStatusData.fields.map(f => (
                  <div key={f.id} className="flex gap-2 items-center py-2 border-b border-gray-50 last:border-0">
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                           style={{
                             background: f.status === 'healthy' ? '#E8F5E9'
                               : f.status === 'moderate' ? '#FFF3E0' : '#FFEBEE',
                           }}>
                        <span className="text-[10px] font-bold"
                              style={{ color: f.status === 'healthy' ? '#2E7D32' : f.status === 'moderate' ? '#FB8C00' : '#E53935' }}>
                          {f.id}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{f.name}</span>
                    </div>
                    <span className="w-14 text-right text-sm font-bold" style={{ color: '#2E7D32' }}>{f.ndvi}</span>
                    <span className="w-14 text-right text-sm font-bold" style={{ color: '#1976D2' }}>{f.evi}</span>
                    <div className="w-16 flex justify-end">
                      <span className={f.status === 'healthy' ? 'tag-healthy' : f.status === 'moderate' ? 'tag-moderate' : 'tag-critical'}>
                        {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
      <BottomNav />
    </div>
  )
}
