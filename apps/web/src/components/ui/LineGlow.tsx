'use client'

import { useEffect, useRef } from 'react'

/**
 * Single light source → specular reflections on 4 metal lines.
 * One rAF loop, one lightX, all highlights derived from it.
 * Diagonals: stroke-dasharray on <path> (works with filter).
 * Horizontals: <rect> positioned by x attribute (filter breaks dasharray on horizontals).
 */

const DIAGONALS = [
  { x1: 2200, y1: -440, x2: 706.27, y2: 1049.27, xMin: 706, xMax: 2200 },
  { x1: 1530, y1: -385, x2: 60.39, y2: 1079.38, xMin: 60, xMax: 1530 },
]

const HORIZONTALS = [
  { xMin: 1033, xMax: 2200, y: 487.5, rectY: 486, segW: 100 },
  { xMin: -200, xMax: 841, y: 546.5, rectY: 545, segW: 80 },
]

export function LineGlow() {
  const diagRefs = useRef<(SVGPathElement | null)[]>([])
  const horizRefs = useRef<(SVGRectElement | null)[]>([])

  useEffect(() => {
    const diags = diagRefs.current.filter(Boolean) as SVGPathElement[]
    const horizs = horizRefs.current.filter(Boolean) as SVGRectElement[]
    if (diags.length !== 2 || horizs.length !== 2) return

    const diagLens = diags.map(p => p.getTotalLength())
    const segLens = [120, 110]

    diags.forEach((p, i) => {
      p.style.strokeDasharray = `${segLens[i]} ${diagLens[i] + segLens[i]}`
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

      // Diagonals — stroke-dashoffset
      DIAGONALS.forEach((line, i) => {
        const p = diags[i]
        const len = diagLens[i]
        const seg = segLens[i]

        if (!inSweep || lightX > line.xMax || lightX < line.xMin) {
          p.style.opacity = '0'
          return
        }

        const progress = (lightX - line.x1) / (line.x2 - line.x1)
        const offset = seg - progress * (len + seg)
        p.style.strokeDashoffset = `${offset}`
        p.style.opacity = '1'
      })

      // Horizontals — rect x position
      HORIZONTALS.forEach((line, i) => {
        const rect = horizs[i]

        if (!inSweep || lightX > line.xMax || lightX < line.xMin) {
          rect.style.opacity = '0'
          return
        }

        rect.setAttribute('x', `${lightX - line.segW / 2}`)
        rect.style.opacity = '1'
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
        <clipPath id="clip-hr">
          <rect x="1033" y="478" width="1200" height="20" />
        </clipPath>
        <clipPath id="clip-hl">
          <rect x="-200" y="537" width="1041" height="20" />
        </clipPath>
      </defs>

      {/* Diagonal paths — stroke-dasharray works with filter */}
      {DIAGONALS.map((line, i) => (
        <path
          key={`d${i}`}
          ref={el => { diagRefs.current[i] = el }}
          d={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
          stroke="rgba(240,220,160,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#specular)"
          style={{ opacity: 0, transition: 'none' }}
        />
      ))}

      {/* Horizontal rects — clipped to line bounds */}
      <g clipPath="url(#clip-hr)">
        <rect
          ref={el => { horizRefs.current[0] = el }}
          y={HORIZONTALS[0].rectY}
          width={HORIZONTALS[0].segW}
          height={3}
          rx={1.5}
          fill="rgba(240,220,160,0.85)"
          filter="url(#specular)"
          style={{ opacity: 0, transition: 'none' }}
        />
      </g>
      <g clipPath="url(#clip-hl)">
        <rect
          ref={el => { horizRefs.current[1] = el }}
          y={HORIZONTALS[1].rectY}
          width={HORIZONTALS[1].segW}
          height={3}
          rx={1.5}
          fill="rgba(240,220,160,0.85)"
          filter="url(#specular)"
          style={{ opacity: 0, transition: 'none' }}
        />
      </g>
    </svg>
  )
}
