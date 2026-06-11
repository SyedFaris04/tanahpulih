import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CloudRain, Leaf, Droplets, Sun, RefreshCw, Bell, Wind, Bug, Thermometer, FlaskConical, Check, CheckCheck } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const NOTIFICATIONS = [
  {
    id: 1, type: 'disease', icon: 'leaf', read: false,
    title: 'Brown Spot Disease Detected',
    body: 'AI scan detected Brown Spot Disease in Field B with 92% confidence. Immediate action recommended.',
    time: '2 min ago', date: 'Today',
    color: '#E53935', bgColor: '#FFEBEE',
  },
  {
    id: 2, type: 'weather', icon: 'rain', read: false,
    title: 'Heavy Rain Tomorrow',
    body: 'Rainfall of 25mm expected tomorrow afternoon. Avoid fertilizer application today.',
    time: '1h ago', date: 'Today',
    color: '#2196F3', bgColor: '#E3F2FD',
  },
  {
    id: 3, type: 'field', icon: 'nitrogen', read: false,
    title: 'Nitrogen Level Low',
    body: 'Field A nitrogen levels are below optimal. Apply urea fertilizer within 3–5 days for best results.',
    time: '3h ago', date: 'Today',
    color: '#FB8C00', bgColor: '#FFF3E0',
  },
  {
    id: 4, type: 'system', icon: 'update', read: true,
    title: 'Satellite Scan Complete',
    body: 'New NDVI data is available for all your fields. Current average NDVI: 0.81 — Healthy.',
    time: '6h ago', date: 'Today',
    color: '#2E7D32', bgColor: '#E8F5E9',
  },
  {
    id: 5, type: 'weather', icon: 'wind', read: true,
    title: 'Strong Wind Advisory',
    body: 'Wind speeds of 45 km/h expected this evening. Secure young plants and check field drainage.',
    time: '9h ago', date: 'Today',
    color: '#0288D1', bgColor: '#E1F5FE',
  },
  {
    id: 6, type: 'disease', icon: 'bug', read: true,
    title: 'Pest Activity Warning',
    body: 'Brown planthopper activity detected near Field C edge rows. Monitor closely and consider targeted treatment.',
    time: 'Yesterday', date: 'Yesterday',
    color: '#E53935', bgColor: '#FFEBEE',
  },
  {
    id: 7, type: 'field', icon: 'temp', read: true,
    title: 'Soil Temperature Alert',
    body: 'Field A soil temperature reached 34°C. Consider irrigation to cool the root zone and protect yield.',
    time: 'Yesterday', date: 'Yesterday',
    color: '#FB8C00', bgColor: '#FFF3E0',
  },
  {
    id: 8, type: 'system', icon: 'flask', read: true,
    title: 'Monthly Soil Report Ready',
    body: 'Your monthly soil nutrient analysis report for May 2024 is ready. Tap to view full report.',
    time: '2 days ago', date: 'This Week',
    color: '#7B1FA2', bgColor: '#F3E5F5',
  },
  {
    id: 9, type: 'weather', icon: 'sun', read: true,
    title: 'High UV Index Today',
    body: 'UV index reached 8 this afternoon. Monitor crop stress levels and ensure adequate water supply.',
    time: '2 days ago', date: 'This Week',
    color: '#FB8C00', bgColor: '#FFF3E0',
  },
  {
    id: 10, type: 'system', icon: 'update', read: true,
    title: 'App Updated to v1.0.1',
    body: 'TanahPulih has been updated with improved disease detection accuracy and faster satellite sync.',
    time: '3 days ago', date: 'This Week',
    color: '#2E7D32', bgColor: '#E8F5E9',
  },
]

const iconMap = {
  rain: CloudRain, leaf: Leaf, nitrogen: Droplets,
  sun: Sun, update: RefreshCw, wind: Wind,
  bug: Bug, water: Droplets, temp: Thermometer, flask: FlaskConical,
}

export default function NotificationsScreen() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState('all')

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })))
  const markRead = (id) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x))

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter(n => !n.read)

  const unreadCount = notifications.filter(n => !n.read).length

  // Group by date label
  const groups = filtered.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = []
    acc[n.date].push(n)
    return acc
  }, {})

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="px-4 pt-1 pb-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/profile')} className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft size={22} color="#212121" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-400">{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-primary font-semibold py-1 px-2"
            >
              <CheckCheck size={13} />
              Mark all read
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeTab === tab.key ? '#2E7D32' : '#F3F4F6',
                color: activeTab === tab.key ? 'white' : '#6B7280',
              }}
            >
              {tab.label}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: activeTab === tab.key ? 'rgba(255,255,255,0.25)' : '#E5E7EB',
                  color: activeTab === tab.key ? 'white' : '#6B7280',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto" style={{ background: '#F8F9F4' }}>
        {Object.keys(groups).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell size={28} color="#D1D5DB" />
            </div>
            <p className="text-gray-400 font-medium text-sm">No unread notifications</p>
            <button
              onClick={() => setActiveTab('all')}
              className="text-primary text-sm font-semibold"
            >
              View all notifications
            </button>
          </div>
        ) : (
          Object.entries(groups).map(([date, items]) => (
            <div key={date}>
              {/* Date group header */}
              <div className="px-4 py-2 sticky top-0 z-10" style={{ background: '#F8F9F4' }}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{date}</p>
              </div>

              <div className="px-4 space-y-2 pb-2">
                {items.map(notif => {
                  const Icon = iconMap[notif.icon] || Bell
                  return (
                    <button
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className="w-full text-left card p-3.5 flex items-start gap-3 transition-all active:scale-[0.99]"
                      style={{ opacity: notif.read ? 0.75 : 1 }}
                    >
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                             style={{ background: notif.bgColor }}>
                          <Icon size={18} color={notif.color} />
                        </div>
                        {/* Unread dot */}
                        {!notif.read && (
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-2 border-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-tight ${notif.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                          {notif.body}
                        </p>
                        {/* Type badge */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize"
                            style={{ background: notif.bgColor, color: notif.color }}
                          >
                            {notif.type}
                          </span>
                          {notif.read && (
                            <span className="flex items-center gap-0.5 text-[10px] text-gray-300 font-medium">
                              <Check size={10} />
                              Read
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
        <div className="pb-6" />
      </div>
    </div>
  )
}
