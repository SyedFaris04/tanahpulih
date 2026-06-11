import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Bell, Globe, Moon, Shield, Smartphone, Info, Trash2, HelpCircle } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none"
      style={{
        width: 44, height: 24,
        background: on ? '#2E7D32' : '#D1D5DB',
      }}
    >
      <span
        className="inline-block rounded-full bg-white shadow transition-transform duration-200"
        style={{
          width: 18, height: 18,
          transform: on ? 'translateX(22px)' : 'translateX(2px)',
        }}
      />
    </button>
  )
}

function SettingRow({ icon: Icon, iconBg, iconColor, label, subtitle, rightEl, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 px-1 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
           style={{ background: iconBg || '#F3F4F6' }}>
        <Icon size={17} color={iconColor || '#6B7280'} strokeWidth={2} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold" style={{ color: danger ? '#E53935' : '#111827' }}>{label}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {rightEl || (onClick && <ChevronRight size={15} color="#9CA3AF" />)}
    </button>
  )
}

export default function SettingsScreen() {
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    pushNotifications: true,
    alertNotifications: true,
    weatherAlerts: true,
    diseaseAlerts: true,
    weeklyReport: false,
    darkMode: false,
    language: 'English',
    units: 'Metric',
    locationAccess: true,
    cameraAccess: true,
    dataSync: true,
  })

  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }))

  const [showLangPicker, setShowLangPicker] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="px-4 pt-2 pb-3 flex items-center gap-3 border-b border-gray-100 flex-shrink-0">
        <button onClick={() => navigate('/profile')} className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft size={22} color="#212121" strokeWidth={2.5} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#F8F9F4' }}>
        <div className="px-4 py-3 space-y-3">

          {/* Notifications */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Notifications</p>
            <div className="card px-3 py-1">
              <SettingRow
                icon={Bell} iconBg="#E8F5E9" iconColor="#2E7D32"
                label="Push Notifications"
                subtitle="Receive app notifications"
                rightEl={<Toggle on={settings.pushNotifications} onChange={v => set('pushNotifications', v)} />}
              />
              <SettingRow
                icon={Bell} iconBg="#FFF3E0" iconColor="#FB8C00"
                label="Alert Notifications"
                subtitle="Crop stress & disease alerts"
                rightEl={<Toggle on={settings.alertNotifications} onChange={v => set('alertNotifications', v)} />}
              />
              <SettingRow
                icon={Bell} iconBg="#E3F2FD" iconColor="#1976D2"
                label="Weather Alerts"
                subtitle="Rain & weather warnings"
                rightEl={<Toggle on={settings.weatherAlerts} onChange={v => set('weatherAlerts', v)} />}
              />
              <SettingRow
                icon={Bell} iconBg="#FFEBEE" iconColor="#E53935"
                label="Disease Alerts"
                subtitle="Leaf disease detections"
                rightEl={<Toggle on={settings.diseaseAlerts} onChange={v => set('diseaseAlerts', v)} />}
              />
              <SettingRow
                icon={Bell} iconBg="#F3E5F5" iconColor="#7B1FA2"
                label="Weekly Report"
                subtitle="Summary every Monday"
                rightEl={<Toggle on={settings.weeklyReport} onChange={v => set('weeklyReport', v)} />}
              />
            </div>
          </div>

          {/* Appearance */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Appearance</p>
            <div className="card px-3 py-1">
              <SettingRow
                icon={Moon} iconBg="#E8EAF6" iconColor="#3949AB"
                label="Dark Mode"
                subtitle="Switch to dark theme"
                rightEl={<Toggle on={settings.darkMode} onChange={v => set('darkMode', v)} />}
              />
              <SettingRow
                icon={Globe} iconBg="#E0F7FA" iconColor="#00838F"
                label="Language"
                subtitle={settings.language}
                onClick={() => setShowLangPicker(!showLangPicker)}
              />
              {showLangPicker && (
                <div className="mb-2 mt-1 rounded-xl overflow-hidden border border-gray-100">
                  {['English', 'Bahasa Melayu', 'தமிழ்', '中文'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => { set('language', lang); setShowLangPicker(false) }}
                      className="w-full px-4 py-2.5 text-left text-sm border-b border-gray-50 last:border-0 transition-colors"
                      style={{
                        background: settings.language === lang ? '#E8F5E9' : 'white',
                        color: settings.language === lang ? '#2E7D32' : '#374151',
                        fontWeight: settings.language === lang ? 700 : 500,
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
              <SettingRow
                icon={Smartphone} iconBg="#E8F5E9" iconColor="#2E7D32"
                label="Units"
                subtitle={settings.units}
                onClick={() => set('units', settings.units === 'Metric' ? 'Imperial' : 'Metric')}
              />
            </div>
          </div>

          {/* Permissions */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Permissions</p>
            <div className="card px-3 py-1">
              <SettingRow
                icon={Shield} iconBg="#E8F5E9" iconColor="#2E7D32"
                label="Location Access"
                subtitle="Used for weather data"
                rightEl={<Toggle on={settings.locationAccess} onChange={v => set('locationAccess', v)} />}
              />
              <SettingRow
                icon={Smartphone} iconBg="#E3F2FD" iconColor="#1976D2"
                label="Camera Access"
                subtitle="Required for leaf scanning"
                rightEl={<Toggle on={settings.cameraAccess} onChange={v => set('cameraAccess', v)} />}
              />
              <SettingRow
                icon={Globe} iconBg="#FFF3E0" iconColor="#FB8C00"
                label="Background Data Sync"
                subtitle="Sync satellite data automatically"
                rightEl={<Toggle on={settings.dataSync} onChange={v => set('dataSync', v)} />}
              />
            </div>
          </div>

          {/* About */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">About</p>
            <div className="card px-3 py-1">
              <SettingRow
                icon={Info} iconBg="#E8F5E9" iconColor="#2E7D32"
                label="App Version"
                subtitle="TanahPulih v1.0.0 (MVP)"
                onClick={null}
                rightEl={<span className="text-xs text-gray-400 font-medium">v1.0.0</span>}
              />
              <SettingRow
                icon={HelpCircle} iconBg="#E3F2FD" iconColor="#1976D2"
                label="Help & Support"
                subtitle="FAQs and contact us"
                onClick={() => {}}
              />
              <SettingRow
                icon={Shield} iconBg="#F3E5F5" iconColor="#7B1FA2"
                label="Privacy Policy"
                subtitle="How we use your data"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Danger zone */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Data</p>
            <div className="card px-3 py-1">
              <SettingRow
                icon={Trash2} iconBg="#FFEBEE" iconColor="#E53935"
                label="Clear Scan History"
                subtitle="Delete all saved scans"
                danger
                onClick={() => setShowClearConfirm(true)}
              />
            </div>
          </div>

          {/* Confirm modal */}
          {showClearConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 px-4 pb-8">
              <div className="w-full bg-white rounded-3xl p-5 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                  <Trash2 size={22} color="#E53935" />
                </div>
                <h3 className="text-base font-bold text-center text-gray-900 mb-1">Clear Scan History?</h3>
                <p className="text-sm text-center text-gray-500 mb-5">All saved scans and results will be permanently deleted.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 py-3 rounded-2xl text-sm font-bold text-white"
                    style={{ background: '#E53935' }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pb-6" />
        </div>
      </div>
    </div>
  )
}
