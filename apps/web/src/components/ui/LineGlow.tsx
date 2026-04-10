'use client'

import { useEffect, useRef } from 'react'

/**
 * Single light source → specular reflections on 4 metal lines.
 * One rAF loop, one lightX value, all highlights derived from it.
 * Thin bright stroke with specular filter — metallic look.
 */

const LINES = [
  { // Diagonal 1: top-right → bottom-left
    x1: 2200, y1: -440, x2: 706.27, y2: 1049.27,
    xMin: 706, xMax: 2200,
  },
  { // Horizontal right: extends right from spark
    x1: 1033, y1: 487.5, x2: 2200, y2: 487.5,
    xMin: 1033, xMax: 2200,
  },
  { // Horizontal left: extends left from spark
    x1: -200, y1: 546.5, x2: 841, y2: 546.5,
    xMin: -200, xMax: 841,
  },
  { // Diagonal 2: top-center → bottom-left
    x1: 1530, y1: -385, x2: 60.39, y2: 1079.38,
    xMin: 60, xMax: 1530,
  },
]

export function LineGlow() {
  const pathsRef = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const paths = pathsRef.current.filter(Boolean) as SVGPathElement[]
    if (paths.length !== 4) return

    const lengths = paths.map(p => p.getTotalLength())
    const segLens = [120, 100, 80, 110] // visible segment per line

    // Set up dasharray: short segment + gap covering the rest
    paths.forEach((p, i) => {
      p.style.strokeDasharray = `${segLens[i]} ${lengths[i] + segLens[i]}`
      p.style.strokeDashoffset = `${lengths[i] + segLens[i]}`
    })

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
        const p = paths[i]
        const len = lengths[i]
        const seg = segLens[i]

        if (!inSweep || lightX > line.xMax || lightX < line.xMin) {
          p.style.opacity = '0'
          return
        }

        // Map lightX to progress along this line (0→1)
        const progress = (lightX - line.x1) / (line.x2 - line.x1)
        // Map progress to dashoffset
        const offset = seg - progress * (len + seg)

        p.style.strokeDashoffset = `${offset}`
        p.style.opacity = '1'
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
        <filter id="specular" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="core" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="halo" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="core" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {LINES.map((line, i) => (
        <path
          key={i}
          ref={el => { pathsRef.current[i] = el }}
          d={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
          stroke="rgba(240,220,160,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#specular)"
          style={{ opacity: 0, transition: 'none' }}
        />
      ))}
    </svg>
  )
}
