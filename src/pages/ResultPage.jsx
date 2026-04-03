import { motion } from 'framer-motion'
import ScoreRing from '../components/ScoreRing'
import CreditFactors from '../components/CreditFactors'
import WhatIfSimulator from '../components/WhatIfSimulator'
import ProgressBar from '../components/ProgressBar'
import { formatNaira, getTierStyle } from '../utils/scoring'

// Each section fades up with a staggered delay
function Section({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function ResultPage({ formData, result, onRestart }) {
  const { offer, creditScore, tier, factors } = result
  const tierStyle = getTierStyle(tier)

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <ProgressBar currentStep={3} />

      {/* Score section */}
      <Section delay={0}>
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 mb-4">
          <div className="flex flex-col items-center mb-6">
            <ScoreRing score={creditScore} tier={tier} />
            <p className="text-sm text-neutral-500 mt-3 text-center max-w-xs">
              {offer.caption}
            </p>
          </div>

          {/* Loan offer */}
          <div
            className="rounded-xl p-4 mb-5"
            style={{ background: '#E8EFFD', border: '1px solid #C7D9FB' }}
          >
            {/* Pre-approved label */}
            <div className="flex items-center gap-1.5 mb-3">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#16A34A' }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-xs font-semibold" style={{ color: '#0357EE' }}>
                Pre-Approved Offer
              </span>
            </div>

            {/* Loan amount */}
            <p
              className="font-display font-bold text-3xl mb-1"
              style={{ color: '#0357EE', letterSpacing: '-0.03em' }}
            >
              {formatNaira(offer.maxAmount)}
            </p>
            <p className="text-xs text-neutral-500 mb-4">
              Pre-approved for {formData.purpose}
            </p>

            {/* Offer details grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Interest Rate', value: offer.rate },
                { label: 'Repayment', value: offer.repayment },
                { label: 'Tenor', value: offer.tenor },
                { label: 'Disbursement', value: 'Same day' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-lg px-3 py-2.5"
                >
                  <p className="text-xs text-neutral-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-neutral-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Credit factors */}
          <CreditFactors factors={factors} />
        </div>
      </Section>

      {/* What-If Simulator */}
      <Section delay={0.15}>
        <WhatIfSimulator originalData={formData} />
      </Section>

      {/* AI Advice */}
      {/* <Section delay={0.25}>
        <AIAdvice formData={formData} result={result} />
      </Section> */}

      {/* Apply CTA */}
      <Section delay={0.35}>
        <div className="mt-4">
          <button
            className="w-full py-4 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
            style={{
              background: '#FFD85C',
              color: '#0244C4',
              boxShadow: '0 6px 20px rgba(255, 216, 92, 0.4)',
            }}
            onClick={() => alert('This would open the Moniepoint app to complete your application.')}
          >
            Apply on Moniepoint
          </button>

          <button
            className="btn-secondary mt-2"
            onClick={onRestart}
          >
            Start Over
          </button>

          <p className="text-xs text-neutral-400 text-center mt-4 leading-relaxed">
            This is a pre-eligibility check, not a guaranteed loan offer. Final approval is subject to Moniepoint's credit review policy.
          </p>
        </div>
      </Section>
    </div>
  )
}
