import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '../../store/useAuthStore'


const ProfilePage = () => {
  const { user, loading } = useAuthStore()

  return (
    <div className="relative overflow-hidden">
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Profile
            </p>
            <h1 className="font-display mt-3 text-4xl text-stone-900">
              Your studio account
            </h1>
            <p className="mt-3 max-w-xl text-sm text-stone-600">
              Keep an eye on your drops, preferences, and saved styling sets.
              Account edits like password and username updates are coming soon.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Link to="/products">Browse new arrivals</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-black/10 bg-white/90 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] lg:col-span-2">
            <h2 className="font-display text-2xl text-stone-900">
              Account details
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              {loading ? 'Loading your profile…' : 'Here is your current profile data.'}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-[#f8f4ef] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Username
                </p>
                <p className="mt-3 text-sm font-semibold text-stone-900">
                  {user?.username || '—'}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f8f4ef] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Email
                </p>
                <p className="mt-3 text-sm font-semibold text-stone-900">
                  {user?.email || '—'}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f8f4ef] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Role
                </p>
                <p className="mt-3 text-sm font-semibold text-stone-900">
                  {user?.role || "Member"}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f8f4ef] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Status
                </p>
                <p className="mt-3 text-sm font-semibold text-stone-900">
                  Active · Drop insider
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-black/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Snapshot
              </p>
              <h3 className="mt-3 font-display text-xl text-stone-900">
                Your studio rhythm
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Saved edits</span>
                  <span className="font-semibold text-stone-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upcoming drops</span>
                  <span className="font-semibold text-stone-900">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rewards balance</span>
                  <span className="font-semibold text-stone-900">$24</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-black p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Coming soon
              </p>
              <h3 className="mt-3 font-display text-xl">
                Update password & profile
              </h3>
              <p className="mt-3 text-sm text-white/70">
                Profile editing tools are being built. We will notify you when
                updates are ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
