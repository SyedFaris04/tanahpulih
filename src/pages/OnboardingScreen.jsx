import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

const onboardingData = [
  {
    step: 1,
    title: 'Monitor Your Crops',
    description: 'Track crop health using satellite vegetation data in real-time.',
    illustration: 'satellite',
    buttonText: 'Next',
    nextPath: '/onboarding/2',
  },
  {
    step: 2,
    title: 'Detect Disease Early',
    description: 'Upload leaf photos and get AI-powered disease identification instantly.',
    illustration: 'leaf',
    buttonText: 'Next',
    nextPath: '/onboarding/3',
  },
  {
    step: 3,
    title: 'AI Farming Assistant',
    description: 'Ask anything about your crops and get smart recommendations from our AI assistant.',
    illustration: 'robot',
    buttonText: 'Start Farming',
    nextPath: '/login',
  },
]

function SatelliteIllustration() {
  return (
    <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Sky/space background */}
      <ellipse cx="140" cy="110" rx="130" ry="100" fill="#E8F5E9" opacity="0.5"/>
      
      {/* Farm field below */}
      <rect x="30" y="130" width="220" height="80" rx="12" fill="#A5D6A7"/>
      {/* Field grid */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={40 + i*55} y="135" width="48" height="68" rx="6" fill={i % 2 === 0 ? '#66BB6A' : '#81C784'} opacity="0.8"/>
      ))}
      {/* Field labels */}
      <text x="60" y="175" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">A</text>
      <text x="115" y="175" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">B</text>
      <text x="170" y="175" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">C</text>
      <text x="225" y="175" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">D</text>

      {/* Tablet/phone showing map */}
      <rect x="70" y="65" width="140" height="95" rx="10" fill="white" stroke="#E0E0E0" strokeWidth="1.5"/>
      <rect x="75" y="70" width="130" height="80" rx="7" fill="#C8E6C9"/>
      <rect x="80" y="75" width="58" height="35" rx="4" fill="#66BB6A"/>
      <rect x="142" y="75" width="58" height="35" rx="4" fill="#FFF176"/>
      <rect x="80" y="114" width="58" height="30" rx="4" fill="#81C784"/>
      <rect x="142" y="114" width="58" height="30" rx="4" fill="#EF9A9A"/>
      {/* NDVI overlay gradient */}
      <rect x="75" y="70" width="130" height="80" rx="7" fill="url(#ndviGrad)" opacity="0.4"/>
      <defs>
        <linearGradient id="ndviGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#F44336" stopOpacity="0.4"/>
        </linearGradient>
      </defs>

      {/* Satellite */}
      <g transform="translate(55, 20)">
        {/* Satellite body */}
        <rect x="15" y="10" width="20" height="14" rx="3" fill="#78909C"/>
        <rect x="17" y="12" width="16" height="10" rx="2" fill="#90A4AE"/>
        {/* Solar panels */}
        <rect x="0" y="12" width="12" height="10" rx="2" fill="#1565C0"/>
        <rect x="38" y="12" width="12" height="10" rx="2" fill="#1565C0"/>
        <line x1="12" y1="17" x2="15" y2="17" stroke="#90A4AE" strokeWidth="2"/>
        <line x1="35" y1="17" x2="38" y2="17" stroke="#90A4AE" strokeWidth="2"/>
        {/* Panel lines */}
        <line x1="4" y1="12" x2="4" y2="22" stroke="#1976D2" strokeWidth="1"/>
        <line x1="8" y1="12" x2="8" y2="22" stroke="#1976D2" strokeWidth="1"/>
        <line x1="42" y1="12" x2="42" y2="22" stroke="#1976D2" strokeWidth="1"/>
        <line x1="46" y1="12" x2="46" y2="22" stroke="#1976D2" strokeWidth="1"/>
        {/* Antenna */}
        <line x1="25" y1="0" x2="25" y2="10" stroke="#78909C" strokeWidth="1.5"/>
        <circle cx="25" cy="0" r="2" fill="#78909C"/>
      </g>

      {/* Signal lines from satellite to field */}
      <line x1="80" y1="44" x2="100" y2="112" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
      <line x1="80" y1="44" x2="170" y2="112" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4"/>

      {/* Signal ripples */}
      <circle cx="80" cy="44" r="8" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.6"/>
      <circle cx="80" cy="44" r="14" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.4"/>
      <circle cx="80" cy="44" r="20" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.2"/>

      {/* NDVI badge */}
      <rect x="170" y="40" width="70" height="28" rx="8" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
      <text x="205" y="52" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="500">NDVI Score</text>
      <text x="205" y="63" textAnchor="middle" fontSize="11" fill="#2E7D32" fontWeight="700">0.81</text>
    </svg>
  )
}

