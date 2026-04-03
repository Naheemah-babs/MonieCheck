import { useState, useMemo } from 'react'
import { computeScore, formatNaira, getTierStyle } from '../utils/scoring'

// Lets the user adjust key inputs after seeing their results
// and watch the credit score update live
export default function WhatIfSimulator({ originalData }) {
  const [revenue, setRevenue] = useState(originalData.revenue)
  const [existingLoans, setExistingLoans] = useState(originalData.existingLoans)
  const [registration, setRegistration] = useState(originalData.registration)
  const [accountAge, setAccountAge] = useState(originalData.accountAge)

  // Recalculate whenever a slider/toggle changes
  const result = useMemo(() => {
    return computeScore({ ...originalData, revenue, existingLoans, registration, accountAge })
  }, [revenue, existingLoans, registration, accountAge, originalData])

  const tierStyle = getTierStyle(result.tier)

  const originalScore = computeScore(originalData).creditScore
  const scoreDiff = result.creditScore - originalScore

  return (
    <div className="mt-6 border border-neutral-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-100" style={{ background: '#F8F9FA' }}>
        <p className="text-sm font-semibold text-neutral-800">What-If Simulator</p>
        <p className="text-xs text-neutral-500 mt-0.5">
          Adjust inputs below and see how your score changes in real time
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Revenue slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Monthly Revenue
            </label>
            <span className="text-sm font-semibold" style={{ color: '#0357EE' }}>
              {formatNaira(revenue)}
            </span>
          </div>
          <input
            type="range"
            min={50000}
            max={2000000}
            step={50000}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
          />
          <div className="flex justify-between mt-1 text-xs text-neutral-400">
            <span>₦50K</span>
            <span>₦2M</span>
          </div>
        </div>

        {/* Loan history toggle */}
        <div>
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Existing Loans
          </label>
          <div className="flex gap-2">
            {[
              { value: 'none', label: 'None' },
              { value: 'one', label: 'One' },
              { value: 'multi', label: 'Multiple' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setExistingLoans(opt.value)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
                style={{
                  background: existingLoans === opt.value ? '#0357EE' : 'white',
                  color: existingLoans === opt.value ? 'white' : '#6C757D',
                  borderColor: existingLoans === opt.value ? '#0357EE' : '#DEE2E6',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* CAC toggle */}
        <div>
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            CAC Registration
          </label>
          <div className="flex gap-2">
            {[
              { value: 'cac', label: 'Registered' },
              { value: 'pending', label: 'Pending' },
              { value: 'none', label: 'None' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRegistration(opt.value)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
                style={{
                  background: registration === opt.value ? '#0357EE' : 'white',
                  color: registration === opt.value ? 'white' : '#6C757D',
                  borderColor: registration === opt.value ? '#0357EE' : '#DEE2E6',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live result */}
        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: tierStyle.bg }}
        >
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: tierStyle.text }}>
              Projected Score
            </p>
            <p className="text-2xl font-display font-bold" style={{ color: tierStyle.ring }}>
              {result.creditScore}
            </p>
            <p className="text-xs mt-0.5" style={{ color: tierStyle.text }}>
              Max loan: {formatNaira(result.offer.maxAmount)}
            </p>
          </div>

          {/* Score change indicator */}
          <div className="text-right">
            <span
              className="text-lg font-bold"
              style={{ color: scoreDiff >= 0 ? '#16A34A' : '#DC2626' }}
            >
              {scoreDiff >= 0 ? '+' : ''}{scoreDiff}
            </span>
            <p className="text-xs text-neutral-500 mt-0.5">vs your score</p>
          </div>
        </div>
      </div>
    </div>
  )
}
