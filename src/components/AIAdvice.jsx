import { useState, useEffect } from 'react'

// Calls the Anthropic Claude API to generate personalized loan improvement tips
// based on the user's actual form inputs
export default function AIAdvice({ formData, result }) {
  const [advice, setAdvice] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAdvice()
  }, [])

  async function fetchAdvice() {
    setLoading(true)
    setError(null)

    // Build a detailed prompt using the user's real inputs
    const prompt = `
You are a financial advisor for Nigerian SMEs at MonieCheck, a leading fintech company.

A business owner just checked their loan eligibility. Here are their details:
- Business name: ${formData.businessName}
- Business type: ${formData.businessType}
- Years in business: ${formData.years === 0 ? 'Less than 1 year' : formData.years === 1 ? '1-2 years' : formData.years === 2 ? '2-5 years' : '5+ years'}
- State: ${formData.state}
- CAC registration: ${formData.registration === 'cac' ? 'Registered' : formData.registration === 'pending' ? 'Pending' : 'Not registered'}
- Monthly revenue: ₦${formData.revenue?.toLocaleString()}
- Monthly expenses: ₦${formData.expenses?.toLocaleString()}
- Existing loans: ${formData.existingLoans}
- MonieCheck account age: ${formData.accountAge}
- Loan purpose: ${formData.purpose}
- Credit score: ${result.creditScore} (${result.tier})
- Pre-approved loan amount: ₦${result.offer.maxAmount?.toLocaleString()}

Give exactly 3 specific, actionable pieces of advice to help this business owner improve their loan eligibility and unlock higher credit limits. Be direct, practical, and specific to their situation. Reference their actual details.

Respond with ONLY a JSON array of 3 objects, each with "title" (short, 5 words max) and "detail" (2 sentences max, specific to their situation). No markdown, no extra text.

Example format:
[{"title":"Register with CAC now","detail":"Your unregistered status is your biggest limiting factor. Registration typically unlocks 40–60% higher loan limits at MonieCheck."},{"title":"...","detail":"..."}]
    `.trim()

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()
      const text = data.content[0].text.trim()

      // Parse the JSON response
      const parsed = JSON.parse(text)
      setAdvice(parsed)
    } catch (err) {
      // If API key is missing or call fails, show a placeholder message
      setError('Add your VITE_ANTHROPIC_API_KEY to .env to enable AI-powered advice.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mt-6 border border-neutral-200 rounded-2xl p-5">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          AI Financial Advice
        </p>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-neutral-100 rounded-full w-1/3 mb-2" />
              <div className="h-3 bg-neutral-100 rounded-full w-full mb-1" />
              <div className="h-3 bg-neutral-100 rounded-full w-4/5" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-6 border border-amber-200 rounded-2xl p-5 bg-amber-50">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          AI Advice
        </p>
        <p className="text-sm text-amber-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="mt-6 border border-neutral-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 border-b border-blue-100 flex items-center gap-2"
        style={{ background: '#EEF4FF' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0357EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p className="text-sm font-semibold" style={{ color: '#0357EE' }}>
          Personalized AI Advice
        </p>
      </div>

      {/* Tips */}
      <div className="divide-y divide-neutral-100">
        {advice.map((tip, index) => (
          <div key={index} className="px-5 py-4">
            <div className="flex items-start gap-3">
              {/* Number */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: '#0357EE', color: '#FFD85C' }}
              >
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800 mb-0.5">
                  {tip.title}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {tip.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
