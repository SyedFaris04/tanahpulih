import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import StatusBar from '../components/StatusBar'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    navigate('/home')
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 C6 5 4 10 6 14 C8 17 10 18 10 18 C10 18 12 17 14 14 C16 10 14 5 10 2Z" fill="#4CAF50"/>
                <path d="M10 3 C10 3 10 17 10 18" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-bold text-primary text-lg">TanahPulih</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
          <p className="text-gray-500 text-sm">Login to continue</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field pr-12"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button className="text-sm text-primary font-medium">Forgot Password?</button>
          </div>

          <button onClick={handleLogin} className="btn-primary mt-2">
            Login
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 bg-white active:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 bg-white active:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect width="18" height="18" rx="4" fill="#1877F2"/>
                <path d="M12.5 9H10.5V16H8V9H6.5V7H8V5.5C8 4 8.9 3 10.5 3H12V5H11C10.4 5 10.5 5.3 10.5 5.8V7H12L12.5 9Z" fill="white"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>
        </div>

        {/* Sign up */}
        <div className="text-center mt-8">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <button className="text-sm font-semibold text-primary">Sign Up</button>
        </div>
      </div>
    </div>
  )
}
