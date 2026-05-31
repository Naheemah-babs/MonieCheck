import { motion } from 'framer-motion'

// Reusable animation 
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const stats = [
  { value: '10M+', label: 'Businesses served' },
  { value: '$22B', label: 'Processed monthly' },
  { value: '24hrs', label: 'Disbursement time' },
]

export default function HomePage({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
      

        {/* Eyebrow tag */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: '#E8EFFD', color: '#0357EE', borderColor: '#C7D9FB' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Powered by MonieCheck
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display font-bold text-4xl sm:text-5xl text-neutral-900 leading-tight mb-4 max-w-lg"
          style={{ letterSpacing: '-0.03em' }}
        >
          Know your loan
          <br />
          <span style={{ color: '#0357EE' }}>eligibility</span> in
          <br />
          under 2 minutes.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-neutral-500 text-base max-w-sm mb-8 leading-relaxed"
        >
          Answer a few questions about your business and get a personalised credit score with an instant loan offer.
        </motion.p>

        {/* CTA button */}
        <motion.button
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          onClick={onStart}
          className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg"
          style={{ background: '#0357EE', color: 'white', boxShadow: '0 8px 24px rgba(3, 87, 238, 0.3)' }}
          whileHover={{ y: -2, boxShadow: '0 12px 28px rgba(3, 87, 238, 0.35)' }}
          whileTap={{ scale: 0.97 }}
        >
          Check My Eligibility
        </motion.button>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-xs text-neutral-400 mt-3"
        >
          No credit impact. Takes less than 2 minutes.
        </motion.p>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="border-t border-neutral-200 bg-white"
      >
        <div className="max-w-lg mx-auto px-4 py-6 grid grid-cols-3 divide-x divide-neutral-100">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <p
                className="font-display font-bold text-xl mb-0.5"
                style={{ color: '#0357EE' }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-neutral-50 border-t border-neutral-200 px-4 py-4"
      >
        <div className="max-w-lg mx-auto flex flex-wrap justify-center gap-4 text-xs text-neutral-400">
          {['256-bit SSL encryption', 'CBN compliant', 'No credit impact', 'Instant results'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
