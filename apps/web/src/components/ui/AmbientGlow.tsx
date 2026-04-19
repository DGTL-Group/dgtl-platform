'use client'

import { useEffect, useRef } from 'react'

/**
 * Very large, very subtle golden glow that drifts continuously across the
 * screen using sine-wave motion. Fades in/out with JS-controlled RAF timing
 * for guaranteed smooth, slow transitions. Intensity ~half of cursor glow.
 */
export function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let rafId: number
    let timeout: ReturnType<typeof setTimeout>
    let cancelled = false

    // Fade state
    let currentOpacity = 0
    let targetOpacity = 0
    let fadeStartTime = 0
    let fadeStartOpacity = 0
    const FADE_MS = 12000

    // Motion parameters
    let phaseX = 0
    let phaseY = 0
    let phaseX2 = 0
    let phaseY2 = 0
    let centerX = 50
    let centerY = 50
    let amplitudeX = 20
    let amplitudeY = 25

    function randomizeMotion() {
      phaseX = Math.random() * Math.PI * 2
      phaseY = Math.random() * Math.PI * 2
      phaseX2 = Math.random() * Math.PI * 2
      phaseY2 = Math.random() * Math.PI * 2
      centerX = 30 + Math.random() * 40
      centerY = 25 + Math.random() * 50
      amplitudeX = 15 + Math.random() * 15
      amplitudeY = 15 + Math.random() * 20
    }

    // Ease-in-out cubic
    function easeInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function tick(time: number) {
      if (cancelled) return

      // Update fade
      if (currentOpacity !== targetOpacity) {
        const elapsed = time - fadeStartTime
        const progress = Math.min(1, elapsed / FADE_MS)
        const eased = easeInOut(progress)
        currentOpacity = fadeStartOpacity + (targetOpacity - fadeStartOpacity) * eased
        el.style.opacity = `${currentOpacity}`
        if (progress >= 1) currentOpacity = targetOpacity
      }

      // Update position via layered sine waves (always, even during pause — smooth drift)
      const t = time / 1000
      const x = centerX
        + Math.sin(t * 0.35 + phaseX) * amplitudeX
        + Math.sin(t * 0.62 + phaseX2) * (amplitudeX * 0.4)
      const y = centerY
        + Math.cos(t * 0.28 + phaseY) * amplitudeY
        + Math.sin(t * 0.51 + phaseY2) * (amplitudeY * 0.4)

      el.style.left = `${x}%`
      el.style.top = `${y}%`

      rafId = requestAnimationFrame(tick)
    }

    function beginFade(toOpacity: number) {
      fadeStartOpacity = currentOpacity
      targetOpacity = toOpacity
      fadeStartTime = performance.now()
    }

    function startPulse() {
      if (cancelled) return

      // Random size: 1000-1500px
      const size = 1000 + Math.random() * 500
      el.style.width = `${size}px`
      el.style.height = `${size}px`

      randomizeMotion()

      // Fade in
      beginFade(1)

      // After fade-in completes + hold, fade out
      const holdAfterFadeIn = 3000 + Math.random() * 3000
      timeout = setTimeout(() => {
        if (cancelled) return
        beginFade(0)

        // After fade-out + pause, start next pulse
        const pauseTime = FADE_MS + 1500 + Math.random() * 2000
        timeout = setTimeout(startPulse, pauseTime)
      }, FADE_MS + holdAfterFadeIn)
    }

    rafId = requestAnimationFrame(tick)
    timeout = setTimeout(startPulse, 2000)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0"
      style={{
        opacity: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,207,80,0.045) 0%, rgba(240,207,80,0.015) 30%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        willChange: 'opacity, left, top',
      }}
    />
  )
}
