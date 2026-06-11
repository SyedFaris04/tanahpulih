import React from 'react'
import { Wifi, Battery, Signal } from 'lucide-react'

export default function StatusBar({ transparent = false, light = false }) {
  const textColor = light ? 'text-white' : 'text-gray-800'
  const bg = transparent ? 'bg-transparent' : 'bg-transparent'

  return (
    <div className={`status-bar ${bg} px-5`}>
      <span className={`text-xs font-semibold ${textColor}`}>9:41</span>
      <div className={`flex items-center gap-1.5 ${textColor}`}>
        <Signal size={12} strokeWidth={2.5} />
        <Wifi size={12} strokeWidth={2.5} />
        <Battery size={14} strokeWidth={2.5} />
      </div>
    </div>
  )
}
