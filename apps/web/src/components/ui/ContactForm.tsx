'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ButtonArrow } from '@/components'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || status === 'loading') return

    setStatus('loading')
    setFeedback('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setFeedback(data.message || "Thanks for reaching out! We'll be in touch soon.")
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setFeedback(data.message || data.error || 'Something went wrong. Please try again later.')
      }
    } catch {
      setStatus('error')
      setFeedback('Something went wrong. Please try again later.')
    }
  }

  const isComplete = status === 'success'
  const isError = status === 'error'
  const isDisabled = status === 'loading' || isComplete

  const swapVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-body-sm font-medium text-white mb-2">
            Your name<span className="text-gold">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isDisabled}
            className="w-full rounded-[var(--radius)] border border-line card-glass px-4 py-3 text-body text-white placeholder:text-muted outline-none focus:border-gold disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-body-sm font-medium text-white mb-2">
            Your email<span className="text-gold">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isDisabled}
            className="w-full rounded-[var(--radius)] border border-line card-glass px-4 py-3 text-body text-white placeholder:text-muted outline-none focus:border-gold disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-body-sm font-medium text-white mb-2">
          Tell us about your project
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isDisabled}
          rows={6}
          placeholder="Type your message..."
          className="w-full rounded-[var(--radius)] border border-line card-glass px-4 py-3 text-body text-white placeholder:text-muted outline-none focus:border-gold disabled:opacity-60 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className={[
          'group btn relative w-full inline-flex items-center justify-center gap-2',
          'border font-bold tracking-normal whitespace-nowrap',
          'transition-all duration-300 ease-out',
          'select-none cursor-pointer px-6 py-[15px] text-[16px] rounded-[var(--radius)]',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'min-h-[52px]',
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
          ) : isComplete ? (
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
                <motion.line x1="6" y1="6" x2="18" y2="18" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 0.1 }} />
                <motion.line x1="6" y1="18" x2="18" y2="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 0.25 }} />
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
              Submit <ButtonArrow />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.p
            key={feedback}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`text-body-sm font-medium text-center ${
              status === 'success' ? 'text-gold' : 'text-red-400'
            }`}
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
