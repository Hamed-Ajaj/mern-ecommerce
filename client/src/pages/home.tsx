import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

const Home = () => {
  return (
    <div className="min-h-full relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#f4c78e]/50 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#d8a7b1]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-40" />
      </div>

      <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 lg:flex-row lg:items-center lg:gap-16 lg:pt-24">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-stone-500">
            New season edit
          </span>
          <h1 className="font-display text-balance text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            A curated commerce studio for bold interiors and tactile style.
          </h1>
          <p className="max-w-xl text-lg text-stone-600">
            Discover limited drops of modern essentials, handpicked textures, and
            the accessories that turn a space into a statement.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="rounded-full border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.15)]"
            >
              <Link to="/products">Shop the drop</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-black/10 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-black"
            >
              <Link to="/products">View all products</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 pt-6 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-900" />
              Artisan-first sourcing
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-900" />
              48-hour express dispatch
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-900" />
              Limited edition batches
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-stone-500">
              <span>Featured set</span>
              <span>Series 09</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                'Amber Weave Throw',
                'Marble Ridge Tray',
                'Frosted Glass Vase',
                'Linen Halo Cushion',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-[#f8f4ef] p-4"
                >
                  <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-[#d2b48c] via-[#f2d0a4] to-[#f5e6d3]" />
                  <p className="text-sm font-semibold text-stone-800">{item}</p>
                  <p className="text-xs text-stone-500">From $42</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
              <span className="font-medium text-stone-800">
                Members earn 12% back
              </span>
              <Button
                asChild
                variant="link"
                className="h-auto px-0 text-sm font-semibold text-stone-500"
              >
                <Link to="/login">Join now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Studio-grade materials',
            copy: 'Every piece is vetted for texture, weight, and longevity.',
          },
          {
            title: 'Seasonal styling notes',
            copy: 'Pair our drops with the palette guide included in each box.',
          },
          {
            title: 'Small-batch exclusives',
            copy: 'Only 200 pieces per drop to keep your space distinct.',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-[24px] border border-black/10 bg-white/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
          >
            <h3 className="font-display text-xl text-stone-900">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-stone-600">{feature.copy}</p>
          </div>
        ))}
      </section>

      <section className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-24 lg:flex-row lg:items-center">
        <div className="flex-1 rounded-[28px] border border-black/10 bg-white/80 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            The lounge edit
          </p>
          <h2 className="font-display mt-4 text-3xl text-stone-900">
            Build a space that feels collected, not crowded.
          </h2>
          <p className="mt-4 text-sm text-stone-600">
            Our styling set comes with textiles, ceramics, and ambient lighting
            that layer easily into modern living rooms.
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-black"
            >
              <Link to="/products">Explore bundles</Link>
            </Button>
            <Button
              asChild
              className="rounded-full border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <Link to="/products">Shop sets</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid gap-4 sm:grid-cols-2">
            {['Soft lamp glow', 'Woven textiles', 'Hand-thrown ceramics', 'Warm oak accents'].map(
              (label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-gradient-to-br from-white via-[#fdf4ea] to-[#f6e2d3] p-6"
                >
                  <p className="text-sm font-semibold text-stone-800">{label}</p>
                  <p className="mt-2 text-xs text-stone-500">
                    Curated for tactile warmth
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[28px] border border-black/10 bg-black px-8 py-10 text-white">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Studio notes
              </p>
              <h3 className="font-display mt-3 text-2xl">
                Get the drop list and styling notes.
              </h3>
              <p className="mt-2 text-sm text-white/70">
                One thoughtful email each week. No clutter.
              </p>
            </div>
            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
              />
              <Button
                type="button"
                className="h-11 rounded-full border border-white bg-white px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 cursor-pointer"
              >
                Join the list
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
