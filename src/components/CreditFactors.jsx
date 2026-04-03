import { useEffect, useState } from 'react'
import { getFactorColor } from '../utils/scoring'

// Animates the factor bars on mount
export default function CreditFactors({ factors }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    // Small delay so the bars animate after the page enters
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
        Credit Factors
      </p>

      <div className="space-y-3">
        {factors.map((factor) => {
          const color = getFactorColor(factor.score)
          return (
            <div key={factor.label} className="flex items-center gap-3">
              {/* Factor label */}
              <span className="text-sm text-neutral-600 w-36 shrink-0">
                {factor.label}
              </span>

              {/* Bar track */}
              <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: animated ? `${factor.score}%` : '0%',
                    background: color,
                  }}
                />
              </div>

              {/* Score */}
              <span className="text-sm font-semibold text-neutral-800 w-7 text-right">
                {factor.score}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
