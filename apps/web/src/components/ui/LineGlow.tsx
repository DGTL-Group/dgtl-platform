'use client'

import { useEffect, useRef } from 'react'

/**
 * Single light source → specular reflections on 4 metal lines + spark logo.
 * One rAF loop, one lightX, all highlights derived from it.
 * Spark uses CSS clip-path (SVG clipPath doesn't work on this element).
 */

const SPARK_PATH = 'M1230.97 515.767V515.647C1230.97 515.508 1230.95 515.369 1230.95 515.246C1230.93 514.951 1230.93 514.655 1230.89 514.377C1230.22 499.373 1217.95 487.412 1202.85 487.412H1038.88C1023.36 487.412 1010.77 500.052 1010.77 515.663V516.864C1010.77 532.459 1023.35 545.115 1038.88 545.115H1132.91L862.54 812.246L1096.86 131.248C1100.82 119.755 1096.92 107.463 1088.08 100.18C1087.91 100.006 1087.77 99.8141 1087.6 99.6239C1076.47 88.2542 1058.31 88.1151 1046.99 99.2762L646.545 494.975C640.472 500.972 637.653 509.022 638.034 516.95C638.034 517.003 638.034 517.072 638.034 517.123V518.324C638.034 533.919 650.612 546.575 666.146 546.575H831.625C847.141 546.575 859.737 533.936 859.737 518.324V517.123C859.737 501.528 847.16 488.872 831.625 488.872H734.638L1004.97 221.757L770.588 902.913C765.518 917.655 773.305 933.737 787.975 938.849L789.099 939.249C789.133 939.266 789.186 939.266 789.221 939.284C799.773 944.238 812.697 942.43 821.485 933.737L1222.43 537.586C1228.47 531.606 1231.3 523.644 1230.97 515.767Z'

const LINES = [
  { x1: 2200, y1: -428.32, x2: 706.27, y2: 1047.51, xMin: 706, xMax: 2200,
    angle: Math.atan2(1047.51 - (-428.32), 706.27 - 2200) * (180 / Math.PI), segW: 420, clipId: null },
  { x1: 1033, y1: 487.5, x2: 2200, y2: 487.5, xMin: 1033, xMax: 2200,
    angle: 0, segW: 455, clipId: 'clip-hr' },
  { x1: -200, y1: 546.5, x2: 841, y2: 546.5, xMin: -200, xMax: 841,
    angle: 0, segW: 395, clipId: 'clip-hl' },
  { x1: 1530, y1: -377.83, x2: 60.39, y2: 1074.18, xMin: 60, xMax: 1530,
    angle: Math.atan2(1074.18 - (-377.83), 60.39 - 1530) * (180 / Math.PI), segW: 400, clipId: null },
]

function getPointOnLine(line: typeof LINES[0], lightX: number) {
  const t = (lightX - line.x1) / (line.x2 - line.x1)
  return { x: lightX, y: line.y1 + t * (line.y2 - line.y1) }
}

export function LineGlow() {
  const ellipseRefs = useRef<(SVGEllipseElement | null)[]>([])


  useEffect(() => {
    const ellipses = ellipseRefs.current.filter(Boolean) as SVGEllipseElement[]
    if (ellipses.length !== LINES.length) return

    const sparkMaskEl = document.getElementById('spark-mask-ellipse') as SVGEllipseElement | null
    if (!sparkMaskEl) return

    const SWEEP_MS = 12000
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

      // Line reflections
      const EDGE_FADE = 200 // px over which to fade near line edges
      LINES.forEach((line, i) => {
        const el = ellipses[i]
        if (!inSweep || lightX > line.xMax || lightX < line.xMin) {
          el.style.opacity = '0'
          return
        }
        const pt = getPointOnLine(line, lightX)
        el.setAttribute('cx', `${pt.x}`)
        el.setAttribute('cy', `${pt.y}`)

        // Smooth fade near line edges (especially around the logo gap)
        let opacity = 1
        if (lightX < line.xMin + EDGE_FADE) {
          opacity = Math.max(0, (lightX - line.xMin) / EDGE_FADE)
        }
        if (lightX > line.xMax - EDGE_FADE) {
          opacity = Math.min(opacity, Math.max(0, (line.xMax - lightX) / EDGE_FADE))
        }
        el.style.opacity = `${opacity}`
      })

      // Spark reflection — offset slightly ahead to sync visually with line reflections
      sparkMaskEl.setAttribute('cx', `${lightX - 50}`)
      sparkMaskEl.setAttribute('cy', '500')

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-0 w-full h-full"
      viewBox="0 0 1920 960"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'none' }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" rx="50%" ry="50%">
          <stop offset="0%" stopColor="rgba(255,250,230,0.20)" />
          <stop offset="15%" stopColor="rgba(240,220,160,0.144)" />
          <stop offset="40%" stopColor="rgba(240,220,160,0.064)" />
          <stop offset="65%" stopColor="rgba(240,220,160,0.024)" />
          <stop offset="85%" stopColor="rgba(240,220,160,0.004)" />
          <stop offset="100%" stopColor="rgba(240,220,160,0)" />
        </radialGradient>

        <clipPath id="clip-hr">
          <rect x="1033" y="470" width="1200" height="36" />
        </clipPath>
        <clipPath id="clip-hl">
          <rect x="-200" y="529" width="1041" height="36" />
        </clipPath>
      </defs>

      {/* Line reflections */}
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

      {/* Spark logo reflection — masked by a radial gradient that follows lightX */}
      <path
        d={SPARK_PATH}
        fill="#F0CF50"
        fillOpacity={0.23}
        mask="url(#spark-mask)"
        style={{ transition: 'none' }}
      />

      {/* Mask: radial gradient ellipse that moves with lightX */}
      {/* Radial gradient for the spark mask — softest possible */}
      <radialGradient id="spark-fade">
        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
        <stop offset="8%" stopColor="white" stopOpacity="0.22" />
        <stop offset="20%" stopColor="white" stopOpacity="0.10" />
        <stop offset="38%" stopColor="white" stopOpacity="0.04" />
        <stop offset="55%" stopColor="white" stopOpacity="0.015" />
        <stop offset="75%" stopColor="white" stopOpacity="0.003" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>

      <mask id="spark-mask">
        <rect width="1920" height="960" fill="black" />
        <ellipse
          id="spark-mask-ellipse"
          rx={300}
          ry={600}
          fill="url(#spark-fade)"
          style={{ transition: 'none' }}
        />
      </mask>
    </svg>
  )
}
