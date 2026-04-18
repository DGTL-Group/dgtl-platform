'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * Very large, very subtle golden glow that appears at random positions
 * every so often, fades in slowly, holds briefly, then fades out.
 * Creates an ambient "breathing" warmth in the background.
 */
export function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pulse = useCallback(() => {
    const el = glowRef.current
    if (!el) return

    // Random position — biased toward center but can drift
    const x = 20 + Math.random() * 60 // 20-80% of viewport width
    const y = Math.random() * 100      // anywhere vertically

    // Large size: 900-1400px
    const size = 900 + Math.random() * 500

    el.style.left = `${x}%`
    el.style.top = `${y}%`
    el.style.width = `${size}px`
    el.style.height = `${size}px`

    // Fade in
    el.style.opacity = '1'

    // Hold for 3-5s, then fade out
    const holdTime = 3000 + Math.random() * 2000
    timeoutRef.current = setTimeout(() => {
      el.style.opacity = '0'

      // Wait for fade-out (3s transition) + random pause before next pulse
      const pauseTime = 6000 + Math.random() * 10000 // 6-16s between pulses
      timeoutRef.current = setTimeout(pulse, pauseTime)
    }, holdTime)
  }, [])

  useEffect(() => {
    // First pulse after 3s
    timeoutRef.current = setTimeout(pulse, 3000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pulse])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0"
      style={{
        opacity: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,207,80,0.06) 0%, rgba(240,207,80,0.035) 25%, rgba(240,207,80,0.015) 50%, rgba(240,207,80,0.005) 70%, transparent 85%)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 3s ease-in-out',
        willChange: 'opacity',
      }}
    />
  )
}
