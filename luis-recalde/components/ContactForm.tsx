'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  message: string
}

// Replace YOUR_FORMSPREE_ID with your form ID — sign up free at formspree.io
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORMSPREE_ID'

const inputClass =
  'w-full px-4 py-3 bg-bg border border-foreground/15 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors text-sm'

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.name.trim() || form.name.length > 100) return setStatus('error')
    if (!emailRegex.test(form.email)) return setStatus('error')
    if (form.message.trim().length < 10 || form.message.length > 2000) return setStatus('error')
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-foreground/40 uppercase tracking-widest"
          >
            Nombre o alias gamer
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Tu nombre o alias"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-foreground/40 uppercase tracking-widest"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-xs font-medium text-foreground/40 uppercase tracking-widest"
        >
          ¿Qué estás buscando?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={inputClass + ' resize-none'}
          placeholder="¿Qué buscás? Cartas, torneos, videojuegos, una preventa... contanos."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 bg-foreground text-bg font-medium text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'success' && (
        <p role="status" className="text-sm text-primary text-center">
          Mensaje recibido — te respondemos pronto. ¡GG!
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400 text-center">
          Hubo un error al enviar. Escribinos directamente a info@rsgamesclub.com
        </p>
      )}
    </form>
  )
}
