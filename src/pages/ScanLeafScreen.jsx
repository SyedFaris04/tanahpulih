import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Camera, Upload, X, Leaf } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

export default function ScanLeafScreen() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [previewSrc, setPreviewSrc] = useState(null)
  const [scanProgress, setScanProgress] = useState(0)

  // Hidden file inputs
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  // After image is chosen (from camera or gallery), show preview then scan
  const handleFileChosen = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewSrc(url)
    startScan()
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  const startScan = () => {
    setScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => navigate('/diagnosis'), 300)
          return 100
        }
        return p + 5
      })
    }, 80)
  }

  const clearPreview = () => {
    setPreviewSrc(null)
    setScanning(false)
    setScanProgress(0)
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      {/* Hidden camera input — capture="environment" opens rear camera on mobile */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileChosen}
      />
      {/* Hidden gallery input — no capture attr, opens file browser */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChosen}
      />

      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft size={22} color="#212121" strokeWidth={2.5} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Scan Leaf</h1>
        </div>

        <div className="px-4 space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Take a clear photo of the leaf<br />for accurate diagnosis
          </p>

          {/* Viewfinder / Preview */}
          <div
            className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center"
            style={{
              height: 260,
              background: previewSrc
                ? '#000'
                : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
            }}
          >
            {/* Show chosen image as preview */}
            {previewSrc && (
              <img
                src={previewSrc}
                alt="leaf preview"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: scanning ? 0.7 : 1 }}
              />
            )}

            {/* Clear button when preview shown and not scanning */}
            {previewSrc && !scanning && (
              <button
                onClick={clearPreview}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-10"
              >
                <X size={16} color="white" />
              </button>
            )}

            {/* Scanning overlay */}
            {scanning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Animated scan frame */}
                <div className="relative w-36 h-36">
                  {/* Scan line that moves */}
                  <div
                    className="absolute left-2 right-2 h-0.5 z-20"
                    style={{
                      background: 'rgba(76,255,80,0.9)',
                      boxShadow: '0 0 10px rgba(76,255,80,0.8)',
                      top: `${scanProgress}%`,
                      transition: 'top 0.08s linear',
                    }}
                  />
                  {/* Corner marks */}
                  {[
                    { top: 0, left: 0, borderStyle: { borderWidth: '3px 0 0 3px', borderRadius: '8px 0 0 0' } },
                    { top: 0, right: 0, borderStyle: { borderWidth: '3px 3px 0 0', borderRadius: '0 8px 0 0' } },
                    { bottom: 0, left: 0, borderStyle: { borderWidth: '0 0 3px 3px', borderRadius: '0 0 0 8px' } },
                    { bottom: 0, right: 0, borderStyle: { borderWidth: '0 3px 3px 0', borderRadius: '0 0 8px 0' } },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="absolute w-7 h-7"
                      style={{
                        ...c,
                        top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                        borderColor: '#4CAF50',
                        borderStyle: 'solid',
                        ...c.borderStyle,
                      }}
                    />
                  ))}
                </div>
                {/* Progress text */}
                <div className="mt-4 flex flex-col items-center gap-1">
                  <p className="text-green-300 font-semibold text-sm">
                    {scanProgress < 40 ? 'Loading image...' : scanProgress < 75 ? 'Analyzing leaf...' : 'Processing results...'}
                  </p>
                  <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full rounded-full bg-green-400 transition-all duration-100"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <p className="text-white/60 text-xs">{scanProgress}%</p>
                </div>
              </div>
            ) : !previewSrc ? (
              /* Empty state */
              <>
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice">
                  <path d="M160 20 C80 60 60 140 100 190 C130 230 160 240 160 240 C160 240 190 230 220 190 C260 140 240 60 160 20Z" fill="#A5D6A7" />
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center border-2 border-white/30">
                    <Leaf size={34} color="white" strokeWidth={1.5} />
                  </div>
                  <p className="text-white/70 text-xs font-medium">Tap below to scan</p>
                </div>
                {/* Frame corners */}
                <div className="absolute inset-8 pointer-events-none">
                  {[
                    { top: 0, left: 0, style: { borderWidth: '3px 0 0 3px', borderRadius: '12px 0 0 0' } },
                    { top: 0, right: 0, style: { borderWidth: '3px 3px 0 0', borderRadius: '0 12px 0 0' } },
                    { bottom: 0, left: 0, style: { borderWidth: '0 0 3px 3px', borderRadius: '0 0 0 12px' } },
                    { bottom: 0, right: 0, style: { borderWidth: '0 3px 3px 0', borderRadius: '0 0 12px 0' } },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8"
                      style={{
                        top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                        borderColor: 'rgba(255,255,255,0.65)',
                        borderStyle: 'solid',
                        ...c.style,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          {/* Buttons — disabled while scanning */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            disabled={scanning}
            className="btn-primary flex items-center justify-center gap-2"
            style={{ opacity: scanning ? 0.6 : 1 }}
          >
            <Camera size={18} />
            Take Photo
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={() => galleryInputRef.current?.click()}
            disabled={scanning}
            className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-gray-200 rounded-2xl bg-white font-semibold text-sm text-gray-700 active:bg-gray-50 transition-colors"
            style={{ opacity: scanning ? 0.6 : 1 }}
          >
            <Upload size={18} color="#6B7280" />
            Upload Image
          </button>

          {/* Tips */}
          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">i</span>
              Tips for best results
            </p>
            <div className="space-y-2">
              {['Take photo in daylight', 'Capture one leaf clearly', 'Avoid blurry images'].map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-gray-600">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
