import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, Send, Leaf } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { chatMessages, suggestedQuestions, aiResponses } from '../data/mockData'

function Message({ msg }) {
  const isUser = msg.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2 mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <Leaf size={14} color="white"/>
        </div>
      )}
      <div className={`max-w-[78%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className="px-4 py-3 rounded-2xl"
          style={{
            background: isUser ? '#2E7D32' : 'white',
            color: isUser ? 'white' : '#212121',
            borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
        </div>
        <span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.time}</span>
      </div>
    </div>
  )
}

export default function AssistantScreen() {
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => { scrollToBottom() }, [messages])

  const sendMessage = (text) => {
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = aiResponses[text] ||
        `Thank you for your question about "${text}".\n\nBased on your current field data (NDVI: 0.81, Field Status: Healthy), here are my recommendations:\n\n🌱 Your crops appear to be in good condition overall. Continue monitoring regularly.\n\n📊 Satellite data shows stable vegetation indices this week.\n\n💡 For specific concerns, I recommend taking a leaf scan using the camera function for more precise diagnosis.`

      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1200)
  }

  const handleSubmit = () => {
    if (input.trim()) sendMessage(input.trim())
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="bg-white">
        <StatusBar />
        {/* Header */}
        <div className="px-4 pt-1 pb-3 flex items-center gap-3 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Leaf size={18} color="white"/>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">AI Assistant</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-healthy-green"/>
              <p className="text-xs text-gray-500">Online • Smart Farming Expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map(msg => (
          <Message key={msg.id} msg={msg}/>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf size={14} color="white"/>
            </div>
            <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1.5 items-center">
                {[0,1,2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400"
                    style={{ animation: `bounce 1s ease infinite ${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suggested questions — only show at start */}
        {messages.length === 1 && (
          <div className="mb-3">
            <p className="text-xs text-gray-400 font-medium mb-2 ml-10">Suggested Questions</p>
            <div className="space-y-2 ml-10">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="block w-full text-left px-3.5 py-2.5 bg-white rounded-xl text-sm text-gray-700 font-medium shadow-sm border border-gray-100 active:bg-gray-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef}/>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-4 py-2.5 bg-gray-50 rounded-2xl text-sm text-gray-800 outline-none border border-gray-200 focus:border-primary"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: input.trim() ? '#2E7D32' : '#E5E7EB' }}
          >
            <Send size={16} color={input.trim() ? 'white' : '#9CA3AF'}/>
          </button>
        </div>
        <div className="pb-2"/>
      </div>

      <BottomNav />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}
