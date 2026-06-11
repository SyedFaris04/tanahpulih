import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, MessageCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { diagnosisResult } from '../data/mockData'

function ConfidenceArc({ percent }) {
  const size = 80
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative w-20 h-20">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E8F5E9" strokeWidth={strokeWidth}/>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#2E7D32" strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-primary">{percent}%</span>
      </div>
    </div>
  )
}

export default function DiagnosisScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/scan')} className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft size={22} color="#212121" strokeWidth={2.5}/>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Diagnosis Result</h1>
        </div>

        <div className="px-4 space-y-3">
          {/* Disease Card */}
          <div className="card p-4">
            <div className="flex items-start gap-3 mb-4">
              {/* Leaf image placeholder */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)' }}>
                <svg viewBox="0 0 80 80" className="w-full h-full">
                  <ellipse cx="40" cy="40" rx="28" ry="36" fill="#A5D6A7" transform="rotate(-15 40 40)"/>
                  <path d="M40 8 C40 8 40 72 40 75" stroke="#2E7D32" strokeWidth="2" opacity="0.8"/>
                  {/* Disease spots */}
                  <circle cx="32" cy="32" r="5" fill="#6D4C41" opacity="0.8"/>
                  <circle cx="48" cy="45" r="4" fill="#5D4037" opacity="0.7"/>
                  <circle cx="35" cy="55" r="3.5" fill="#4E342E" opacity="0.8"/>
                  <circle cx="32" cy="32" r="7" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.7"/>
                  <circle cx="48" cy="45" r="6" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6"/>
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle size={13} color="#FB8C00"/>
                  <p className="text-xs text-gray-500 font-medium">Disease Detected</p>
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {diagnosisResult.disease}
                </h2>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 text-center p-3 rounded-2xl" style={{ background: '#F8F9F4' }}>
                <ConfidenceArc percent={diagnosisResult.confidence}/>
                <p className="text-xs text-gray-500 font-medium mt-1">Confidence</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl" style={{ background: '#F8F9F4' }}>
                <p className="text-xs text-gray-500 font-medium mb-2">Risk Level</p>
                <div className="px-4 py-2 rounded-xl"
                     style={{ background: diagnosisResult.riskLevel === 'Moderate' ? '#FFF3E0' : diagnosisResult.riskLevel === 'High' ? '#FFEBEE' : '#E8F5E9' }}>
                  <p className="text-lg font-bold"
                     style={{ color: diagnosisResult.riskLevel === 'Moderate' ? '#FB8C00' : diagnosisResult.riskLevel === 'High' ? '#E53935' : '#2E7D32' }}>
                    {diagnosisResult.riskLevel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="card p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Symptoms</h3>
            <div className="space-y-2">
              {diagnosisResult.symptoms.map((symptom, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-warning-orange mt-1.5 flex-shrink-0"/>
                  <p className="text-sm text-gray-700">{symptom}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="card p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Recommendations</h3>
            <div className="space-y-2">
              {diagnosisResult.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={14} color="#43A047" className="mt-0.5 flex-shrink-0"/>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pb-4">
            <button
              onClick={() => navigate('/assistant')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <MessageCircle size={18}/>
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