function LeafIllustration() {
  return (
    <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Background phone */}
      <rect x="85" y="10" width="110" height="180" rx="16" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5"/>
      <rect x="90" y="20" width="100" height="160" rx="12" fill="#1B5E20" opacity="0.9"/>
      
      {/* Leaf image in phone */}
      <ellipse cx="140" cy="95" rx="38" ry="52" fill="#4CAF50" transform="rotate(-15 140 95)"/>
      <path d="M140 45 C140 45 140 145 140 148" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
      <path d="M140 70 C130 80 118 82 115 85" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <path d="M140 70 C150 80 162 82 165 85" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <path d="M140 90 C132 98 122 100 120 103" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M140 90 C148 98 158 100 160 103" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      
      {/* Disease spots on leaf */}
      <circle cx="130" cy="75" r="5" fill="#8D6E63" opacity="0.8"/>
      <circle cx="148" cy="85" r="4" fill="#8D6E63" opacity="0.7"/>
      <circle cx="136" cy="100" r="3.5" fill="#795548" opacity="0.8"/>
      {/* Yellow halos */}
      <circle cx="130" cy="75" r="7" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="148" cy="85" r="6" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6"/>

      {/* Scan frame */}
      <rect x="103" y="55" width="74" height="84" rx="4" fill="none" stroke="#4CAF50" strokeWidth="2" opacity="0.9"/>
      {/* Corner marks */}
      <path d="M103,75 L103,55 L123,55" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
      <path d="M157,55 L177,55 L177,75" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
      <path d="M103,119 L103,139 L123,139" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
      <path d="M177,119 L177,139 L157,139" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>

      {/* AI scanning indicator */}
      <rect x="90" y="155" width="100" height="20" rx="6" fill="#2E7D32"/>
      <text x="140" y="168" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">Analyzing...</text>

      {/* Result badge */}
      <rect x="175" y="50" width="85" height="55" rx="10" fill="white" stroke="#E8F5E9" strokeWidth="1.5"/>
      <circle cx="195" cy="68" r="10" fill="#FFEBEE"/>
      <text x="195" y="72" textAnchor="middle" fontSize="10" fill="#E53935">⚠</text>
      <text x="217" y="63" textAnchor="middle" fontSize="8" fill="#212121" fontWeight="700">Brown Spot</text>
      <text x="217" y="74" textAnchor="middle" fontSize="7" fill="#6B7280">92% confidence</text>
      <rect x="185" y="79" width="60" height="14" rx="6" fill="#FFF3E0"/>
      <text x="215" y="89" textAnchor="middle" fontSize="8" fill="#FB8C00" fontWeight="600">Moderate Risk</text>

      {/* Floating leaf outside */}
      <ellipse cx="52" cy="130" rx="25" ry="35" fill="#A5D6A7" transform="rotate(-30 52 130)" opacity="0.7"/>
      <path d="M52 97 C52 97 52 163 52 165" stroke="#66BB6A" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 52 130)" opacity="0.6"/>
    </svg>
  )
}

