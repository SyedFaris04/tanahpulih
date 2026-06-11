import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
      {/* Paddy field background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay for paddy field effect */}
        <div className="w-full h-full" style={{
          background: 'linear-gradient(180deg, #1B5E20 0%, #2E7D32 30%, #388E3C 50%, #4CAF50 70%, #81C784 85%, #A5D6A7 100%)'
        }} />
        {/* Paddy stalks SVG pattern */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 390 280" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
          {/* Row of paddy stalks */}
          {[...Array(20)].map((_, i) => (
            <g key={i} transform={`translate(${i * 22 - 5}, 0)`}>
              <line x1="11" y1="280" x2="11" y2="140" stroke="#2E7D32" strokeWidth="2" opacity="0.8"/>
              <line x1="11" y1="200" x2="5" y2="170" stroke="#388E3C" strokeWidth="1.5" opacity="0.7"/>
              <line x1="11" y1="200" x2="17" y2="165" stroke="#388E3C" strokeWidth="1.5" opacity="0.7"/>
              <ellipse cx="11" cy="135" rx="3" ry="12" fill="#4CAF50" opacity="0.9"/>
              <ellipse cx="5" cy="163" rx="2" ry="9" fill="#66BB6A" opacity="0.8" transform="rotate(-15 5 163)"/>
              <ellipse cx="17" cy="158" rx="2" ry="9" fill="#66BB6A" opacity="0.8" transform="rotate(15 17 158)"/>
            </g>
          ))}
          {/* Second row, offset */}
          {[...Array(20)].map((_, i) => (
            <g key={`b${i}`} transform={`translate(${i * 22 + 11}, 30)`}>
              <line x1="11" y1="250" x2="11" y2="150" stroke="#388E3C" strokeWidth="1.8" opacity="0.6"/>
              <ellipse cx="11" cy="145" rx="2.5" ry="10" fill="#43A047" opacity="0.7"/>
            </g>
          ))}
        </svg>
        {/* Warm overlay from bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(27,94,32,0.6) 0%, rgba(46,125,50,0.2) 40%, rgba(0,0,0,0.3) 100%)'
        }}/>
      </div>

      {/* Status bar area */}
      <div className="relative z-10 w-full pt-12 flex justify-between px-6">
        <span className="text-xs font-semibold text-white opacity-80">9:41</span>
        <div className="flex items-center gap-1.5 text-white opacity-80">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="6" width="2" height="6"/><rect x="3" y="4" width="2" height="8"/><rect x="6" y="2" width="2" height="10"/><rect x="9" y="0" width="2" height="12"/></svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4a7.5 7.5 0 0 1 10 0M3 6.5a4.5 4.5 0 0 1 6 0M5 9a1.5 1.5 0 0 1 2 0"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="2" width="13" height="8" rx="2" stroke="currentColor" fill="none" strokeWidth="1.2"/><rect x="1" y="3" width="11" height="6" rx="1" fill="currentColor"/><rect x="13" y="4.5" width="2" height="3" rx="1" fill="currentColor"/></svg>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8">
        <div className="animate-fade-in-up" style={{ animationDuration: '0.6s' }}>
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto border-2 border-white/30"
               style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.15)"/>
              {/* Leaf */}
              <path d="M26 8 C14 14 10 26 16 36 C20 42 26 44 26 44 C26 44 32 42 36 36 C42 26 38 14 26 8Z" fill="#A5D6A7" stroke="white" strokeWidth="1.5"/>
              {/* Vein */}
              <path d="M26 10 C26 10 26 35 26 44" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M26 18 C22 22 18 26 16 30" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
              <path d="M26 18 C30 22 34 26 36 30" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
              {/* Paddy grain */}
              <ellipse cx="26" cy="12" rx="4" ry="6" fill="#FFD54F" transform="rotate(0 26 12)"/>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-white text-center mb-3" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            TanahPulih
          </h1>
          <p className="text-white/85 text-center text-[15px] leading-relaxed font-medium">
            Smart Paddy Monitoring<br />for Better Harvest
          </p>
        </div>
      </div>

      {/* Bottom button */}
      <div className="relative z-10 w-full px-8 pb-14 animate-fade-in-up animate-delay-3">
        <button
          onClick={() => navigate('/onboarding/1')}
          className="w-full py-4 bg-white rounded-2xl text-primary font-bold text-[15px] shadow-lg active:scale-98 transition-transform"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
