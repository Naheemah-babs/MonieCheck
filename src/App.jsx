import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import ResultPage from './pages/ResultPage'
import { computeScore } from './utils/scoring'

const SCREENS = { HOME: 'home', FORM: 'form', RESULT: 'result' }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME)
  const [formData, setFormData] = useState(null)
  const [result, setResult] = useState(null)

  function handleStart() {
    setScreen(SCREENS.FORM)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleFormComplete(data) {
    const scored = computeScore(data)
    setFormData(data)
    setResult(scored)
    setScreen(SCREENS.RESULT)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRestart() {
    setFormData(null)
    setResult(null)
    setScreen(SCREENS.HOME)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA' }}>
      <Navbar />
      <AnimatePresence mode="wait">
        {screen === SCREENS.HOME && <HomePage key="home" onStart={handleStart} />}
        {screen === SCREENS.FORM && <FormPage key="form" onComplete={handleFormComplete} />}
        {screen === SCREENS.RESULT && formData && result && (
          <ResultPage key="result" formData={formData} result={result} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  )
}
