import logo from "../assets/moniepoint-remove.png";

export default function Navbar() {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Logomark */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
            // style={{ background: '#0357EE', color: '#FFD85C' }}
          >
          <img src={logo} alt="Moniepoint logo" />
          </div>
  
          {/* App name */}
          <div>
            <span className="font-display font-semibold text-sm text-neutral-900">
              MonieCheck
            </span>
            <span className="hidden sm:inline text-neutral-400 text-sm mx-1.5">—</span>
            <span className="hidden sm:inline text-neutral-500 text-xs">
              SME Loan Eligibility
            </span>
          </div>
  
          {/* Secure badge */}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-neutral-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>256-bit encrypted</span>
          </div>
        </div>
      </nav>
    )
  }
  