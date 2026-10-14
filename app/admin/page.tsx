'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { ArrowLeft, LogOut, Pencil, Plus, Search, Trash2, X } from 'lucide-react'

type Product = { id: string; name: string; code: string; price: string; image_url: string; category: string; description: string | null }
type ProductForm = Omit<Product, 'id'>
const emptyForm: ProductForm = { name: '', code: '', price: '', image_url: '', category: 'Collection', description: '' }
const imageBucket = 'product-images'
const maxImageSize = 5 * 1024 * 1024

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!imagePreview.startsWith('blob:')) return
    return () => URL.revokeObjectURL(imagePreview)
  }, [imagePreview])

  useEffect(() => {
    let active = true
    void (async () => {
      if (!isSupabaseConfigured()) {
        setMessage('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart the dev server.')
        setLoading(false)
        return
      }
      try {
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        if (!user) {
          window.location.assign('/admin/login')
          return
        }
        if (active) await loadProducts()
      } catch (error) {
        if (active) {
          setMessage(`Could not connect to Supabase: ${error instanceof Error ? error.message : 'Unexpected error.'}`)
          setLoading(false)
        }
      }
    })()
    return () => { active = false }
  }, [])

  async function loadProducts() {
    const supabase = createClient()
    const { data, error } = await supabase.from('products').select('id,name,code,price,image_url,category,description').order('created_at', { ascending: false })
    if (error) setMessage('Could not load products.')
    else setProducts(data ?? [])
    setLoading(false)
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setImageFile(null)
    setImagePreview('')
    setForm({ name: product.name, code: product.code, price: product.price, image_url: product.image_url, category: product.category, description: product.description ?? '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() { setEditingId(null); setForm(emptyForm); setImageFile(null); setImagePreview(''); setMessage('') }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!imageFile && !editingId) {
      setMessage('Please choose an image for this product.')
      return
    }
    const supabase = createClient()
    setSaving(true); setMessage('')
    let uploadedPath: string | null = null
    try {
      let imageUrl = form.image_url
      if (imageFile) {
        const extension = imageFile.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
        const path = `${crypto.randomUUID()}.${extension}`
        const { data: uploadedImage, error: uploadError } = await supabase.storage.from(imageBucket).upload(path, imageFile, {
          cacheControl: '3600',
          contentType: imageFile.type,
          upsert: false,
        })
        if (uploadError) {
          setMessage(`Image upload failed: ${uploadError.message}. Check that the public "${imageBucket}" bucket exists and allows uploads.`)
          return
        }
        uploadedPath = uploadedImage.path
        imageUrl = supabase.storage.from(imageBucket).getPublicUrl(uploadedImage.path).data.publicUrl
      }

      const payload = { ...form, image_url: imageUrl, description: form.description || null }
      const result = editingId ? await supabase.from('products').update(payload).eq('id', editingId) : await supabase.from('products').insert(payload)
      if (result.error) {
        let errorMessage = result.error.code === '23505' ? 'Product code already exists.' : `Could not save product: ${result.error.message}`
        if (uploadedPath) {
          const { error: cleanupError } = await supabase.storage.from(imageBucket).remove([uploadedPath])
          if (cleanupError) errorMessage += ` Uploaded image cleanup failed: ${cleanupError.message}`
        }
        setMessage(errorMessage)
        return
      }

      setMessage(editingId ? 'Product updated.' : 'Product added.')
      resetForm()
      await loadProducts()
    } catch (error) {
      setMessage(`Could not save product: ${error instanceof Error ? error.message : 'Unexpected error.'}`)
    } finally {
      setSaving(false)
    }
  }

  async function deleteProduct(id: string) {
    const supabase = createClient()
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) setMessage('Could not delete product.')
    else { setMessage('Product deleted.'); await loadProducts() }
  }

  async function signOut() { const supabase = createClient(); await supabase.auth.signOut(); window.location.assign('/admin/login') }

  const visibleProducts = products.filter((product) => `${product.name} ${product.code} ${product.category}`.toLowerCase().includes(query.toLowerCase()))

  return <main className="min-h-screen bg-[#f8f6f1] text-[#282622]">
    <header className="border-b border-[#282622]/10 bg-[#eee9e0]"><div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-5 lg:px-12"><div><p className="eyebrow">Raghunandan Jewellers</p><h1 className="mt-1 font-serif text-3xl">Collection <em>admin.</em></h1></div><div className="flex items-center gap-5"><a href="/" className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] md:flex"><ArrowLeft size={14} /> Storefront</a><button onClick={signOut} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#282622]/60"><LogOut size={14} /> Sign out</button></div></div></header>
    <div className="mx-auto grid max-w-[1380px] gap-10 px-6 py-10 lg:grid-cols-[360px_1fr] lg:px-12">
      <section className="h-fit border border-[#282622]/15 bg-[#eee9e0] p-6"><div className="mb-6 flex items-start justify-between"><div><p className="eyebrow">{editingId ? 'Edit piece' : 'Add a piece'}</p><h2 className="mt-2 font-serif text-2xl">{editingId ? 'Update product' : 'New product'}</h2></div>{editingId && <button aria-label="Cancel edit" onClick={resetForm}><X size={18} /></button>}</div><form onSubmit={saveProduct} className="flex flex-col gap-4">{(['name','code','price','category'] as const).map((field) => <label key={field} className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.16em]">{field}<input required value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="border border-[#282622]/20 bg-[#f8f6f1] px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-[#9a7435]" /></label>)}<label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.16em]">Product image<input type="file" accept="image/*" required={!editingId} onChange={(event) => { const file = event.target.files?.[0] ?? null; if (file && !file.type.startsWith('image/')) { setMessage('Please select an image file.'); event.currentTarget.value = ''; return } if (file && file.size > maxImageSize) { setMessage('Image must be 5 MB or smaller.'); event.currentTarget.value = ''; return } setMessage(''); setImageFile(file); setImagePreview(file ? URL.createObjectURL(file) : '') }} className="border border-[#282622]/20 bg-[#f8f6f1] px-3 py-3 text-sm normal-case tracking-normal file:mr-3 file:border-0 file:bg-[#282622] file:px-3 file:py-2 file:text-[10px] file:uppercase file:tracking-[0.12em] file:text-[#f8f6f1]" /><span className="text-[10px] normal-case tracking-normal text-[#282622]/55">{editingId ? 'Choose a new image to replace the current one.' : 'Choose an image from your device (5 MB max).'}</span></label>{(imagePreview || form.image_url) && <div className="overflow-hidden border border-[#282622]/15 bg-white"><img src={imagePreview || form.image_url} alt="Product image preview" className="max-h-56 w-full object-contain" /></div>}<label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.16em]">Description<textarea value={form.description ?? ''} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={3} className="resize-none border border-[#282622]/20 bg-[#f8f6f1] px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-[#9a7435]" /></label>{message && <p role="status" className="text-sm text-[#9a7435]">{message}</p>}<button disabled={saving} className="inline-flex items-center justify-center gap-2 bg-[#282622] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#f8f6f1] disabled:opacity-60">{editingId ? <Pencil size={14} /> : <Plus size={14} />}{saving ? 'Saving…' : editingId ? 'Update product' : 'Add product'}</button></form></section>
      <section><div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Live catalogue</p><h2 className="mt-2 font-serif text-3xl">{products.length} <em>pieces.</em></h2></div><label className="flex items-center gap-2 border-b border-[#282622]/25 pb-2"><Search size={15} className="text-[#282622]/50" /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search collection" className="w-48 bg-transparent text-sm outline-none placeholder:text-[#282622]/40" /></label></div>{loading ? <p className="py-12 text-sm text-[#282622]/60">Loading collection…</p> : visibleProducts.length === 0 ? <p className="border border-dashed border-[#282622]/20 py-16 text-center text-sm text-[#282622]/60">No products found.</p> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((product) => <article key={product.id} className="border border-[#282622]/10 bg-[#eee9e0]"><div className="relative aspect-[1.05] overflow-hidden bg-white"><img src={product.image_url} alt={product.name} className="size-full object-cover" /></div><div className="p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-xl">{product.name}</h3><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#282622]/50">{product.code} · {product.category}</p></div><p className="text-xs text-[#9a7435]">{product.price}</p></div><div className="mt-5 flex gap-4 text-[10px] uppercase tracking-[0.16em]"><button onClick={() => startEdit(product)} className="inline-flex items-center gap-1 underline underline-offset-4"><Pencil size={13} /> Edit</button><button onClick={() => deleteProduct(product.id)} className="inline-flex items-center gap-1 text-red-800 underline underline-offset-4"><Trash2 size={13} /> Delete</button></div></div></article>)}</div>}</section>
    </div>
  </main>
}
