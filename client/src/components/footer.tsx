import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#f3eee6] text-stone-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#e7c9a8]/60 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#c4a7b8]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.06)_1px,_transparent_1px)] bg-[length:28px_28px] opacity-60" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-sm font-semibold">
                AE
              </span>
              <div className="leading-tight">
                <span className="block text-xs uppercase tracking-[0.35em] text-stone-500">
                  Atelier
                </span>
                <span className="font-display text-xl">Aster & Ember</span>
              </div>
            </div>
            <p className="text-sm text-stone-600">
              A tactile commerce studio for thoughtful interiors. Each drop is
              styled in-house and sourced from small-batch makers.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-stone-500">
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5">
                Slow-made
              </span>
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5">
                Small-batch
              </span>
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5">
                Studio-led
              </span>
            </div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Explore
              </p>
              <div className="grid gap-2">
                <Link className="w-fit text-stone-700 hover:text-black" to="/products">
                  Shop products
                </Link>
                <Link className="w-fit text-stone-700 hover:text-black" to="/products">
                  Styling sets
                </Link>
                <Link className="w-fit text-stone-700 hover:text-black" to="/products">
                  New arrivals
                </Link>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Studio
              </p>
              <div className="grid gap-2">
                <Link className="w-fit text-stone-700 hover:text-black" to="/login">
                  Member access
                </Link>
                <Link className="w-fit text-stone-700 hover:text-black" to="/sign-up">
                  Create account
                </Link>
                <span className="text-stone-500">hello@asterember.com</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Visit
              </p>
              <div className="grid gap-2 text-stone-600">
                <span>14 Mercer Street</span>
                <span>New York, NY 10012</span>
                <span>Mon–Sat · 10am–6pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Aster & Ember. All rights reserved.</span>
          <div className="flex flex-wrap gap-4 uppercase tracking-[0.25em] text-[11px]">
            <span>Privacy</span>
            <span>Shipping</span>
            <span>Returns</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
