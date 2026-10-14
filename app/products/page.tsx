'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

type Product = {
  id: string
  name: string
  code: string
  price: string
  image_url: string
  category: string
}

type CartItem = { product: Product; quantity: number }

const showroomPhone = '+919870368999'
const showroomPhoneDisplay = '098703 68999'
const whatsappNumber = '919870368999'

function getNumericPrice(price: string) {
  const value = Number(price.replace(/[^\d.]/g, ''))
  return Number.isFinite(value) ? value : 0
}

function formatPrice(price: string) {
  const value = getNumericPrice(price)
  return value > 0 ? `₹ ${value.toLocaleString('en-IN')}` : price
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    setSearchQuery(new URLSearchParams(window.location.search).get('search') ?? '')
  }, [])

  useEffect(() => {
    let active = true

    async function loadProducts() {
      if (!isSupabaseConfigured()) {
        setError('The product collection is currently unavailable.')
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()
        const { data, error: queryError } = await supabase
          .from('products')
          .select('id,name,code,price,image_url,category')
          .order('created_at', { ascending: false })

        if (queryError) throw queryError
        if (active) setProducts(data ?? [])
      } catch {
        if (active) setError('Could not load the product collection. Please try again later.')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadProducts()
    return () => {
      active = false
    }
  }, [])

  const categories = [...new Set(products.map((product) => product.category.trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b))
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + getNumericPrice(item.product.price) * item.quantity,
    0,
  )
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase()
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !query || `${product.name} ${product.code} ${product.category}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  function addToCart(product: Product) {
    setCart((items) => {
      const existing = items.find((item) => item.product.id === product.id)
      if (existing) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...items, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(id: string, change: number) {
    setCart((items) =>
      items
        .map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const orderLines = cart
    .map(({ product, quantity }) => {
      const linePrice = getNumericPrice(product.price)
      const priceText = linePrice
        ? `₹${(linePrice * quantity).toLocaleString('en-IN')}`
        : 'Price to be confirmed'
      return `• ${product.name} (${product.code}) × ${quantity} — ${priceText}`
    })
    .join('\n')
  const whatsappMessage = `Namaste Raghunandan Jewellers, I would like to order:\n${orderLines}\n\n${cartTotal ? `Estimated total: ₹${cartTotal.toLocaleString('en-IN')}` : 'Please confirm the final price.'}`
  const checkoutUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#282622]">
      <header className="sticky top-0 z-40 border-b border-[#282622]/10 bg-[#fcf9f5]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[82px] lg:px-12">
          <a href="/" className="flex min-w-0 items-center gap-2.5 leading-none sm:gap-3">
            <Image
              src="/Golden Indian Bridal Portrait.png"
              alt="Raghunandan Jewellers bridal portrait"
              width={56}
              height={64}
              priority
              className="h-11 w-10 border border-[#c99d68]/70 object-cover object-center sm:h-[54px] sm:w-12"
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-serif text-[17px] uppercase tracking-[0.08em] sm:text-[22px] sm:tracking-[0.12em]">
                Raghunandan
              </span>
              <span className="mt-1.5 text-[7px] uppercase tracking-[0.26em] text-[#9a7435] sm:text-[8px] sm:tracking-[0.32em]">
                Jewellers Legacy
              </span>
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="/"
              className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#806648] transition-colors hover:text-[#9a7435] sm:inline-flex"
            >
              <ArrowLeft size={14} />
              Home
            </a>
            <a href="#catalogue" className="hidden text-[9px] uppercase tracking-[0.16em] text-[#806648] sm:block">
              Collections
            </a>
            <button
              type="button"
              aria-label={`Open cart, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative flex size-10 items-center justify-center text-[#806648] transition-colors hover:text-[#9a7435]"
            >
              <ShoppingBag size={20} strokeWidth={1.4} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-[#a57d35] text-[8px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href={`tel:${showroomPhone}`}
              className="hidden border border-[#c99d68] px-5 py-3 text-[8px] uppercase tracking-[0.16em] text-[#9a7435] transition-colors hover:bg-[#9a7435] hover:text-white md:block"
            >
              Call showroom
            </a>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#282622] text-[#fcf9f5]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgba(181,137,75,0.28),transparent_38%),linear-gradient(115deg,#282622_8%,#372d25_58%,#5a4430)]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-20">
          <div>
            <p className="flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-[#e8c987] sm:text-[9px]">
              <span className="h-px w-8 bg-[#e8c987]" />
              Raghunandan Jewellers · Est. 1987
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              The art of
              <br />
              <em className="font-normal text-[#e8c987]">being treasured.</em>
            </h1>
            <p className="mt-5 max-w-xl text-xs leading-6 text-white/65 sm:mt-7 sm:text-sm sm:leading-7">
              Discover heirloom-inspired jewellery, thoughtfully crafted for
              celebrations, milestones and all the moments in between.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.16em] text-white/55 lg:flex-col lg:items-end">
            <span>Hand-finished in India</span>
            <span className="hidden h-px w-12 bg-[#e8c987]/60 lg:block" />
            <span>Made to be yours</span>
          </div>
        </div>
        <div className="relative h-px bg-gradient-to-r from-transparent via-[#e8c987]/70 to-transparent" />
      </section>

      <section id="catalogue" className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-16">
        <div className="mb-8 flex flex-col gap-6 border-b border-[#282622]/12 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-[0.28em] text-[#9a7435]">The collection</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Find your <em className="font-normal text-[#9a7435]">forever piece.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[11px] leading-5 text-[#282622]/55">
            {loading ? 'Curating the collection…' : `${visibleProducts.length} thoughtfully selected ${visibleProducts.length === 1 ? 'piece' : 'pieces'}`}
          </p>
        </div>

        <div className="mb-8 space-y-5 sm:mb-10">
          <label className="flex max-w-xl items-center gap-3 border-b border-[#282622]/20 pb-3">
            <Search size={17} className="shrink-0 text-[#9a7435]" />
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by name, code or category"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#282622]/40"
            />
            {searchQuery && (
              <button type="button" aria-label="Clear search" onClick={() => setSearchQuery('')}>
                <X size={15} className="text-[#806648]" />
              </button>
            )}
          </label>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {['All', ...categories].map((category) => {
              const count = category === 'All'
                ? products.length
                : products.filter((product) => product.category.toLowerCase() === category.toLowerCase()).length
              const selected = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 border px-4 text-[8px] uppercase tracking-[0.14em] transition-colors sm:min-h-11 sm:px-5 ${
                    selected
                      ? 'border-[#9a7435] bg-[#9a7435] text-white'
                      : 'border-[#282622]/15 bg-[#fcf9f5] text-[#806648] hover:border-[#9a7435] hover:text-[#9a7435]'
                  }`}
                >
                  {category}
                  <span className={selected ? 'text-white/65' : 'text-[#282622]/40'}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[0.94] bg-[#e9e2d8]" />
                <div className="mt-4 h-4 w-2/3 bg-[#e9e2d8]" />
                <div className="mt-2 h-3 w-1/3 bg-[#e9e2d8]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p role="alert" className="border border-dashed border-[#282622]/20 py-16 text-center text-sm text-[#282622]/60">
            {error}
          </p>
        ) : visibleProducts.length === 0 ? (
          <div className="border border-dashed border-[#282622]/20 px-5 py-16 text-center">
            <p className="font-serif text-2xl">No pieces found.</p>
            <p className="mt-2 text-sm text-[#282622]/55">Try another search or choose a different category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('All')
              }}
              className="mt-5 text-[9px] uppercase tracking-[0.18em] text-[#9a7435] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12 xl:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <article key={product.id} className="group min-w-0">
                <div className="relative overflow-hidden border border-[#282622]/8 bg-[#eee9e0]">
                  <div className="relative aspect-[0.94] overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading={index < 4 ? 'eager' : 'lazy'}
                      className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 bg-[#fcf9f5]/90 px-2.5 py-1.5 text-[7px] uppercase tracking-[0.16em] text-[#806648]">
                      {product.category}
                    </span>
                    <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-[#fcf9f5]/90 text-[#806648]">
                      <Heart size={14} strokeWidth={1.4} />
                    </span>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Namaste, I am interested in ${product.name} (${product.code}).`)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Enquire about ${product.name} on WhatsApp`}
                      className="absolute inset-x-0 bottom-0 translate-y-full bg-[#282622]/90 py-3 text-center text-[8px] uppercase tracking-[0.18em] text-white transition-transform duration-300 group-hover:translate-y-0 focus:translate-y-0"
                    >
                      Ask about this piece
                    </a>
                  </div>
                </div>

                <div className="px-1 pt-4">
                  <div className="flex min-h-[58px] items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base leading-snug sm:text-lg">{product.name}</h3>
                      <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#282622]/45">
                        {product.code}
                      </p>
                    </div>
                    <p className="shrink-0 pt-0.5 text-[11px] text-[#9a7435]">{formatPrice(product.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 bg-[#a57d35] px-3 text-[8px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#87642d] sm:mt-4"
                  >
                    <ShoppingBag size={14} />
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-6 bg-[#282622] px-5 py-7 text-white/55 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.15em]">Raghunandan Jewellers · Est. 1987</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Namaste, I would like help choosing a jewellery piece.')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#e8c987] transition-colors hover:text-white"
          >
            <ShoppingBag size={14} />
            Need help choosing? WhatsApp us
            <ArrowRight size={13} />
          </a>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-[100] bg-[#282622]/55" onClick={() => setCartOpen(false)}>
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Your shopping cart"
            className="ml-auto flex h-full w-full max-w-[460px] flex-col bg-[#fcf9f5] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#282622]/10 px-6 py-5">
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#9a7435]">Your selection</p>
                <h2 className="mt-1 font-serif text-2xl">Cart ({cartCount})</h2>
              </div>
              <button type="button" aria-label="Close shopping cart" onClick={() => setCartOpen(false)} className="flex size-9 items-center justify-center rounded-full bg-[#eee9e0]">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <p className="bg-[#f7ede3] px-5 py-3 text-center text-[9px] uppercase tracking-[0.12em] text-[#9a7435]">
                Personal assistance from our jewellery team
              </p>
              {cart.length === 0 ? (
                <div className="px-8 py-16 text-center">
                  <ShoppingBag size={28} className="mx-auto text-[#a57d35]" strokeWidth={1.2} />
                  <p className="mt-5 font-serif text-2xl">Your cart is waiting</p>
                  <button type="button" onClick={() => setCartOpen(false)} className="mt-6 border border-[#a57d35] px-5 py-3 text-[8px] uppercase tracking-[0.18em] text-[#9a7435]">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#282622]/10 px-5">
                  {cart.map(({ product, quantity }) => (
                    <article key={product.id} className="flex gap-4 py-5">
                      <div className="size-24 shrink-0 overflow-hidden bg-[#eee9e0]">
                        <img src={product.image_url} alt={product.name} className="size-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <h3 className="font-serif leading-5">{product.name}</h3>
                          <button type="button" aria-label={`Remove ${product.name}`} onClick={() => setCart((items) => items.filter((item) => item.product.id !== product.id))} className="h-fit text-[#806648]/70 hover:text-[#282622]">
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#282622]/45">{product.code}</p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center border border-[#282622]/15">
                            <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, -1)} className="p-2"><Minus size={12} /></button>
                            <span className="min-w-8 text-center text-xs">{quantity}</span>
                            <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, 1)} className="p-2"><Plus size={12} /></button>
                          </div>
                          <p className="text-xs text-[#9a7435]">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#282622]/10 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span>Estimated subtotal</span>
                  <span className="font-medium">{cartTotal ? `₹ ${cartTotal.toLocaleString('en-IN')}` : 'Confirm on WhatsApp'}</span>
                </div>
                <p className="mt-2 text-[9px] leading-5 text-[#282622]/50">
                  Our team will confirm availability, final pricing and delivery directly with you.
                </p>
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 bg-[#a57d35] px-5 text-[9px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#87642d]"
                >
                  Buy on WhatsApp
                  <ArrowRight size={14} />
                </a>
                <a href={`tel:${showroomPhone}`} className="mt-3 block text-center text-[9px] text-[#806648]">
                  Call {showroomPhoneDisplay}
                </a>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}
