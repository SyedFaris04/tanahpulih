import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './pages/SplashScreen'
import OnboardingScreen from './pages/OnboardingScreen'
import LoginScreen from './pages/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import CropStatusScreen from './pages/CropStatusScreen'
import ScanLeafScreen from './pages/ScanLeafScreen'
import DiagnosisScreen from './pages/DiagnosisScreen'
import AlertsScreen from './pages/AlertsScreen'
import AssistantScreen from './pages/AssistantScreen'
import RecommendationsScreen from './pages/RecommendationsScreen'
import ProfileScreen from './pages/ProfileScreen'
import SettingsScreen from './pages/SettingsScreen'
import NotificationsScreen from './pages/NotificationsScreen'
import StakeholderScreen from './pages/StakeholderScreen'

export default function App() {
  return (
    <div className="phone-frame">
      <div className="screen-container">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding/:step" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/crop-status" element={<CropStatusScreen />} />
          <Route path="/scan" element={<ScanLeafScreen />} />
          <Route path="/diagnosis" element={<DiagnosisScreen />} />
          <Route path="/alerts" element={<AlertsScreen />} />
          <Route path="/assistant" element={<AssistantScreen />} />
          <Route path="/recommendations" element={<RecommendationsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/stakeholder" element={<StakeholderScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
