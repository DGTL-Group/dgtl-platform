'use client'

import { useEffect, useRef } from 'react'

/**
 * Single light source → specular reflections on 4 metal lines.
 * One rAF loop, one lightX, all highlights derived from it.
 * All 4 lines use soft radial-gradient ellipses — same visual treatment.
 * Diagonals are rotated to match their line angle.
 */

const LINES = [
  { // Diagonal 1: top-right → bottom-left
    x1: 2200, y1: -440, x2: 706.27, y2: 1049.27,
    xMin: 706, xMax: 2200,
    angle: Math.atan2(1049.27 - (-440), 706.27 - 2200) * (180 / Math.PI),
    segW: 420, clipId: null,
  },
  { // Horizontal right: spark → right edge
    x1: 1033, y1: 487.5, x2: 2200, y2: 487.5,
    xMin: 1033, xMax: 2200,
    angle: 0,
    segW: 455, clipId: 'clip-hr',
  },
  { // Horizontal left: left edge → spark
    x1: -200, y1: 546.5, x2: 841, y2: 546.5,
    xMin: -200, xMax: 841,
    angle: 0,
    segW: 395, clipId: 'clip-hl',
  },
  { // Diagonal 2: top-center → bottom-left
    x1: 1530, y1: -385, x2: 60.39, y2: 1079.38,
    xMin: 60, xMax: 1530,
    angle: Math.atan2(1079.38 - (-385), 60.39 - 1530) * (180 / Math.PI),
    segW: 400, clipId: null,
  },
]

function getPointOnLine(line: typeof LINES[0], lightX: number) {
  const t = (lightX - line.x1) / (line.x2 - line.x1)
  return {
    x: lightX,
    y: line.y1 + t * (line.y2 - line.y1),
  }
}

export function LineGlow() {
  const ellipseRefs = useRef<(SVGEllipseElement | null)[]>([])

  useEffect(() => {
    const ellipses = ellipseRefs.current.filter(Boolean) as SVGEllipseElement[]
    if (ellipses.length !== LINES.length) return

    const SWEEP_MS = 8000
    const PAUSE_MS = 5000
    const CYCLE = SWEEP_MS + PAUSE_MS
    const X_START = 2400
    const X_END = -400
    const X_RANGE = X_START - X_END

    let rafId: number

    function animate(time: number) {
      const t = time % CYCLE
      const inSweep = t < SWEEP_MS
      const lightX = inSweep ? X_START - (t / SWEEP_MS) * X_RANGE : -9999

      LINES.forEach((line, i) => {
        const el = ellipses[i]
        if (!inSweep || lightX > line.xMax || lightX < line.xMin) {
          el.style.opacity = '0'
          return
        }

        const pt = getPointOnLine(line, lightX)
        el.setAttribute('cx', `${pt.x}`)
        el.setAttribute('cy', `${pt.y}`)
        el.style.opacity = '1'
      })

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
      viewBox="0 0 1920 960"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'none' }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" rx="50%" ry="50%">
          <stop offset="0%" stopColor="rgba(255,250,230,0.25)" />
          <stop offset="15%" stopColor="rgba(240,220,160,0.18)" />
          <stop offset="40%" stopColor="rgba(240,220,160,0.08)" />
          <stop offset="65%" stopColor="rgba(240,220,160,0.03)" />
          <stop offset="85%" stopColor="rgba(240,220,160,0.005)" />
          <stop offset="100%" stopColor="rgba(240,220,160,0)" />
        </radialGradient>

        <clipPath id="clip-hr">
          <rect x="1033" y="470" width="1200" height="36" />
        </clipPath>
        <clipPath id="clip-hl">
          <rect x="-200" y="529" width="1041" height="36" />
        </clipPath>
      </defs>

      {LINES.map((line, i) => {
        const ellipse = (
          <ellipse
            key={i}
            ref={el => { ellipseRefs.current[i] = el }}
            rx={line.segW / 2}
            ry={1.8}
            fill="url(#glow)"
            transform={line.angle !== 0 ? `rotate(${line.angle})` : undefined}
            style={{ opacity: 0, transition: 'none', transformOrigin: 'center', transformBox: 'fill-box' }}
          />
        )

        if (line.clipId) {
          return <g key={i} clipPath={`url(#${line.clipId})`}>{ellipse}</g>
        }
        return ellipse
      })}
    </svg>
  )
}
