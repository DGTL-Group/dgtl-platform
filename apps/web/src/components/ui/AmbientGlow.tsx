'use client'

import { useEffect, useRef } from 'react'

/**
 * Multiple very subtle golden glows that drift continuously across the
 * screen using sine-wave motion. Each glow has its own pulse cycle so they
 * can overlap in time — creating a natural "breathing" warmth.
 */

const GLOW_COUNT = 3

interface GlowState {
  el: HTMLDivElement | null
  currentOpacity: number
  targetOpacity: number
  fadeStartTime: number
  fadeStartOpacity: number
  phaseX: number
  phaseY: number
  phaseX2: number
  phaseY2: number
  centerX: number
  centerY: number
  amplitudeX: number
  amplitudeY: number
  timeout: ReturnType<typeof setTimeout> | null
}

export function AmbientGlow() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const FADE_MS = 12000

    // Cubic ease-in-out
    function easeInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function randomizeMotion(g: GlowState) {
      g.phaseX = Math.random() * Math.PI * 2
      g.phaseY = Math.random() * Math.PI * 2
      g.phaseX2 = Math.random() * Math.PI * 2
      g.phaseY2 = Math.random() * Math.PI * 2
      g.centerX = 30 + Math.random() * 40
      g.centerY = 25 + Math.random() * 50
      g.amplitudeX = 15 + Math.random() * 15
      g.amplitudeY = 15 + Math.random() * 20
    }

    // Create glow elements
    const glows: GlowState[] = []
    for (let i = 0; i < GLOW_COUNT; i++) {
      const el = document.createElement('div')
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.pointerEvents = 'none'
      el.style.zIndex = '0'
      el.style.borderRadius = '50%'
      el.style.transform = 'translate(-50%, -50%)'
      el.style.willChange = 'opacity, left, top'
      el.style.opacity = '0'
      el.style.background =
        'radial-gradient(circle, rgba(240,207,80,0.075) 0%, rgba(240,207,80,0.025) 30%, transparent 70%)'
      container.appendChild(el)

      const state: GlowState = {
        el,
        currentOpacity: 0,
        targetOpacity: 0,
        fadeStartTime: 0,
        fadeStartOpacity: 0,
        phaseX: 0,
        phaseY: 0,
        phaseX2: 0,
        phaseY2: 0,
        centerX: 50,
        centerY: 50,
        amplitudeX: 20,
        amplitudeY: 25,
        timeout: null,
      }
      randomizeMotion(state)
      glows.push(state)
    }

    let cancelled = false
    let rafId: number

    function tick(time: number) {
      if (cancelled) return
      const t = time / 1000

      for (const g of glows) {
        if (!g.el) continue

        // Fade update
        if (g.currentOpacity !== g.targetOpacity) {
          const elapsed = time - g.fadeStartTime
          const progress = Math.min(1, elapsed / FADE_MS)
          const eased = easeInOut(progress)
          g.currentOpacity = g.fadeStartOpacity + (g.targetOpacity - g.fadeStartOpacity) * eased
          g.el.style.opacity = `${g.currentOpacity}`
          if (progress >= 1) g.currentOpacity = g.targetOpacity
        }

        // Position via layered sine waves
        const x =
          g.centerX +
          Math.sin(t * 1.2 + g.phaseX) * g.amplitudeX +
          Math.sin(t * 2.1 + g.phaseX2) * (g.amplitudeX * 0.4)
        const y =
          g.centerY +
          Math.cos(t * 0.95 + g.phaseY) * g.amplitudeY +
          Math.sin(t * 1.7 + g.phaseY2) * (g.amplitudeY * 0.4)

        g.el.style.left = `${x}%`
        g.el.style.top = `${y}%`
      }

      rafId = requestAnimationFrame(tick)
    }

    function beginFade(g: GlowState, toOpacity: number) {
      g.fadeStartOpacity = g.currentOpacity
      g.targetOpacity = toOpacity
      g.fadeStartTime = performance.now()
    }

    function startPulse(g: GlowState) {
      if (cancelled || !g.el) return

      const size = 900 + Math.random() * 500
      g.el.style.width = `${size}px`
      g.el.style.height = `${size}px`

      randomizeMotion(g)
      beginFade(g, 1)

      // Fade-in + hold at full
      const holdAfterFadeIn = 2000 + Math.random() * 3000
      g.timeout = setTimeout(() => {
        if (cancelled) return
        beginFade(g, 0)

        // Short pause before next pulse (allowing overlap with other glows)
        const pauseTime = 3000 + Math.random() * 6000
        g.timeout = setTimeout(() => startPulse(g), pauseTime)
      }, FADE_MS + holdAfterFadeIn)
    }

    rafId = requestAnimationFrame(tick)
    // Stagger the initial pulses so they don't all start at once
    glows.forEach((g, i) => {
      g.timeout = setTimeout(() => startPulse(g), 500 + i * 4000 + Math.random() * 2000)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      glows.forEach((g) => {
        if (g.timeout) clearTimeout(g.timeout)
        if (g.el && g.el.parentNode) g.el.parentNode.removeChild(g.el)
      })
    }
  }, [])

  return <div ref={containerRef} />
}
