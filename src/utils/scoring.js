// This file contains all the credit scoring logic.

export function computeScore(formData) {
    const { years, registration, revenue, expenses, existingLoans, accountAge } = formData
  
    // Each factor is scored from 0 to 100
    const revenueScore = Math.min(100, Math.round((revenue / 1_000_000) * 80) + (revenue > 100_000 ? 20 : 0))
  
    const yearsScore = (() => {
      const map = { 0: 10, 1: 40, 2: 65, 5: 85 }
      return map[years] ?? 85
    })()
  
    const registrationScore = registration === 'cac' ? 100 : registration === 'pending' ? 50 : 20
  
    const loanScore = existingLoans === 'none' ? 100 : existingLoans === 'one' ? 60 : 25
  
    const accountScore = accountAge === 'old' ? 100 : accountAge === 'mid' ? 65 : 35
  
    const profitMargin = revenue > 0 ? Math.max(0, (revenue - expenses) / revenue) : 0
    const cashFlowScore = Math.min(100, Math.round(profitMargin * 120))
  
    // Weighted average — revenue carries the most weight
    const overall = Math.round(
      revenueScore * 0.28 +
      yearsScore * 0.18 +
      registrationScore * 0.15 +
      loanScore * 0.15 +
      accountScore * 0.14 +
      cashFlowScore * 0.10
    )
  
    // Map 0–100 overall to 350–850 credit score range
    const creditScore = Math.max(350, Math.min(850, Math.round(350 + (overall / 100) * 500)))
  
    // Determine tier based on credit score
    let tier
    if (creditScore >= 750) tier = 'Excellent'
    else if (creditScore >= 650) tier = 'Good'
    else if (creditScore >= 550) tier = 'Fair'
    else tier = 'Limited'
  
    // Loan offer based on tier
    const offer = getLoanOffer(tier, revenue)
  
    return {
      creditScore,
      tier,
      overall,
      offer,
      factors: [
        { label: 'Monthly Revenue', score: revenueScore },
        { label: 'Business Maturity', score: yearsScore },
        { label: 'CAC Registration', score: registrationScore },
        { label: 'Loan History', score: loanScore },
        { label: 'Account Age', score: accountScore },
        { label: 'Cash Flow', score: cashFlowScore },
      ],
    }
  }
  
  function getLoanOffer(tier, revenue) {
    switch (tier) {
      case 'Excellent':
        return {
          maxAmount: Math.min(revenue * 18, 5_000_000),
          rate: '2.5% / month',
          tenor: '12 months',
          repayment: 'Flexible',
          caption: 'You qualify for our best rates and highest limits.',
        }
      case 'Good':
        return {
          maxAmount: Math.min(revenue * 12, 2_000_000),
          rate: '3.5% / month',
          tenor: '9 months',
          repayment: 'Monthly',
          caption: 'Strong profile. You qualify for a solid loan offer.',
        }
      case 'Fair':
        return {
          maxAmount: Math.min(revenue * 6, 500_000),
          rate: '4.5% / month',
          tenor: '6 months',
          repayment: 'Monthly',
          caption: 'You qualify, with room to improve your score over time.',
        }
      default:
        return {
          maxAmount: Math.min(revenue * 2, 100_000),
          rate: '5.5% / month',
          tenor: '3 months',
          repayment: 'Weekly',
          caption: 'Grow your MonieCheck activity to unlock better offers.',
        }
    }
  }
  
  // Color coding for each tier
  export function getTierStyle(tier) {
    switch (tier) {
      case 'Excellent': return { bg: '#DCFCE7', text: '#166534', ring: '#16A34A' }
      case 'Good': return { bg: '#DBEAFE', text: '#1E40AF', ring: '#3B82F6' }
      case 'Fair': return { bg: '#FEF9C3', text: '#854D0E', ring: '#EAB308' }
      default: return { bg: '#FEE2E2', text: '#991B1B', ring: '#EF4444' }
    }
  }
  
  // Color for factor bars
  export function getFactorColor(score) {
    if (score >= 70) return '#0357EE'
    if (score >= 40) return '#EAB308'
    return '#EF4444'
  }
  
  export function formatNaira(amount) {
    return '₦' + Math.round(amount).toLocaleString('en-NG')
  }
  