function RobotIllustration() {
  return (
    <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Chat bubbles background */}
      <rect x="30" y="20" width="140" height="40" rx="12" fill="#E8F5E9"/>
      <rect x="36" y="28" width="128" height="24" rx="8" fill="#E8F5E9"/>
      <text x="100" y="44" textAnchor="middle" fontSize="9" fill="#2E7D32" fontWeight="500">How can I help your crops?</text>
      <polygon points="50,60 65,60 57,72" fill="#E8F5E9"/>

      <rect x="110" y="68" width="140" height="36" rx="12" fill="#2E7D32"/>
      <text x="155" y="82" textAnchor="middle" fontSize="8" fill="white">My leaves are turning</text>
      <text x="155" y="93" textAnchor="middle" fontSize="8" fill="white">yellow. Help!</text>
      <polygon points="230,104 245,104 240,114" fill="#2E7D32"/>

      {/* Robot body */}
      {/* Head */}
      <rect x="90" y="108" width="100" height="80" rx="20" fill="#E3F2FD" stroke="#BBDEFB" strokeWidth="2"/>
      
      {/* Eyes */}
      <circle cx="118" cy="135" r="14" fill="white" stroke="#90CAF9" strokeWidth="2"/>
      <circle cx="162" cy="135" r="14" fill="white" stroke="#90CAF9" strokeWidth="2"/>
      <circle cx="118" cy="135" r="9" fill="#1E88E5"/>
      <circle cx="162" cy="135" r="9" fill="#1E88E5"/>
      <circle cx="121" cy="132" r="3.5" fill="white"/>
      <circle cx="165" cy="132" r="3.5" fill="white"/>
      
      {/* Smile */}
      <path d="M118 158 Q140 172 162 158" stroke="#1E88E5" strokeWidth="3" fill="none" strokeLinecap="round"/>
      
      {/* Antenna */}
      <line x1="140" y1="108" x2="140" y2="95" stroke="#90CAF9" strokeWidth="2.5"/>
      <circle cx="140" cy="92" r="5" fill="#4CAF50"/>
      <circle cx="140" cy="92" r="8" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.5"/>
      
      {/* Arms */}
      <rect x="58" y="128" width="32" height="14" rx="7" fill="#90CAF9"/>
      <circle cx="60" cy="135" r="7" fill="#BBDEFB"/>
      <rect x="190" y="128" width="32" height="14" rx="7" fill="#90CAF9"/>
      <circle cx="220" cy="135" r="7" fill="#BBDEFB"/>
      
      {/* Chest panel */}
      <rect x="110" y="165" width="60" height="18" rx="8" fill="#BBDEFB"/>
      <circle cx="128" cy="174" r="4" fill="#2E7D32"/>
      <circle cx="140" cy="174" r="4" fill="#4CAF50"/>
      <circle cx="152" cy="174" r="4" fill="#81C784"/>
      
      {/* Speech indicator */}
      <circle cx="200" cy="118" r="16" fill="#4CAF50"/>
      <text x="200" y="123" textAnchor="middle" fontSize="13" fill="white">💬</text>

      {/* Leaf decoration */}
      <ellipse cx="42" cy="170" rx="20" ry="30" fill="#C8E6C9" transform="rotate(20 42 170)" opacity="0.8"/>
      <line x1="42" y1="142" x2="42" y2="198" stroke="#66BB6A" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  )
}

export default function OnboardingScreen() {
  const navigate = useNavigate()
  const { step } = useParams()
  const stepNum = parseInt(step) || 1
  const data = onboardingData[stepNum - 1]

  if (!data) {
    navigate('/login')
    return null
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Skip button */}
      <div className="flex justify-end px-5 pt-2 pb-0">
        <button
          onClick={() => navigate('/login')}
          className="text-sm text-gray-400 font-medium py-1 px-3"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-4">
        <div className="w-full mb-8">
          {stepNum === 1 && <SatelliteIllustration />}
          {stepNum === 2 && <LeafIllustration />}
          {stepNum === 3 && <RobotIllustration />}
        </div>

        {/* Step dots */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === stepNum ? 20 : 8,
                height: 8,
                background: i === stepNum ? '#2E7D32' : '#D1FAE5',
              }}
            />
          ))}
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {data.title}
        </h2>
        <p className="text-gray-500 text-center text-[15px] leading-relaxed max-w-xs">
          {data.description}
        </p>
      </div>

      {/* Button */}
      <div className="px-6 pb-14">
        <button
          onClick={() => navigate(data.nextPath)}
          className="btn-primary"
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  )
}
