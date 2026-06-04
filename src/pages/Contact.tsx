import { useState } from 'react'
import { contactContent } from '../data/siteContent'

const WEB3FORMS_ACCESS_KEY = '20af5097-622e-4c07-88d8-27df16193432'

interface FormState {
  name: string
  email: string
  selectedService: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  service?: string
  message?: string
}

const EMPTY_FORM: FormState = { name: '', email: '', selectedService: '', message: '' }

export default function Contact() {
  const content = contactContent

  const [form, setForm]             = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors]         = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess]   = useState(false)
  const [submitError, setSubmitError]   = useState(false)

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.name || form.name.trim().length < 2) {
      e.name = 'Full name is required'
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email address'
    }
    if (!form.selectedService) {
      e.service = 'Please select a service type'
    }
    if (!form.message || form.message.trim().length < 10) {
      e.message = 'Project details are required (min 10 characters)'
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
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:   WEB3FORMS_ACCESS_KEY,
          subject:      `New Inquiry — ${form.selectedService} | ${form.name.trim()}`,
          name:         form.name.trim(),
          email:        form.email.trim(),
          service_type: form.selectedService,
          message:      form.message.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setForm(EMPTY_FORM)
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleServiceSelect(service: string) {
    setForm((prev) => ({
      ...prev,
      selectedService: prev.selectedService === service ? '' : service,
    }))
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: undefined }))
    }
  }

  const addressLines = content.address.split('\n')

  return (
    <main className="pt-16 bg-background">
      {/* ===== HERO ===== */}
      <section className="pt-16 md:pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-secondary" />
            <span className="text-secondary text-xs font-label tracking-[0.3em] uppercase">
              Direct Line
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold text-on-surface leading-[1.05]">
            Get in{' '}
            <span className="italic text-primary">Touch</span>
          </h1>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="pb-20 md:pb-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left column — info + map */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              {/* Address */}
              <div>
                <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
                  Office Headquarters
                </p>
                {addressLines.map((line) => (
                  <p key={line} className="text-on-surface font-body text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              {/* Inquiries */}
              <div>
                <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
                  Inquiries
                </p>
                <a
                  href={`mailto:${content.email}`}
                  className="block text-on-surface hover:text-primary transition-colors duration-300 font-body text-sm mb-1"
                >
                  {content.email}
                </a>
                <p className="text-on-surface-variant font-body text-sm">
                  {content.phone}
                </p>
              </div>

              {/* Socials */}
              <div>
                <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
                  Socials
                </p>
                <div className="flex items-center gap-6">
                  {content.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-xs font-label tracking-widest uppercase"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="relative overflow-hidden aspect-video lg:aspect-square">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.1!2d-121.9560!3d37.7599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808ff64b6e1d3b1b%3A0x0!2s6+Balsam+Ln%2C+San+Ramon%2C+CA+94583!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trivenzaa Studio Location"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 pointer-events-none">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-primary-container animate-ping opacity-60" />
                  <span className="relative w-3 h-3 rounded-full bg-primary block" />
                </div>
                <span className="text-on-surface text-xs font-label tracking-wider uppercase bg-black/60 backdrop-blur-sm px-3 py-1">
                  Live Studio Location
                </span>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-8 md:p-12 shadow-2xl">

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
                      Inquiry submitted successfully!
                    </p>
                    <p className="text-green-400/80 text-xs font-body leading-relaxed">
                      Thank you for reaching out. Our team will contact you at your provided email address within 24 hours.
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
                    Something went wrong. Please try again or email us directly at {content.email}.
                  </p>
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <div>
                  <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-6">
                    Start Your Inquiry
                  </p>
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={`bg-transparent border-0 border-b text-on-surface font-body text-sm py-3 focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-on-surface-variant/40 ${
                      errors.name
                        ? 'border-error focus:border-error'
                        : 'border-outline-variant focus:border-primary'
                    }`}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-error text-xs font-body mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`bg-transparent border-0 border-b text-on-surface font-body text-sm py-3 focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-on-surface-variant/40 ${
                      errors.email
                        ? 'border-error focus:border-error'
                        : 'border-outline-variant focus:border-primary'
                    }`}
                    placeholder="your@email.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-error text-xs font-body mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service Type — mandatory */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                    Service Type <span className="text-error">*</span>
                  </p>
                  <div className={`flex flex-wrap gap-2 p-2 -m-2 ${errors.service ? 'outline outline-1 outline-error/50' : ''}`}>
                    {content.serviceTypes.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceSelect(service)}
                        className={`px-4 py-2 border text-xs font-label tracking-widest uppercase transition-all duration-300 ${
                          form.selectedService === service
                            ? 'bg-surface-container-highest border-primary text-primary'
                            : errors.service
                            ? 'border-error/60 text-on-surface-variant hover:border-error hover:text-on-surface'
                            : 'border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p id="service-error" className="text-error text-xs font-body flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                    Project Details <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className={`bg-transparent border-0 border-b text-on-surface font-body text-sm py-3 focus:outline-none focus:ring-0 transition-colors duration-300 resize-none placeholder:text-on-surface-variant/40 ${
                      errors.message
                        ? 'border-error focus:border-error'
                        : 'border-outline-variant focus:border-primary'
                    }`}
                    placeholder="Tell us about your project, timeline, and vision..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-error text-xs font-body mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>error</span>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full md:w-auto px-10 py-4 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-[0.3em] uppercase transition-all duration-300 hover:bg-inverse-primary shadow-primary-glow hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
