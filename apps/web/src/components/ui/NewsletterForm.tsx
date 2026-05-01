'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ButtonArrow } from '@/components'

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Welcome to the DGTL newsletter!')
        setEmail('')
      } else if (res.ok && data.alreadySubscribed) {
        setStatus('already')
        setMessage(data.message || "You're already subscribed to our newsletter.")
      } else {
        setStatus('error')
        setMessage(data.message || data.error || 'Something went wrong. Please try again later.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again later.')
    }
  }

  const isComplete = status === 'success' || status === 'already'
  const isError = status === 'error'
  const isDisabled = status === 'loading' || isComplete

  // Simple fade for swapping button content
  const swapVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isDisabled}
          className="flex-1 rounded-[var(--radius)] border border-line card-glass px-4 py-3 text-body text-white placeholder:text-muted outline-none focus:border-gold disabled:opacity-60 transition-opacity duration-300"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className={[
            'group btn relative inline-flex items-center justify-center gap-2',
            'border font-bold tracking-normal whitespace-nowrap',
            'transition-all duration-300 ease-out',
            'select-none cursor-pointer px-6 py-[15px] text-[16px] rounded-[var(--radius)]',
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'min-w-[140px] min-h-[52px]',
            isError
              ? 'bg-red-500/10 text-red-400 border-red-500/40 focus-visible:ring-red-500/40'
              : 'bg-gold text-black border-gold hover:bg-[#d4b438] hover:border-[#d4b438] focus-visible:ring-gold/50',
            'disabled:cursor-default disabled:hover:bg-gold disabled:hover:border-gold',
          ].join(' ')}
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.span
                key="loading"
                variants={swapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
                </svg>
              </motion.span>
            ) : status === 'success' ? (
              <motion.span
                key="check"
                variants={swapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                  />
                </svg>
              </motion.span>
            ) : status === 'already' ? (
              <motion.span
                key="info"
                variants={swapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  {/* Exclamation: triangular stem + round dot */}
                  <motion.path
                    d="M10.5 4 L13.5 4 L13 15 L11 15 Z"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.05 }}
                    style={{ transformOrigin: '12px 4px' }}
                  />
                  <motion.circle
                    cx="12"
                    cy="19"
                    r="1.7"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
                    style={{ transformOrigin: '12px 19px' }}
                  />
                </svg>
              </motion.span>
            ) : isError ? (
              <motion.span
                key="error"
                variants={swapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.line
                    x1="6" y1="6" x2="18" y2="18"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut', delay: 0.1 }}
                  />
                  <motion.line
                    x1="6" y1="18" x2="18" y2="6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut', delay: 0.25 }}
                  />
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                variants={swapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                Get Started <ButtonArrow />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`mt-3 text-body-sm font-medium text-center ${
              status === 'success' ? 'text-gold' : status === 'already' ? 'text-white/80' : 'text-red-400'
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
