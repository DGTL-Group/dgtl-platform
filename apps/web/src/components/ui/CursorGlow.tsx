'use client'

import { useEffect, useRef } from 'react'

/**
 * Gold radial glow that follows the cursor.
 * Renders as a fixed div behind all content, affecting the background.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let mouseX = -500
    let mouseY = -500
    let currentX = -500
    let currentY = -500
    let rafId: number
    let idleTimer: ReturnType<typeof setTimeout>
    let currentOpacity = 0
    let targetOpacity = 0

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      targetOpacity = 1

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        targetOpacity = 0
      }, 2000)
    }

    // Smooth lerp follow + opacity fade
    function animate() {
      currentX += (mouseX - currentX) * 0.11
      currentY += (mouseY - currentY) * 0.11
      currentOpacity += (targetOpacity - currentOpacity) * 0.016

      el.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`
      el.style.opacity = `${currentOpacity}`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0"
      style={{
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,207,80,0.09) 0%, rgba(240,207,80,0.03) 30%, transparent 70%)',
        transition: 'none',
        willChange: 'transform',
      }}
    />
  )
}
