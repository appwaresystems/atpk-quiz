'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleStart = () => {
    if (!name.trim()) {
      setError('Խնդրում ենք մուտքագրել ձեր անունը')
      return
    }

    localStorage.setItem('userName', name.trim())
    setError('')
    router.push('/quiz')
  }

  return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">
              ԱՏՊՔ
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">
              Ծրագրավորման բաժնի քուիզ
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ձեր անունը
              </label>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                  placeholder="Մուտքագրեք ձեր անունը..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  autoFocus
              />
              {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
                onClick={handleStart}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
            >
              Սկսել
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>քուիզը բաղկացած է 10 հարցից</p>
            <p>Պատասխանեք բոլոր հարցերին</p>
          </div>
        </div>
      </div>
  )
}