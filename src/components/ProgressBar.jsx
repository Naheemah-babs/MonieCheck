// Step progress indicator shown at the top of the form

const STEPS = ['Business Info', 'Financials', 'Your Results']

export default function ProgressBar({ currentStep }) {
  // currentStep is 1, 2, or 3
  const percent = (currentStep / STEPS.length) * 100

  return (
    <div className="mb-6">
      {/* Step labels */}
      <div className="flex justify-between mb-2">
        {STEPS.map((label, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isDone = stepNum < currentStep

          return (
            <div key={label} className="flex items-center gap-1.5">
              {/* Step circle */}
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                style={{
                  background: isDone ? '#0357EE' : isActive ? '#0357EE' : '#DEE2E6',
                  color: isDone || isActive ? 'white' : '#6C757D',
                }}
              >
                {isDone ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : stepNum}
              </div>
              <span
                className="text-xs font-medium hidden sm:block transition-colors duration-300"
                style={{ color: isActive ? '#0357EE' : isDone ? '#6C757D' : '#ADB5BD' }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress track */}
      <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%`, background: '#0357EE' }}
        />
      </div>

      {/* Step counter for mobile */}
      <p className="text-xs text-neutral-500 mt-2 sm:hidden">
        Step {currentStep} of {STEPS.length}
      </p>
    </div>
  )
}
