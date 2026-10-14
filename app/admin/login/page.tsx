'use client'

import { FormEvent, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { ArrowRight, LockKeyhole } from 'lucide-react'

export default function AdminLoginPage() {
  const supabaseConfigured = isSupabaseConfigured()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(supabaseConfigured ? '' : 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart the dev server.')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabaseConfigured) return
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message.toLowerCase().includes('confirm') ? 'Please confirm your email before signing in.' : 'Invalid email or password.')
      setLoading(false)
      return
    }
    window.location.assign('/admin')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-6 text-[#282622]">
      <section className="w-full max-w-md border border-[#282622]/15 bg-[#eee9e0] p-8 md:p-12">
        <div className="mb-10 text-center"><LockKeyhole className="mx-auto mb-5 text-[#9a7435]" size={22} strokeWidth={1.2} /><p className="eyebrow">Raghunandan Jewellers</p><h1 className="mt-3 font-serif text-4xl">Admin <em>sign in.</em></h1><p className="mt-4 text-sm text-[#282622]/60">Manage your jewellery collection securely.</p></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.18em]">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="border border-[#282622]/20 bg-[#f8f6f1] px-4 py-3 text-sm normal-case tracking-normal outline-none focus:border-[#9a7435]" /></label>
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.18em]">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="border border-[#282622]/20 bg-[#f8f6f1] px-4 py-3 text-sm normal-case tracking-normal outline-none focus:border-[#9a7435]" /></label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button disabled={loading || !supabaseConfigured} className="mt-2 inline-flex items-center justify-center gap-3 bg-[#282622] px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-[#f8f6f1] disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'} {!loading && <ArrowRight size={14} />}</button>
        </form>
        <a href="/" className="mt-8 block text-center text-[10px] uppercase tracking-[0.18em] text-[#282622]/55">Return to storefront</a>
      </section>
    </main>
  )
}
