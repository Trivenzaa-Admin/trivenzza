import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Join Team', to: '/join' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isContact = pathname === '/contact'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const activeLinkClass =
    'text-primary font-semibold border-b-2 border-primary pb-0.5 font-label text-sm tracking-widest uppercase transition-all duration-300'
  const inactiveLinkClass =
    'text-on-surface-variant hover:text-on-surface font-label text-sm tracking-widest uppercase transition-all duration-300'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/30' : ''
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpeg`}
              alt="Trivenzaa"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  isActive ? activeLinkClass : inactiveLinkClass
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className={`hidden md:flex items-center ${isContact ? 'invisible' : ''}`}>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-inverse-primary active:scale-95"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-surface-container-lowest z-[100] flex flex-col items-center justify-center gap-10 transition-all duration-500 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-6 flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-on-surface transition-colors"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        {/* Mobile logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Trivenzaa" className="h-12 w-auto object-contain mb-4" />
        </Link>

        {/* Mobile nav links */}
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-headline text-3xl font-bold italic'
                : 'text-on-surface font-headline text-3xl font-light hover:text-primary transition-colors duration-300'
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Mobile CTA */}
        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className={`mt-4 px-10 py-3 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-widest uppercase ${isContact ? 'invisible' : ''}`}
        >
          Start Project
        </Link>
      </div>
    </>
  )
}
