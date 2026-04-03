import { useEffect, useState } from 'react'
import { getTierStyle } from '../utils/scoring'

// Animates from 0 to the target credit score over ~1.2 seconds
export default function ScoreRing({ score, tier }) {
  const [displayScore, setDisplayScore] = useState(350)
  const [arcProgress, setArcProgress] = useState(0)

  const radius = 70
  const circumference = 2 * Math.PI * radius
  const tierStyle = getTierStyle(tier)

  useEffect(() => {
    const duration = 1200
    const start = Date.now()
    const startScore = 350

    function animate() {
      const elapsed = Date.now() - start
      const progress = Math.min(1, elapsed / duration)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)

      const current = Math.round(startScore + eased * (score - startScore))
      const arcPct = (current - 350) / (850 - 350)

      setDisplayScore(current)
      setArcProgress(arcPct)

      if (progress < 1) requestAnimationFrame(animate)
    }

    const frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [score])

  return (
    <div className="flex flex-col items-center">
      {/* SVG Ring */}
      <div className="relative w-44 h-44">
        <svg
          width="176"
          height="176"
          viewBox="0 0 176 176"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background track */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            fill="none"
            stroke="#E9ECEF"
            strokeWidth="12"
          />
          {/* Animated arc */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            fill="none"
            stroke={tierStyle.ring}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcProgress * circumference} ${circumference}`}
          />
        </svg>

        {/* Score number in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-bold text-3xl leading-none"
            style={{ color: tierStyle.ring }}
          >
            {displayScore}
          </span>
          <span className="text-xs text-neutral-500 mt-1 tracking-wide uppercase">
            Credit Score
          </span>
        </div>
      </div>

      {/* Tier badge */}
      <div
        className="mt-3 px-4 py-1 rounded-full text-xs font-semibold"
        style={{ background: tierStyle.bg, color: tierStyle.text }}
      >
        {tier}
      </div>
    </div>
  )
}
