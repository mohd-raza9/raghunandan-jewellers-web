'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  MapPin,
  Minus,
  Menu,
  Plus,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'

const showroomPhone = '+919870368999'
const showroomPhoneDisplay = '098703 68999'
const whatsappNumber = '919870368999'
const instagramProfile = 'https://www.instagram.com/raghunandanjewellersnoida/'

const categories = [
  
  {
    name: 'Rings',
    image: '/images/rings.png',

  },
  {
    name: 'Necklaces',
    image: '/images/necklace.png',
  },
  {
    name: 'Earrings',
    image: '/images/Earrings.png',
  },
  {
    name: 'Bangles',
    image: '/images/bangles.png',
  },
  {
    name: 'Brooch',
    image: '/images/Brooch.png',
  },
  {
    name: 'Religious Idols & Murti',
    image: '/images/religious-idols.png',
  },
   {
    name: 'Bridal',
    image: '/images/Bridal.png',
  },
  {
    name: 'Gold',
    image: '/images/gold.png',
  },
  {
    name: 'Traditional',
    image: '/images/treditional.png',
  },
];

const primaryNavigation = [
  {
    label: 'Our Story',
    description: 'A family legacy, shaped by a love for fine jewellery.',
    links: [
      { label: 'Our legacy', href: '#story' },
      { label: 'The Raghunandan way', href: '#story' },
      { label: 'Visit our showroom', href: '#contact' },
    ],
    featureTitle: 'Made for the meaningful',
    featureImage: '/images/necklace.png',
    featureHref: '#story',
  },
  {
    label: 'Shop Online',
    description: 'Discover handcrafted pieces for every occasion.',
    links: [
      { label: 'Shop all jewellery', href: '/products' },
      { label: 'New launch', href: '#new-launch' },
      { label: 'Explore collections', href: '#collections' },
    ],
    featureTitle: 'Find your signature',
    featureImage: '/images/rings.png',
    featureHref: '/products',
  },
  {
    label: 'Jewellery',
    description: 'Explore our collection, crafted to be treasured for generations.',
    links: [
      { label: 'Rings', href: '#collections' },
      { label: 'Necklaces', href: '#collections' },
      { label: 'Earrings', href: '#collections' },
      { label: 'Bangles', href: '#collections' },
      { label: 'Brooches', href: '#collections' },
      { label: 'Religious idols & murtis', href: '#collections' },
    ],
    featureTitle: 'Explore every form',
    featureImage: '/images/Earrings.png',
    featureHref: '#collections',
  },
  {
    label: 'Contact Us',
    description: 'Our jewellery advisors are here to help you find your perfect piece.',
    links: [
      { label: 'Get in touch', href: '#contact' },
      { label: 'Visit Sector 18 showroom', href: '#contact' },
      { label: `Call ${showroomPhoneDisplay}`, href: `tel:${showroomPhone}` },
    ],
    featureTitle: 'Your piece is waiting',
    featureImage: '/images/bangles.png',
    featureHref: '#contact',
  },
  {
    label: 'Best Seller',
    description: 'The much-loved designs our clients return to, time and again.',
    links: [
      { label: 'Customer favourites', href: '#royally-created' },
      { label: 'Best-selling necklaces', href: '#royally-created' },
      { label: 'Best-selling earrings', href: '#royally-created' },
    ],
    featureTitle: 'Loved for a reason',
    featureImage: '/images/necklace.png',
    featureHref: '#royally-created',
  },
]

const newLaunches = [
  {
    name: 'Meher Edit',
    description: 'A celebration of bridal artistry',
    image: '/images/Bridal.png',
  },
  {
    name: 'Pillars of Time',
    description: 'Tradition, made timeless',
    image: '/images/necklace.png',
  },
  {
    name: 'Leafy Affair',
    description: 'Nature-inspired gold treasures',
    image: '/images/gold.png',
  },
  {
    name: 'A Golden Heirloom',
    description: 'Designed to be passed on',
    image: '/images/treditional.png',
  },
]

const products = [
  {
    name: 'The Ananya Necklace',
    code: 'RN-NK-024',
    price: 68500,
    image: '/images/necklace.png',
  },
  {
    name: 'Kundan Bloom Studs',
    code: 'RN-ER-018',
    price: 24800,
    image: '/images/Earrings.png',
  },
  {
    name: 'Meera Gold Bangle',
    code: 'RN-BG-011',
    price: 39500,
    image: '/images/bangles.png',
  },
  {
    name: 'Bridal Heritage Necklace',
    code: 'RN-BR-021',
    price: 92500,
    image: '/images/Bridal.png',
  },
  {
    name: 'Emerald Garden Jhumkas',
    code: 'RN-ER-032',
    price: 32750,
    image: '/images/Earrings.png',
  },
  {
    name: 'Temple Gold Pendant',
    code: 'RN-PD-014',
    price: 28900,
    image: '/images/religious-idols.png',
  },
  {
    name: 'Regal Kundan Brooch',
    code: 'RN-BR-008',
    price: 18750,
    image: '/images/Brooch.png',
  },
  {
    name: 'Maharani Gold Kada',
    code: 'RN-KD-019',
    price: 46500,
    image: '/images/gold.png',
  },
  {
    name: 'Rang Mahal Heritage Set',
    code: 'RN-TS-026',
    price: 78500,
    image: '/images/treditional.png',
  },
]

type Product = (typeof products)[number]
type CartItem = { product: Product; quantity: number }

const instagramReels = [
  { shortcode: 'DeJwlK6z_TW', url: 'https://www.instagram.com/p/DeJwlK6z_TW/?hl=en', title: 'A closer look at the craft', image: '/images/Bridal.png', productIndex: 3 },
  { shortcode: 'DdbeGWCzDf8', url: 'https://www.instagram.com/p/DdbeGWCzDf8/?hl=en', title: 'Jewellery made to be remembered', image: '/images/Earrings.png', productIndex: 1 },
  { shortcode: 'DcOCDdGzypv', url: 'https://www.instagram.com/p/DcOCDdGzypv/?hl=en', title: 'Details in every design', image: '/images/necklace.png', productIndex: 0 },
  { shortcode: 'DZr-zfrzOOM', url: 'https://www.instagram.com/p/DZr-zfrzOOM/?hl=en', title: 'A little golden inspiration', image: '/images/gold.png', productIndex: 7 },
  { shortcode: 'DZmItEMzu3L', url: 'https://www.instagram.com/p/DZmItEMzu3L/?hl=en', title: 'An heirloom in the making', image: '/images/treditional.png', productIndex: 8 },
  { shortcode: 'Db8U9pJzSsY', url: 'https://www.instagram.com/p/Db8U9pJzSsY/?hl=en', title: 'Celebrate your own story', image: '/images/bangles.png', productIndex: 2 },
]

function InstagramMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.3Z" />
      <path d="M8.5 8.1c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.5.7c-.2.2-.3.4-.1.7.3.5.8 1.1 1.3 1.5.6.5 1.2.8 1.6.9.3.1.5 0 .7-.2l.8-.9c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.2-.7 1.6-.5.5-1.2.7-1.9.7-.6 0-1.5-.2-2.8-.8-1.2-.6-2.3-1.5-3.2-2.6-.8-1-1.3-2.1-1.4-2.9-.1-.8.1-1.5.5-2.1Z" />
    </svg>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [activeOverlay, setActiveOverlay] = useState<'search' | 'cart' | null>(null)
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null)
  const [reelsMuted, setReelsMuted] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const newLaunchTrack = useRef<HTMLDivElement>(null)
  const productsTrack = useRef<HTMLDivElement>(null)
  const reelsTrack = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setActiveMobileSection(null)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  useEffect(() => {
    if (activeReelIndex === null) return
    function closeReel(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveReelIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveReelIndex((index) => index === null ? null : (index + instagramReels.length - 1) % instagramReels.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveReelIndex((index) => index === null ? null : (index + 1) % instagramReels.length)
      }
    }
    window.addEventListener('keydown', closeReel)
    return () => window.removeEventListener('keydown', closeReel)
  }, [activeReelIndex])

  const searchResults = products.filter((product) =>
    `${product.name} ${product.code}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  function addToCart(product: Product) {
    setCart((items) => {
      const existing = items.find((item) => item.product.code === product.code)
      if (existing) {
        return items.map((item) =>
          item.product.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...items, { product, quantity: 1 }]
    })
    setActiveOverlay('cart')
  }

  function updateCartQuantity(code: string, change: number) {
    setCart((items) =>
      items
        .map((item) =>
          item.product.code === code
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function checkoutUrl() {
    const orderLines = cart
      .map(({ product, quantity }) => `• ${product.name} (${product.code}) × ${quantity} — ₹${(product.price * quantity).toLocaleString('en-IN')}`)
      .join('\n')
    const message = `Namaste Raghunandan Jewellers, I would like to buy:\n${orderLines}\n\nTotal: ₹${cartTotal.toLocaleString('en-IN')}`
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  function scrollCarousel(track: HTMLDivElement | null, direction: -1 | 1) {
    if (!track) return
    const firstCard = track.firstElementChild
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : track.clientWidth * 0.8
    const maxScroll = track.scrollWidth - track.clientWidth
    const nextPosition = Math.max(0, Math.min(maxScroll, track.scrollLeft + direction * step))
    track.scrollTo({ left: nextPosition, behavior: 'instant' })
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#282622]">
      {/* STORE DETAILS */}
      <div className="border-y border-[#d8c2a7]/50 bg-[#f7ede3] text-[#9a7435]">
        <div className="mx-auto flex min-h-9 max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
          <p className="truncate text-[7px] font-medium uppercase tracking-[0.15em] sm:text-[9px] sm:tracking-[0.2em]">
            Sector 18, Noida <span className="px-1.5 text-[#c5a77e]">·</span>
            Open 11:30 AM – 7:30 PM
          </p>

          <nav className="hidden items-center gap-5 text-[8px] uppercase tracking-[0.2em] md:flex lg:gap-7">
            <a href="#story" className="transition-colors hover:text-[#282622]">
              Our legacy
            </a>
            <a href="#contact" className="transition-colors hover:text-[#282622]">
              FAQs
            </a>
            <a href="#contact" className="transition-colors hover:text-[#282622]">
              Visit store
            </a>
            <a
              href={`tel:${showroomPhone}`}
              className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[#282622]"
            >
              <Phone size={11} />
              {showroomPhoneDisplay}
            </a>
          </nav>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#282622]/10 bg-[#fcf9f5]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1380px] items-center justify-between gap-2 px-3 sm:h-[82px] sm:gap-4 sm:px-6 lg:px-12">
          {/* MOBILE MENU */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 shrink-0 items-center justify-center text-[#806648] transition-colors hover:text-[#9a7435] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          {/* LOGO */}
          <a href="#top" className="flex min-w-0 flex-1 items-center gap-2 leading-none sm:gap-3 lg:flex-initial">
            <Image
              src="/Golden Indian Bridal Portrait.png"
              alt="Raghunandan Jewellers bridal portrait"
              width={56}
              height={64}
              priority
              className="h-10 w-9 shrink-0 border border-[#c99d68]/70 object-cover object-center sm:h-[54px] sm:w-12"
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-serif text-[15px] uppercase tracking-[0.04em] min-[380px]:text-[17px] sm:text-[22px] sm:tracking-[0.12em]">
                Raghunandan
              </span>
              <span className="mt-1.5 truncate text-[6px] uppercase tracking-[0.2em] text-[#9a7435] min-[380px]:text-[7px] sm:text-[8px] sm:tracking-[0.32em]">
                Jewellers Legacy
              </span>
            </span>
          </a>

          {/* RIGHT ACTIONS */}
          <div className="ml-auto flex shrink-0 items-center gap-2 min-[380px]:gap-3 sm:gap-7">
            <button
              type="button"
              aria-label="Search jewellery"
              onClick={() => setActiveOverlay('search')}
              className="text-[#806648] transition-colors hover:text-[#9a7435]"
            >
              <Search size={19} strokeWidth={1.4} />
            </button>
            <a
              href="#collections"
              aria-label="Browse collections"
              className="hidden text-[#806648] transition-colors hover:text-[#9a7435] sm:block"
            >
              <Heart size={20} strokeWidth={1.35} />
            </a>
            <button
              aria-label="Shopping cart"
              className="relative"
              onClick={() => setActiveOverlay('cart')}
            >
              <ShoppingBag size={20} strokeWidth={1.35} className="text-[#806648]" />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#a57d35] text-[8px] text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="/products"
              className="border border-[#c99d68] px-2 py-2 text-[8px] uppercase tracking-[0.08em] text-[#9a7435] transition-colors hover:bg-[#9a7435] hover:text-white min-[380px]:px-3 sm:px-7 sm:py-3 sm:text-[9px] sm:tracking-[0.2em]"
            >
              Shop
            </a>
          </div>
        </div>

        {/* DESKTOP MEGA NAV */}
        <nav
          aria-label="Main navigation"
          className="relative hidden border-t border-[#282622]/10 lg:block"
          onMouseLeave={() => setActiveMegaMenu(null)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setActiveMegaMenu(null)
          }}
        >
          <div className="mx-auto flex h-[48px] max-w-[1380px] items-center justify-center gap-8 px-6 xl:gap-12">
            {primaryNavigation.map((item) => (
              <button
                key={item.label}
                type="button"
                aria-expanded={activeMegaMenu === item.label}
                aria-controls="main-mega-menu"
                onMouseEnter={() => setActiveMegaMenu(item.label)}
                onFocus={() => setActiveMegaMenu(item.label)}
                onClick={() =>
                  setActiveMegaMenu((current) =>
                    current === item.label ? null : item.label,
                  )
                }
                className={`inline-flex h-full items-center gap-2 whitespace-nowrap border-b text-[9px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeMegaMenu === item.label
                    ? 'border-[#a57d35] text-[#9a7435]'
                    : 'border-transparent text-[#806648] hover:text-[#9a7435]'
                }`}
              >
                {item.label}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeMegaMenu === item.label ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ))}
          </div>

          {activeMegaMenu && (
            <div
              id="main-mega-menu"
              className="absolute left-1/2 top-full z-[60] w-[min(1380px,calc(100vw-48px))] -translate-x-1/2 border border-[#d8c2a7]/70 bg-[#fcf9f5] shadow-[0_22px_50px_rgba(40,38,34,0.18)]"
            >
              {primaryNavigation
                .filter((item) => item.label === activeMegaMenu)
                .map((item) => (
                  <div key={item.label}>
                    <div className="grid gap-10 px-10 py-9 lg:grid-cols-[1fr_320px] xl:px-12">
                      <div className="flex flex-col items-start">
                        <p className="max-w-xl text-sm leading-6 text-[#806648]">
                          {item.description}
                        </p>
                        <h2 className="mb-4 mt-7 text-[9px] font-medium uppercase tracking-[0.28em] text-[#a57d35]">
                          {item.label}
                        </h2>
                        <div className="grid w-full grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
                          {item.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              onClick={() => setActiveMegaMenu(null)}
                              className="text-sm text-[#806648] transition-colors hover:text-[#a57d35]"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>

                      <a
                        href={item.featureHref}
                        onClick={() => setActiveMegaMenu(null)}
                        className="group relative hidden min-h-[220px] overflow-hidden bg-[#e8dfd1] lg:block"
                      >
                        <Image
                          src={item.featureImage}
                          alt=""
                          fill
                          sizes="320px"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17110d]/80 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <span className="mb-2 block text-[8px] uppercase tracking-[0.24em] text-[#e8c987]">
                            Raghunandan Jewellers
                          </span>
                          <span className="font-serif text-xl">
                            {item.featureTitle}
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#d8c2a7]/60 bg-[#f7ede3] px-10 py-3.5 xl:px-12">
                      <a
                        href={item.featureHref}
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#a57d35] transition-colors hover:text-[#282622]"
                      >
                        Explore {item.label}
                        <ArrowRight size={13} className="ml-2 inline" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-[9px] uppercase tracking-[0.18em] text-[#806648] transition-colors hover:text-[#282622]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-[100] bg-[#171411]/55 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <aside
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="flex h-dvh w-[min(88vw,390px)] flex-col overflow-y-auto overscroll-contain bg-[#fcf9f5] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex min-h-[76px] items-center justify-between border-b border-[#282622]/10 px-5">
                <a
                  href="#top"
                  className="flex items-center gap-2.5"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    src="/Golden Indian Bridal Portrait.png"
                    alt=""
                    width={38}
                    height={44}
                    className="h-10 w-8 border border-[#c99d68]/60 object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="font-serif text-base uppercase tracking-[0.08em]">Raghunandan</span>
                    <span className="mt-1 text-[7px] uppercase tracking-[0.25em] text-[#9a7435]">Jewellers Legacy</span>
                  </span>
                </a>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => {
                    setMenuOpen(false)
                    setActiveMobileSection(null)
                  }}
                  className="flex size-10 items-center justify-center text-[#806648] hover:text-[#9a7435]"
                >
                  <X size={21} />
                </button>
              </div>

              <nav className="flex-1 px-5 py-4">
                {primaryNavigation.map((item) => {
                  const expanded = activeMobileSection === item.label
                  return (
                    <div key={item.label} className="border-b border-[#282622]/10">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setActiveMobileSection(expanded ? null : item.label)}
                        className="flex min-h-[58px] w-full items-center justify-between gap-4 text-left font-serif text-[22px] text-[#282622]"
                      >
                        {item.label}
                        <ChevronDown
                          size={17}
                          className={`shrink-0 text-[#9a7435] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {expanded && (
                        <div className="grid gap-1 pb-4 pl-3">
                          <p className="pb-2 pr-4 text-[11px] leading-5 text-[#282622]/55">
                            {item.description}
                          </p>
                          {item.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              onClick={() => {
                                setMenuOpen(false)
                                setActiveMobileSection(null)
                              }}
                              className="flex min-h-10 items-center justify-between text-[12px] text-[#806648] transition-colors hover:text-[#9a7435]"
                            >
                              {link.label}
                              <ArrowRight size={13} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>

              <div className="border-t border-[#282622]/10 bg-[#f7ede3] p-5">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Namaste, I would like help choosing a jewellery piece.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 bg-[#a57d35] px-4 text-[9px] font-medium uppercase tracking-[0.15em] text-white"
                >
                  Chat with our team
                  <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          </div>
        )}
      </header>

      {activeOverlay === 'search' && (
        <div
          className="fixed inset-0 z-[120] bg-[#282622]/55 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setActiveOverlay(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Search jewellery"
            className="mx-auto max-w-2xl border border-[#d8c2a7]/70 bg-[#fcf9f5] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b border-[#282622]/15 px-5 py-4 sm:px-7">
              <Search size={20} className="shrink-0 text-[#9a7435]" />
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setActiveOverlay(null)
                }}
                placeholder="Search jewellery or product code"
                aria-label="Search jewellery or product code"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#282622]/40"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => {
                  setActiveOverlay(null)
                  setSearchQuery('')
                }}
                className="text-[#806648] hover:text-[#282622]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-7">
              {searchQuery.trim() ? (
                searchResults.length > 0 ? (
                  <div className="divide-y divide-[#282622]/10">
                    {searchResults.map((product) => (
                      <a
                        key={product.code}
                        href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setActiveOverlay(null)}
                        className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="relative size-16 shrink-0 overflow-hidden bg-[#eee9e0]">
                          <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-serif text-lg">{product.name}</span>
                          <span className="mt-1 block text-[9px] uppercase tracking-[0.16em] text-[#282622]/50">
                            {product.code}
                          </span>
                        </span>
                        <span className="text-xs text-[#9a7435]">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-[#282622]/60">
                        No matching pieces found in featured designs.
                      </p>
                      <a
                        href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                        className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#9a7435]"
                      >
                        Search the full collection
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  )
              ) : (
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#282622]/45">
                  Search our latest handcrafted pieces
                </p>
              )}
            </div>
          </section>
        </div>
      )}

      {activeOverlay === 'cart' && (
        <div
          className="fixed inset-0 z-[120] bg-[#282622]/50"
          onClick={() => setActiveOverlay(null)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Your shopping cart"
            className="ml-auto flex h-full w-full max-w-[460px] flex-col bg-[#fcf9f5] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#282622]/10 px-6 py-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9a7435]">Your selection</p>
                <h2 className="mt-1 font-serif text-2xl">Cart ({cartCount})</h2>
              </div>
              <button
                type="button"
                aria-label="Close shopping cart"
                onClick={() => setActiveOverlay(null)}
                className="flex size-9 items-center justify-center rounded-full bg-[#eee9e0]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center justify-between bg-[#d9a28e] px-5 py-3 text-xs text-white">
                <span>Personalised assistance on WhatsApp</span>
                <ChevronRight size={16} />
              </div>

              {cart.length === 0 ? (
                <div className="px-8 py-16 text-center">
                  <ShoppingBag size={28} className="mx-auto text-[#a57d35]" strokeWidth={1.2} />
                  <p className="mt-5 font-serif text-2xl">Your cart is waiting</p>
                  <p className="mt-2 text-sm leading-6 text-[#282622]/55">
                    Add a handcrafted piece and our team will help you complete your order.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveOverlay(null)
                      document.getElementById('royally-created')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="mt-6 border border-[#a57d35] px-5 py-3 text-[9px] uppercase tracking-[0.18em] text-[#9a7435]"
                  >
                    Explore pieces
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#282622]/10 px-5">
                  {cart.map(({ product, quantity }) => (
                    <article key={product.code} className="flex gap-4 py-5">
                      <a href="/products" onClick={() => setActiveOverlay(null)} className="relative size-24 shrink-0 overflow-hidden bg-[#eee9e0]">
                        <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
                      </a>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <a href="/products" onClick={() => setActiveOverlay(null)} className="font-serif leading-5 hover:text-[#9a7435]">
                            {product.name}
                          </a>
                          <button type="button" aria-label={`Remove ${product.name}`} onClick={() => setCart((items) => items.filter((item) => item.product.code !== product.code))} className="h-fit text-[#806648]/70 hover:text-[#282622]">
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#282622]/45">{product.code}</p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center border border-[#282622]/15">
                            <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateCartQuantity(product.code, -1)} className="p-2">
                              <Minus size={12} />
                            </button>
                            <span className="min-w-8 text-center text-xs">{quantity}</span>
                            <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateCartQuantity(product.code, 1)} className="p-2">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm text-[#9a7435]">₹ {(product.price * quantity).toLocaleString('en-IN')}</p>
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
                  <span>Subtotal</span>
                  <span className="font-medium">₹ {cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="mt-2 text-[10px] leading-5 text-[#282622]/50">
                  Our team will confirm availability, delivery and final details on WhatsApp.
                </p>
                <a
                  href={checkoutUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 bg-[#a57d35] px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#87642d]"
                >
                  Buy on WhatsApp
                  <ArrowRight size={14} />
                </a>
                <a href={`tel:${showroomPhone}`} className="mt-3 block text-center text-[10px] text-[#806648]">
                  Need help? Call {showroomPhoneDisplay}
                </a>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* =========================================================
          PREMIUM FULL-SCREEN VIDEO HERO
      ========================================================= */}
<section
  id="top"
  className="
    relative isolate overflow-hidden bg-[#120b08] text-white
    min-h-[calc(100svh-110px)]
    sm:min-h-[calc(100svh-120px)]
    lg:min-h-[calc(100svh-168px)]
  "
>
  {/* VIDEO */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="
      absolute inset-0
      h-full w-full
      object-cover
      object-center

      /* Mobile positioning */
      max-md:scale-[1.8]
      max-md:object-[58%_center]

      /* Desktop */
      md:scale-100
      md:object-center
    "
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>

  {/* MAIN DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/20" />

  {/* DESKTOP LEFT GRADIENT */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-r
      from-[#0d0806]/90
      via-[#0d0806]/45
      to-transparent
    "
  />

  {/* MOBILE GRADIENT */}
  <div
    className="
      absolute inset-0
      hidden
      max-md:block
      bg-gradient-to-b
      from-[#0d0806]/45
      via-[#0d0806]/20
      to-[#0d0806]/75
    "
  />

  {/* BOTTOM CINEMATIC GRADIENT */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-t
      from-[#0d0806]/75
      via-transparent
      to-transparent
    "
  />

  {/* =====================================================
      HERO CONTENT
  ===================================================== */}

  <div
    className="
      relative mx-auto flex w-full max-w-[1380px]
      items-center
      min-h-[calc(100svh-110px)]
      sm:min-h-[calc(100svh-120px)]
      lg:min-h-[calc(100svh-168px)]
      px-6
      md:px-12
      lg:px-20
      xl:px-24
    "
  >
    <div
      className="
        max-w-[560px]

        /* Mobile */
        max-md:w-full
        max-md:max-w-[330px]
        max-md:pt-[6vh]

        /* Desktop */
        md:max-w-[560px]
        md:pt-0
      "
    >
      {/* BRAND LINE */}
      <div
        className="
          mb-6
          flex items-center gap-3
          md:mb-8 md:gap-4
        "
      >
        <span
          className="
            h-px w-8 bg-[#d8b56d]
            md:w-10
          "
        />

        <span
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#e3c27a]

            md:text-[9px]
            md:tracking-[0.38em]
          "
        >
          Raghunandan Jewellers
        </span>
      </div>

      {/* HEADING */}
      <h1
        className="
          font-serif
          font-normal
          leading-[0.88]
          tracking-[-0.055em]
          text-[#f8f5ee]

          text-[3.45rem]

          sm:text-[4.2rem]

          md:text-[5.5rem]

          lg:text-[6.2rem]

          xl:text-[6.7rem]
        "
      >
        <span className="block">
          Jewellery
        </span>

        <span className="mt-1 block">
          <em className="font-normal italic text-[#dfbd73]">
            with a story.
          </em>
        </span>
      </h1>

      {/* DIVIDER */}
      <div
        className="
          mt-6 h-px w-12 bg-white/30
          md:mt-8 md:w-16
        "
      />

      {/* DESCRIPTION */}
      <p
        className="
          mt-5
          max-w-[340px]
          text-[11px]
          leading-6
          text-white/75

          sm:text-[12px]
          sm:leading-7

          md:mt-6
          md:max-w-[390px]
          md:text-[14px]
          md:leading-8
        "
      >
        Timeless Indian artistry, thoughtfully crafted for
        the moments that become part of you.
      </p>

      {/* BUTTONS */}
      <div
        className="
          mt-7
          flex
          flex-wrap
          items-center
          gap-5

          md:mt-9
          md:gap-6
        "
      >
        {/* PRIMARY */}
        <a
          href="#collections"
          className="
            group
            inline-flex
            min-h-[46px]
            items-center
            gap-4
            bg-[#dfbd73]
            px-5
            text-[8px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#201610]
            transition-all
            duration-300

            hover:bg-[#efd497]

            sm:min-h-[50px]
            sm:px-6
            sm:text-[9px]

            md:min-h-[52px]
            md:gap-5
            md:px-7
            md:text-[9px]
            md:tracking-[0.22em]
          "
        >
          Explore collection

          <ArrowRight
            size={14}
            strokeWidth={1.4}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </a>

        {/* SECONDARY */}
        <a
          href="#story"
          className="
            group
            inline-flex
            items-center
            gap-3
            text-[8px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-white/85

            md:text-[9px]
            md:tracking-[0.22em]
          "
        >
          Our heritage

          <span
            className="
              h-px w-6
              bg-white/40
              transition-all
              duration-300
              group-hover:w-9
              group-hover:bg-[#dfbd73]
            "
          />
        </a>
      </div>

      {/* BRAND DETAIL */}
      <div
        className="
          mt-8
          flex
          items-center
          gap-4
          text-[7px]
          uppercase
          tracking-[0.25em]
          text-white/40

          sm:mt-10
          md:mt-12
          md:gap-5
          md:text-[8px]
          md:tracking-[0.3em]
        "
      >
        <span>Est. 1987</span>

        <span className="h-3 w-px bg-white/20" />

        <span>Fine Indian Jewellery</span>
      </div>
    </div>
  </div>

  {/* =====================================================
      SCROLL
  ===================================================== */}

  <div
    className="
      absolute
      bottom-7
      left-1/2
      hidden
      -translate-x-1/2
      items-center
      gap-4
      md:flex
    "
  >
    <span className="text-[8px] uppercase tracking-[0.3em] text-white/45">
      Scroll to discover
    </span>

    <span className="h-8 w-px bg-white/25" />

    <span className="text-[12px] text-[#dfbd73]">
      ↓
    </span>
  </div>

  {/* RIGHT LABEL */}
  <div
    className="
      absolute
      bottom-9
      right-8
      hidden
      text-right
      lg:block
      xl:right-14
    "
  >
    <p className="text-[8px] uppercase tracking-[0.28em] text-white/35">
      Crafted for
    </p>

    <p className="mt-1 font-serif text-sm italic text-[#d8b56d]/80">
      generations
    </p>
  </div>
</section>
      <section
        id="collections"
        className="border-y border-[#282622]/10 bg-[#f3f0e9] px-6 py-20 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-10 flex flex-col gap-6 border-b border-[#282622]/15 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between md:pb-10">
            <div>
              <p className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#9a7435]">
                <span className="h-px w-8 bg-[#a57d35]" />
                Explore by form
              </p>

              <h2 className="mt-4 font-serif text-[2.85rem] leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Find your{' '}
                <em className="font-normal text-[#9a7435]">signature.</em>
              </h2>
            </div>

            <div className="flex items-end justify-between gap-5 md:max-w-[340px] md:flex-col md:items-start md:gap-4">
              <p className="max-w-[250px] text-[11px] leading-5 text-[#282622]/60 md:max-w-none">
                Thoughtfully crafted pieces for every story, celebration and
                everyday moment.
              </p>

              <a
                href="/products"
                className="inline-flex shrink-0 items-center gap-2 border-b border-[#9a7435]/50 pb-2 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-[#9a7435] hover:text-[#9a7435]"
              >
                View all pieces
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {categories.map((category, index) => (
              <a
                href="/products"
                key={category.name}
                className="group"
                aria-label={`Explore ${category.name} collection`}
              >
                <div className="relative aspect-[0.88] overflow-hidden bg-[#e7e0d4] sm:aspect-[1.08]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#17110d]/75 via-[#17110d]/5 to-transparent transition duration-500 group-hover:from-[#17110d]/85" />
                  <div className="absolute inset-[7px] border border-white/25 transition-colors duration-500 group-hover:border-[#e8c987]/70 sm:inset-3" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white sm:p-6">
                    <div>
                      <span className="mb-2 block text-[8px] uppercase tracking-[0.24em] text-[#e8c987]">
                        0{index + 1} / 06
                      </span>
                      <h3 className="max-w-[220px] font-serif text-lg leading-tight sm:text-2xl lg:text-[28px]">
                        {category.name}
                      </h3>
                    </div>

                    <span className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/45 transition duration-300 group-hover:border-[#e8c987] group-hover:bg-[#e8c987] group-hover:text-[#282622] sm:size-10">
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEW LAUNCH */}
      <section id="new-launch" className="border-y border-[#282622]/10 bg-[#fcf9f5] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-center gap-5 sm:mb-10">
            <span className="h-px flex-1 bg-[#282622]/15" />
            <h2 className="font-serif text-2xl uppercase tracking-[0.04em] sm:text-3xl">New Launch</h2>
            <span className="h-px flex-1 bg-[#282622]/15" />
          </div>

          <div className="relative">
            <div
              ref={newLaunchTrack}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
            >
              {newLaunches.map((launch, index) => (
                <a
                  key={launch.name}
                  href="/products"
                  className="group relative aspect-[1.3] min-w-[76%] snap-start overflow-hidden bg-[#e8dfd1] sm:min-w-[42%] lg:min-w-[calc((100%-3rem)/4)]"
                >
                  <Image
                    src={launch.image}
                    alt={launch.name}
                    fill
                    sizes="(max-width: 640px) 76vw, (max-width: 1024px) 42vw, 24vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#20140d]/55 via-[#20140d]/10 to-transparent transition-colors group-hover:from-[#20140d]/70" />
                  <div className="absolute inset-y-0 left-0 flex max-w-[80%] flex-col items-start justify-center p-6 text-white sm:p-8 lg:p-10">
                    <span className="mb-3 text-[8px] uppercase tracking-[0.28em] text-[#f1d79c]">
                      Collection 0{index + 1}
                    </span>
                    <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{launch.name}</h3>
                    <p className="mt-2 text-xs text-white/80 sm:text-sm">{launch.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 bg-[#fcf9f5] px-4 py-3 text-[8px] font-medium uppercase tracking-[0.18em] text-[#282622] transition-colors group-hover:bg-[#e8c987]">
                      Shop now
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous new launches"
                onClick={() => scrollCarousel(newLaunchTrack.current, -1)}
                className="pointer-events-auto -ml-3 flex size-10 items-center justify-center rounded-full bg-[#fcf9f5]/95 text-[#806648] shadow-md transition hover:bg-[#e8c987] sm:-ml-5"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next new launches"
                onClick={() => scrollCarousel(newLaunchTrack.current, 1)}
                className="pointer-events-auto -mr-3 flex size-10 items-center justify-center rounded-full bg-[#fcf9f5]/95 text-[#806648] shadow-md transition hover:bg-[#e8c987] sm:-mr-5"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROYALLY CREATED FOR YOU */}
      <section id="royally-created" className="bg-[#f7ede3] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-center gap-5 sm:mb-10">
            <span className="h-px flex-1 bg-[#c99d68]/45" />
            <h2 className="text-center font-serif text-xl uppercase tracking-[0.03em] text-[#9a624d] sm:text-3xl">
              Royally crafted for you
            </h2>
            <span className="h-px flex-1 bg-[#c99d68]/45" />
          </div>

          <div className="relative">
            <div
              ref={productsTrack}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
            >
              {products.map((product) => (
                <article
                  key={product.code}
                  className="min-w-[72%] snap-start bg-[#fcf9f5] sm:min-w-[40%] lg:min-w-[calc((100%-3.75rem)/4)]"
                >
                  <a href="/products" aria-label={`View ${product.name} in shop`} className="group block">
                    <div className="relative aspect-[1.18] overflow-hidden bg-white">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 24vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 bg-[#9a624d] px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-white">
                        Handcrafted
                      </span>
                    </div>
                    <div className="px-4 pb-2 pt-4 text-center">
                      <h3 className="font-serif text-lg leading-snug sm:text-xl">{product.name}</h3>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#282622]/45">{product.code}</p>
                      <p className="mt-2 text-sm font-medium text-[#9a624d]">₹ {product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </a>
                  <div className="px-4 pb-4 pt-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="flex w-full items-center justify-center gap-2 bg-[#a96851] px-4 py-3.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#87503f]"
                    >
                      <ShoppingBag size={14} />
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => scrollCarousel(productsTrack.current, -1)}
                className="pointer-events-auto -ml-3 flex size-10 items-center justify-center rounded-full bg-[#fcf9f5]/95 text-[#806648] shadow-md transition hover:bg-[#e8c987] sm:-ml-5"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next products"
                onClick={() => scrollCarousel(productsTrack.current, 1)}
                className="pointer-events-auto -mr-3 flex size-10 items-center justify-center rounded-full bg-[#fcf9f5]/95 text-[#806648] shadow-md transition hover:bg-[#e8c987] sm:-mr-5"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STORY
      ========================================================= */}

      <section
        id="story"
        className="bg-[#fcf9f5] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative">
            <div className="absolute -left-2 -top-2 size-20 border-l border-t border-[#b18a54]/70 sm:-left-3 sm:-top-3 sm:size-28" />
            <div className="relative aspect-[1.08] overflow-hidden bg-[#ded5c7]">
              <Image
                src="/images/image.png"
                alt="A close look at traditional Indian jewellery craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21160e]/45 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 text-[8px] uppercase tracking-[0.24em] text-white sm:bottom-7 sm:left-7">
                Crafted with care in Noida
              </p>
            </div>
            <div className="absolute -bottom-3 -right-2 size-20 border-b border-r border-[#b18a54]/70 sm:-bottom-4 sm:-right-3 sm:size-28" />
          </div>

          <div className="max-w-xl lg:py-8">
            <p className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#9a7435]">
              <span className="h-px w-8 bg-[#a57d35]" />
              A legacy of meaning
            </p>

            <h2 className="mt-5 font-serif text-[2.75rem] leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Jewellery that
              <br />
              feels like <em className="font-normal text-[#9a7435]">you.</em>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#282622]/65 sm:mt-8 sm:text-base sm:leading-8">
              At Raghunandan Jewellers, every piece begins with a story. For
              generations, our family has brought together the richness of
              Indian artistry and a thoughtful, modern eye—creating jewellery
              to mark the moments you will carry with you.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#282622]/65 sm:leading-8">
              From the first sketch to the final setting, each detail is chosen
              with care, so your piece feels personal today and treasured for
              years to come.
            </p>

            <div className="mt-7 grid max-w-sm grid-cols-2 gap-4 border-y border-[#282622]/12 py-4 sm:mt-9">
              <div>
                <p className="font-serif text-2xl text-[#9a7435]">1987</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#282622]/50">Our beginning</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#9a7435]">By hand</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#282622]/50">Made with intention</p>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-3 border-b border-[#282622]/50 pb-2 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#9a7435] hover:text-[#9a7435] sm:mt-9"
            >
              Discover our story
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* INSTAGRAM REELS */}
      <section id="instagram" className="overflow-hidden border-y border-[#282622]/10 bg-[#f3f0e9] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
            <div>
              <p className="flex items-center gap-3 text-[8px] font-medium uppercase tracking-[0.26em] text-[#9a7435]">
                <InstagramMark className="size-[13px]" />
                Follow our world
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                Trending <em className="font-normal text-[#9a7435]">looks.</em>
              </h2>
            </div>
          </div>

          <div className="relative">
            <div
              ref={reelsTrack}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
            >
              {instagramReels.map((reel, index) => {
                return (
                  <article
                    key={reel.shortcode}
                    className="min-w-[70%] snap-start overflow-hidden border border-[#282622]/10 bg-[#fcf9f5] sm:min-w-[38%] lg:min-w-[calc((100%-4rem)/5)]"
                  >
                    <button
                      type="button"
                      aria-label={`Open reel: ${reel.title}`}
                      onClick={() => {
                        setActiveReelIndex(index)
                        setReelsMuted(true)
                      }}
                      className="group block w-full text-left"
                    >
                      <div className="relative aspect-[9/14] overflow-hidden bg-[#e7dfd4]">
                        <Image
                          src={reel.image}
                          alt={reel.title}
                          fill
                          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 38vw, 19vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <video
                          src={`/Video${index + 1}.mp4`}
                          poster={reel.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={`Autoplaying reel: ${reel.title}`}
                          className="absolute inset-0 z-[1] size-full object-cover"
                        />
                        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#20140d]/70 via-transparent to-[#20140d]/10" />
                        <span className="absolute left-2 top-2 z-[3] inline-flex items-center gap-1.5 bg-[#282622]/75 px-2 py-1 text-[9px] text-white">
                          <InstagramMark className="size-[11px]" />
                          0{index + 1}
                        </span>
                        <span className="absolute inset-x-0 bottom-0 z-[3] p-4 font-serif text-lg leading-snug text-white">
                          {reel.title}
                        </span>
                      </div>
                    </button>
                    <a
                      href="/products"
                      aria-label={`Shop ${products[reel.productIndex].name} for ₹${products[reel.productIndex].price.toLocaleString('en-IN')}`}
                      className="flex min-h-[74px] items-center gap-2.5 border-t border-[#282622]/10 bg-white p-2 transition-colors hover:bg-[#fbf7f0] sm:gap-3 sm:p-2.5"
                    >
                      <Image
                        src={products[reel.productIndex].image}
                        alt=""
                        width={58}
                        height={58}
                        className="size-12 shrink-0 border border-[#282622]/10 object-cover sm:size-[54px]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 block text-[10px] leading-[1.35] text-[#282622] sm:text-[11px]">
                          {products[reel.productIndex].name}
                        </span>
                        <span className="mt-1.5 block text-xs font-semibold text-[#282622]">
                          ₹{products[reel.productIndex].price.toLocaleString('en-IN')}
                        </span>
                      </span>
                      <ArrowRight size={14} className="mr-1 shrink-0 text-[#9a7435]" />
                    </a>
                  </article>
                )
              })}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous Instagram reels"
                onClick={() => scrollCarousel(reelsTrack.current, -1)}
                className="pointer-events-auto -ml-3 flex size-9 items-center justify-center rounded-full bg-[#fcf9f5]/95 text-[#806648] shadow-md transition hover:bg-[#e8c987] sm:-ml-5 sm:size-10"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                type="button"
                aria-label="Next Instagram reels"
                onClick={() => scrollCarousel(reelsTrack.current, 1)}
                className="pointer-events-auto -mr-3 flex size-9 items-center justify-center rounded-full bg-[#fcf9f5]/95 text-[#806648] shadow-md transition hover:bg-[#e8c987] sm:-mr-5 sm:size-10"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {activeReelIndex !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#171411]/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Jewellery reel viewer"
          onClick={() => setActiveReelIndex(null)}
        >
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center opacity-30 blur-2xl"
            style={{ backgroundImage: `url("${instagramReels[activeReelIndex].image}")` }}
          />
          <button
            type="button"
            aria-label="Previous reel"
            onClick={(event) => {
              event.stopPropagation()
              setActiveReelIndex((activeReelIndex + instagramReels.length - 1) % instagramReels.length)
            }}
            className="absolute left-3 top-1/2 z-[2] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#282622] shadow-lg transition hover:bg-[#e8c987] sm:flex lg:left-10"
          >
            <ChevronLeft size={21} />
          </button>

          <div
            className="relative z-[1] flex h-[min(86vh,820px)] w-full max-w-[430px] flex-col overflow-hidden rounded-sm bg-[#282622] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 z-[3] flex items-center justify-between p-3 text-white">
              <span className="bg-black/35 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.16em]">
                Reel {String(activeReelIndex + 1).padStart(2, '0')} / {String(instagramReels.length).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={reelsMuted ? 'Unmute reel' : 'Mute reel'}
                  onClick={() => setReelsMuted((muted) => !muted)}
                  className="flex size-9 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm transition hover:bg-[#a57d35]"
                >
                  {reelsMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  type="button"
                  aria-label="Close reel"
                  onClick={() => setActiveReelIndex(null)}
                  className="flex size-9 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm transition hover:bg-[#a57d35]"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <video
              key={activeReelIndex}
              src={`/Video${activeReelIndex + 1}.mp4`}
              poster={instagramReels[activeReelIndex].image}
              autoPlay
              muted={reelsMuted}
              loop
              playsInline
              className="size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/75 via-black/20 to-transparent px-5 pb-6 pt-20 text-white">
              <p className="text-[8px] uppercase tracking-[0.2em] text-[#e8c987]">Raghunandan Jewellers</p>
              <h3 className="mt-2 font-serif text-2xl">{instagramReels[activeReelIndex].title}</h3>
            </div>
            <button
              type="button"
              aria-label="Next reel"
              onClick={() => setActiveReelIndex((activeReelIndex + 1) % instagramReels.length)}
              className="absolute inset-y-0 right-0 z-[2] flex w-12 items-center justify-center text-white/80 transition hover:bg-black/15 hover:text-white sm:hidden"
            >
              <ChevronRight size={24} />
            </button>
            <button
              type="button"
              aria-label="Previous reel"
              onClick={() => setActiveReelIndex((activeReelIndex + instagramReels.length - 1) % instagramReels.length)}
              className="absolute inset-y-0 left-0 z-[2] flex w-12 items-center justify-center text-white/80 transition hover:bg-black/15 hover:text-white sm:hidden"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <button
            type="button"
            aria-label="Next reel"
            onClick={(event) => {
              event.stopPropagation()
              setActiveReelIndex((activeReelIndex + 1) % instagramReels.length)
            }}
            className="absolute right-3 top-1/2 z-[2] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#282622] shadow-lg transition hover:bg-[#e8c987] sm:flex lg:right-10"
          >
            <ChevronRight size={21} />
          </button>
        </div>
      )}

      <section id="reviews" className="relative overflow-hidden bg-[#fcf9f5] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border border-[#c99d68]/15" />
        <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full border border-[#c99d68]/15" />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-[8px] uppercase tracking-[0.28em] text-[#9a7435]">A legacy, shared with you</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Customer <em className="font-normal text-[#9a7435]">reviews.</em>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#282622]/60 sm:text-sm">
              Hear directly from people who have visited and shopped with Raghunandan Jewellers.
            </p>
          </div>

          <div className="grid overflow-hidden border border-[#c99d68]/35 bg-[#f5f0e7] md:grid-cols-2">
            <div className="relative flex min-h-[235px] flex-col justify-between overflow-hidden bg-[#282622] p-7 text-[#fcf9f5] sm:p-10">
              <div className="absolute -right-12 -top-16 size-52 rounded-full border border-[#e8c987]/20" />
              <div className="absolute -right-5 -top-9 size-36 rounded-full border border-[#e8c987]/20" />
              <div className="relative flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-white font-sans text-xl font-semibold text-[#4285f4]">G</span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#e8c987]">Verified on Google</span>
              </div>
              <div className="relative mt-8">
                <h3 className="font-serif text-2xl">Read customer stories.</h3>
                <p className="mt-2 max-w-sm text-xs leading-6 text-white/60">
                  Explore customer feedback on Google, where it is published and maintained by the reviewers themselves.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Raghunandan+Jewellers+Noida"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 border border-[#e8c987]/60 px-4 text-[8px] uppercase tracking-[0.16em] text-[#f5d99c] transition-colors hover:bg-[#e8c987] hover:text-[#282622]"
                >
                  Read reviews on Google
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            <div className="flex min-h-[235px] flex-col justify-center p-7 sm:p-10">
              <span className="text-[8px] uppercase tracking-[0.2em] text-[#9a7435]">Your experience matters</span>
              <h3 className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">
                Have a story of your own?
              </h3>
              <p className="mt-3 max-w-md text-xs leading-6 text-[#282622]/60">
                Your honest review helps our team keep making every visit and every piece more meaningful.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Raghunandan+Jewellers+Noida"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 bg-[#a57d35] px-5 text-[8px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#87642d]"
              >
                Share your review
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer id="contact" className="bg-[#282622] px-5 text-[#f8f6f1]/70 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="relative -mt-6 overflow-hidden border border-[#e8c987]/25 bg-[radial-gradient(ellipse_at_85%_15%,rgba(232,201,135,0.18),transparent_35%),linear-gradient(110deg,#38342c,#282622_70%)] px-6 py-7 shadow-[0_18px_48px_rgba(0,0,0,0.18)] sm:-mt-8 sm:px-9 sm:py-8 lg:flex lg:items-center lg:justify-between lg:px-12">
            <div className="pointer-events-none absolute -right-8 -top-20 size-52 rounded-full border border-[#e8c987]/15" />
            <div className="relative">
              <p className="flex items-center gap-2 text-[8px] uppercase tracking-[0.22em] text-[#e8c987]">
                <Sparkles size={13} />
                Here for your special moments
              </p>
              <h2 className="mt-2 max-w-2xl font-serif text-2xl leading-tight text-[#fcf9f5] sm:text-3xl">
                A forever piece begins with a conversation.
              </h2>
              <p className="mt-2 text-[11px] leading-5 text-white/55">
                Talk to our jewellery team for personal guidance.
              </p>
            </div>
            <div className="relative mt-5 flex flex-col gap-2 sm:flex-row lg:mt-0">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Namaste, I would like help choosing a jewellery piece.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#e8c987] px-5 text-[8px] font-medium uppercase tracking-[0.14em] text-[#282622] transition-all hover:-translate-y-0.5 hover:bg-[#f0d59b]"
              >
                <WhatsAppMark className="size-4" />
                Chat on WhatsApp
              </a>
              <a
                href="/products"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-5 text-[8px] font-medium uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:border-[#e8c987] hover:text-[#e8c987]"
              >
                Explore the collection
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1fr] lg:gap-12 lg:py-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#top" className="inline-flex items-center gap-3">
                <Image
                  src="/Golden Indian Bridal Portrait.png"
                  alt="Raghunandan Jewellers bridal portrait"
                  width={54}
                  height={62}
                  className="h-12 w-10 border border-[#e8c987]/55 object-cover object-center"
                />
                <span className="flex flex-col">
                  <span className="font-serif text-xl uppercase tracking-[0.1em] text-[#fcf9f5] sm:text-2xl">
                    Raghunandan
                  </span>
                  <span className="mt-1.5 text-[7px] uppercase tracking-[0.28em] text-[#e8c987]">
                    Jewellers Legacy
                  </span>
                </span>
              </a>
              <p className="mt-5 max-w-xs text-xs leading-6 text-white/55">
                Jewellery for every chapter worth remembering. Thoughtfully
                chosen, beautifully crafted, and made to become part of your story.
              </p>
              <div className="mt-5 flex items-center gap-2.5">
                <a
                  href={instagramProfile}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow Raghunandan Jewellers on Instagram"
                  className="inline-flex size-10 items-center justify-center border border-white/25 text-[#e8c987] transition-colors hover:border-[#e8c987] hover:bg-[#e8c987] hover:text-[#282622]"
                >
                  <InstagramMark className="size-[18px]" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Namaste, I would like to know more about Raghunandan Jewellers.')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with Raghunandan Jewellers on WhatsApp"
                  className="inline-flex size-10 items-center justify-center border border-white/25 text-[#e8c987] transition-colors hover:border-[#e8c987] hover:bg-[#e8c987] hover:text-[#282622]"
                >
                  <WhatsAppMark className="size-[19px]" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#e8c987]">
                Explore
              </h2>
              <nav className="mt-5 flex flex-col items-start gap-3 text-xs">
                <a href="#new-launch" className="transition-colors hover:text-white">New launch</a>
                <a href="#royally-created" className="transition-colors hover:text-white">Royally crafted</a>
                <a href="#collections" className="transition-colors hover:text-white">Collections</a>
                <a href="/products" className="transition-colors hover:text-white">Shop all jewellery</a>
              </nav>
            </div>

            <div>
              <h2 className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#e8c987]">
                Our world
              </h2>
              <nav className="mt-5 flex flex-col items-start gap-3 text-xs">
                <a href="#story" className="transition-colors hover:text-white">Our story</a>
                <a href="#instagram" className="transition-colors hover:text-white">Reels &amp; videos</a>
                <a href="#reviews" className="transition-colors hover:text-white">Customer reviews</a>
                <a href="#contact" className="transition-colors hover:text-white">Contact us</a>
                <a href="#contact" className="transition-colors hover:text-white">Visit our showroom</a>
              </nav>
            </div>

            <div>
              <h2 className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#e8c987]">
                Visit us
              </h2>
              <p className="mt-5 flex items-start gap-2 text-xs leading-6">
                <MapPin size={15} className="mt-1 shrink-0 text-[#e8c987]" />
                <span>Sector 18, Noida<br />Open 11:30 AM – 7:30 PM</span>
              </p>
              <a
                href={`tel:${showroomPhone}`}
                className="mt-3 inline-flex items-center gap-2 text-xs transition-colors hover:text-white"
              >
                <Phone size={13} className="text-[#e8c987]" />
                {showroomPhoneDisplay}
              </a>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Namaste, I would like to know more about Raghunandan Jewellers.')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with Raghunandan Jewellers on WhatsApp"
                  className="inline-flex min-h-10 items-center gap-2 bg-[#e8c987] px-3.5 text-[8px] font-medium uppercase tracking-[0.1em] text-[#282622] transition-colors hover:bg-[#f0d59b]"
                >
                  <WhatsAppMark className="size-[17px]" />
                  WhatsApp us
                </a>
                <a
                  href={`tel:${showroomPhone}`}
                  className="inline-flex min-h-10 items-center gap-2 text-xs transition-colors hover:text-white"
                >
                  <Phone size={14} className="text-[#e8c987]" />
                  {showroomPhoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-[9px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Raghunandan Jewellers. All rights reserved.</p>
            <a href="#top" className="w-fit transition-colors hover:text-[#e8c987]">Back to top ↑</a>
            <p>Crafted with care, treasured for generations.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}