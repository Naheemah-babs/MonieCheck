import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '../components/ProgressBar'

function FormGroup({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

function Select({ value, onChange, children, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  )
}

//  text / number input
function Input({ type = 'text', value, onChange, placeholder, prefix }) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
        style={{
          paddingLeft: prefix ? '2.25rem' : undefined,
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
    </div>
  )
}

//  validation error message
function FieldError({ message }) {
  if (!message) return null
  return <p className="text-xs text-red-500 mt-1">{message}</p>
}

// Page slide animation variants
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function FormPage({ onComplete }) {
  // Which step we are on — 1 or 2
  const [step, setStep] = useState(1)
  // Track direction for slide animation: 1 = forward, -1 = backward
  const [direction, setDirection] = useState(1)

  // Step 1 fields
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [years, setYears] = useState('')
  const [state, setState] = useState('')
  const [registration, setRegistration] = useState('')

  // Step 2 fields
  const [revenue, setRevenue] = useState('')
  const [expenses, setExpenses] = useState('')
  const [existingLoans, setExistingLoans] = useState('')
  const [accountAge, setAccountAge] = useState('')
  const [purpose, setPurpose] = useState('')

  // Validation errors — only shown after the user tries to advance
  const [errors, setErrors] = useState({})

  function validateStep1() {
    const e = {}
    if (!businessName.trim()) e.businessName = 'Please enter your business name'
    if (!businessType) e.businessType = 'Please select a business type'
    if (years === '') e.years = 'Please select years in business'
    if (!state) e.state = 'Please select your state'
    if (!registration) e.registration = 'Please select your registration status'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e = {}
    const rev = parseFloat(revenue)
    const exp = parseFloat(expenses)
    if (!revenue || isNaN(rev) || rev <= 0) e.revenue = 'Please enter a valid monthly revenue'
    if (!expenses || isNaN(exp) || exp < 0) e.expenses = 'Please enter your monthly expenses'
    if (exp >= rev) e.expenses = 'Expenses cannot exceed revenue'
    if (!existingLoans) e.existingLoans = 'Please select your loan status'
    if (!accountAge) e.accountAge = 'Please select your account age'
    if (!purpose) e.purpose = 'Please select a loan purpose'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function goNext() {
    if (step === 1 && validateStep1()) {
      setDirection(1)
      setErrors({})
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 2 && validateStep2()) {
      // Pass all collected data up to App so ResultPage can use it
      onComplete({
        businessName,
        businessType,
        years: parseInt(years),
        state,
        registration,
        revenue: parseFloat(revenue),
        expenses: parseFloat(expenses),
        existingLoans,
        accountAge,
        purpose,
      })
    }
  }

  function goBack() {
    setDirection(-1)
    setErrors({})
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <ProgressBar currentStep={step} />

      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Step 1 card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6">
              <h2
                className="font-display font-bold text-xl text-neutral-900 mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                Tell us about your business
              </h2>
              <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                This helps us find the right loan options for your situation.
              </p>

              <FormGroup label="Business Name">
                <Input
                  value={businessName}
                  onChange={setBusinessName}
                  placeholder="e.g. Fatima's Fashion Hub"
                />
                <FieldError message={errors.businessName} />
              </FormGroup>

              <FormGroup label="Business Type">
                <Select value={businessType} onChange={setBusinessType} placeholder="Select type">
                  <option>Retail / Trade</option>
                  <option>Food &amp; Beverage</option>
                  <option>Fashion &amp; Beauty</option>
                  <option>Logistics &amp; Delivery</option>
                  <option>Agriculture</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Other</option>
                </Select>
                <FieldError message={errors.businessType} />
              </FormGroup>

              <div className="grid grid-cols-2 gap-3">
                <FormGroup label="Years in Business">
                  <Select value={years} onChange={setYears} placeholder="Select range">
                    <option value="0">Under 1 year</option>
                    <option value="1">1 – 2 years</option>
                    <option value="2">2 – 5 years</option>
                    <option value="5">5+ years</option>
                  </Select>
                  <FieldError message={errors.years} />
                </FormGroup>

                <FormGroup label="State">
                  <Select value={state} onChange={setState} placeholder="Select state">
                    {['Lagos','Abuja','Kano','Rivers','Ogun','Enugu','Oyo','Kaduna','Anambra','Other'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                  <FieldError message={errors.state} />
                </FormGroup>
              </div>

              <FormGroup label="CAC Registration Status">
                <Select value={registration} onChange={setRegistration} placeholder="Select status">
                  <option value="cac">Registered with CAC</option>
                  <option value="pending">Registration pending</option>
                  <option value="none">Not registered</option>
                </Select>
                <FieldError message={errors.registration} />
              </FormGroup>

              <button className="btn-primary mt-2" onClick={goNext}>
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Step 2 card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6">
              <h2
                className="font-display font-bold text-xl text-neutral-900 mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                Financial details
              </h2>
              <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                Used to calculate your credit score. Your data is encrypted and never shared.
              </p>

              <FormGroup label="Average Monthly Revenue">
                <Input
                  type="number"
                  value={revenue}
                  onChange={setRevenue}
                  placeholder="500000"
                  prefix="₦"
                />
                <FieldError message={errors.revenue} />
              </FormGroup>

              <FormGroup label="Monthly Expenses">
                <Input
                  type="number"
                  value={expenses}
                  onChange={setExpenses}
                  placeholder="200000"
                  prefix="₦"
                />
                <FieldError message={errors.expenses} />
              </FormGroup>

              <div className="grid grid-cols-2 gap-3">
                <FormGroup label="Existing Loans">
                  <Select value={existingLoans} onChange={setExistingLoans} placeholder="Select">
                    <option value="none">No existing loans</option>
                    <option value="one">One active loan</option>
                    <option value="multi">Multiple loans</option>
                  </Select>
                  <FieldError message={errors.existingLoans} />
                </FormGroup>

                <FormGroup label="Account Age">
                  <Select value={accountAge} onChange={setAccountAge} placeholder="Select">
                    <option value="new">Under 6 months</option>
                    <option value="mid">6 months – 1 year</option>
                    <option value="old">Over 1 year</option>
                  </Select>
                  <FieldError message={errors.accountAge} />
                </FormGroup>
              </div>

              <FormGroup label="Loan Purpose">
                <Select value={purpose} onChange={setPurpose} placeholder="Select purpose">
                  <option>Stock / Inventory</option>
                  <option>Equipment Purchase</option>
                  <option>Business Expansion</option>
                  <option>Working Capital</option>
                  <option>Marketing</option>
                  <option>Other</option>
                </Select>
                <FieldError message={errors.purpose} />
              </FormGroup>

              {/* Tip callout */}
              <div
                className="rounded-xl p-3.5 mb-4 flex gap-3"
                style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                </svg>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Businesses with Moniepoint POS terminals active for over 6 months qualify for faster approval and higher limits.
                </p>
              </div>

              <button className="btn-primary" onClick={goNext}>
                Check My Eligibility
              </button>
              <button className="btn-secondary mt-2" onClick={goBack}>
                Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
