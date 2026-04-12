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

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Smooth lerp follow for premium feel
    function animate() {
      currentX += (mouseX - currentX) * 0.15
      currentY += (mouseY - currentY) * 0.15

      el.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
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
        background: 'radial-gradient(circle, rgba(240,207,80,0.10) 0%, rgba(240,207,80,0.04) 25%, rgba(240,207,80,0.015) 50%, transparent 70%)',
        transition: 'none',
        willChange: 'transform',
      }}
    />
  )
}
