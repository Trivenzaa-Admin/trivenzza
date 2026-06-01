import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ─── Web3Forms Configuration ──────────────────────────────────────────────────
// Same key as Contact.tsx — get it from web3forms.com using trivenzaa@gmail.com
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY'
// ─────────────────────────────────────────────────────────────────────────────

const roles = ['Actors', 'Filmmakers', 'Cinematographers', 'Volunteers']

interface FormState {
  name: string
  role: string
  portfolio: string
  contact: string
  file: File | null
}

interface FormErrors {
  name?: string
  role?: string
  portfolio?: string
  contact?: string
}

const EMPTY_FORM: FormState = { name: '', role: '', portfolio: '', contact: '', file: null }

export default function JoinTeam() {
  const location = useLocation()
  const [form, setForm]                 = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors]             = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess]   = useState(false)
  const [submitError, setSubmitError]   = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const roleParam = params.get('role')
    if (roleParam && roles.includes(roleParam)) {
      setForm((prev) => ({ ...prev, role: roleParam }))
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location.search])

  function validate(): FormErrors {
    const e: FormErrors = {}

    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = 'Full name is required'
    }
    if (!form.role) {
      e.role = 'Please select a role'
    }
    if (form.portfolio.trim() && !/^https?:\/\/.+\..+/.test(form.portfolio.trim())) {
      e.portfolio = 'Please enter a valid URL (e.g. https://yoursite.com)'
    }
    if (!form.contact.trim()) {
      e.contact = 'Email or phone number is required'
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.trim())
      const isPhone = /^[\d\s+\-()\\.]{7,}$/.test(form.contact.trim())
      if (!isEmail && !isPhone) {
        e.contact = 'Please enter a valid email address or phone number'
      }
    }
    return e
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const payload = new FormData()
      payload.append('access_key', WEB3FORMS_ACCESS_KEY)
      payload.append('subject', `New Application — ${form.role} | ${form.name.trim()}`)
      payload.append('name', form.name.trim())
      payload.append('role', form.role)
      payload.append('portfolio', form.portfolio.trim() || 'Not provided')
      payload.append('contact', form.contact.trim())
      payload.append('to_email', 'trivenzaa@gmail.com')
      if (form.file) {
        payload.append('attachment', form.file)
      }

      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      })
      const data = await res.json()

      if (data.success) {
        setForm(EMPTY_FORM)
        if (fileInputRef.current) fileInputRef.current.value = ''
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 7000)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleRoleSelect(role: string) {
    setForm((prev) => ({ ...prev, role }))
    if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }))
  }

  const baseInputClass =
    'w-full bg-transparent border-0 border-b text-on-surface text-sm font-body py-3 focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-on-surface-variant/40'

  const inputClass = (field: keyof FormErrors) =>
    `${baseInputClass} ${
      errors[field]
        ? 'border-error focus:border-error'
        : 'border-outline-variant focus:border-primary'
    }`

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-14 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-label tracking-[0.3em] uppercase">Join the Team</span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface leading-[1.05] max-w-3xl mb-6">
            Be Part of <span className="italic text-primary">Trivenzaa</span>
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed max-w-xl mb-3">
            We're building an army of creators — actors, filmmakers, cinematographers, and storytellers.
          </p>
          <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed max-w-xl">
            If you're passionate, driven, and ready to create — this is your opportunity.
          </p>
        </div>
      </section>

      {/* ===== ROLES + FORM ===== */}
      <section className="py-12 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Left — roles */}
          <div>
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-6">
              Open Roles
            </p>
            <div className="flex flex-col gap-px bg-outline-variant/10">
              {roles.map((role, i) => (
                <div
                  key={role}
                  className="bg-surface-container-lowest px-6 py-5 flex items-center justify-between group hover:bg-surface-container-low transition-colors duration-300 cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-primary/40 text-xs font-label tracking-widest">0{i + 1}</span>
                    <span className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors duration-300">
                      {role}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 text-base">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 border border-outline-variant/20 bg-surface-container-low">
              <p className="text-on-surface-variant text-xs font-label tracking-[0.2em] uppercase mb-2">
                Don't see your role?
              </p>
              <p className="text-on-surface text-sm font-body leading-relaxed">
                Reach out anyway — we're always looking for exceptional talent, regardless of category.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef}>
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-6">
              Apply Now
            </p>

            {/* ── Success notification bubble ── */}
            {showSuccess && (
              <div className="flex items-start gap-3 mb-8 p-4 bg-green-950 border border-green-700">
                <span
                  className="material-symbols-outlined text-green-400 text-xl mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div>
                  <p className="text-green-300 text-sm font-body font-semibold mb-0.5">
                    Application submitted successfully!
                  </p>
                  <p className="text-green-400/80 text-xs font-body leading-relaxed">
                    Thanks for reaching out. Our team will review your application and contact you soon.
                  </p>
                </div>
              </div>
            )}

            {/* ── Send error notification ── */}
            {submitError && (
              <div className="flex items-start gap-3 mb-8 p-4 bg-error-container border border-error/40">
                <span
                  className="material-symbols-outlined text-error text-xl mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  error
                </span>
                <p className="text-on-error-container text-xs font-body leading-relaxed">
                  Something went wrong. Please try again or email us directly at trivenzaa@gmail.com.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleTextChange}
                  placeholder="Your full name"
                  className={inputClass('name')}
                />
                {errors.name && (
                  <p className="text-error text-xs font-body mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                  I am a... <span className="text-error">*</span>
                </p>
                <div className={`flex flex-wrap gap-2 p-2 -m-2 ${errors.role ? 'outline outline-1 outline-error/50' : ''}`}>
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRoleSelect(r)}
                      className={`px-4 py-2 text-xs font-label tracking-widest uppercase border transition-all duration-200 ${
                        form.role === r
                          ? 'border-primary bg-primary/10 text-primary'
                          : errors.role
                          ? 'border-error/60 text-on-surface-variant hover:border-error hover:text-on-surface'
                          : 'border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-error text-xs font-body flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Portfolio URL */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                  Portfolio / Reel URL <span className="text-on-surface-variant/40 normal-case tracking-normal font-body text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={form.portfolio}
                  onChange={handleTextChange}
                  placeholder="https://yourportfolio.com"
                  className={inputClass('portfolio')}
                />
                {errors.portfolio && (
                  <p className="text-error text-xs font-body mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                    {errors.portfolio}
                  </p>
                )}
              </div>

              {/* File upload */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                  Resume / Showreel <span className="text-on-surface-variant/40 normal-case tracking-normal font-body text-xs">(optional)</span>
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary text-xs font-label tracking-widest uppercase py-5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">upload_file</span>
                  {form.file ? form.file.name : 'Choose File'}
                </button>
                {form.file && (
                  <p className="text-on-surface-variant text-xs font-body flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>attach_file</span>
                    {(form.file.size / 1024 / 1024).toFixed(1)} MB
                    <button
                      type="button"
                      onClick={() => {
                        setForm((p) => ({ ...p, file: null }))
                        if (fileInputRef.current) fileInputRef.current.value = ''
                      }}
                      className="ml-2 text-error hover:underline"
                    >
                      Remove
                    </button>
                  </p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.mp4,.mov"
                  className="hidden"
                  onChange={(e) => setForm((p) => ({ ...p, file: e.target.files?.[0] ?? null }))}
                />
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                  Email or Phone <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleTextChange}
                  placeholder="your@email.com or +1 (555) 000-0000"
                  className={inputClass('contact')}
                />
                {errors.contact && (
                  <p className="text-error text-xs font-body mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start inline-flex items-center gap-3 px-10 py-4 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-[0.3em] uppercase transition-all duration-300 hover:bg-inverse-primary shadow-primary-glow hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
                {!isSubmitting && <span className="material-symbols-outlined text-base">arrow_forward</span>}
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  )
}
