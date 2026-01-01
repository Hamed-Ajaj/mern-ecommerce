import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { toast } from "sonner"
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuthStore } from '../store/useAuthStore'

const Login = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // 1️⃣ Login (sets cookie)
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error("Invalid credentials")
      }

      // 2️⃣ Fetch current user
      const meRes = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      })

      if (!meRes.ok) {
        throw new Error("Failed to fetch user")
      }

      const user = await meRes.json()

      console.log(user)
      // 3️⃣ Store user in Zustand
      setUser(user)

      toast.success(`Welcome back ${user.username}`)
      navigate("/")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unexpected error"
      )
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center justify-center px-6 py-16">
      <Card className="w-full max-w-lg rounded-[28px] border-black/10 bg-white/90 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
        <CardHeader className="space-y-2 px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Account access
          </p>
          <CardTitle className="font-display text-3xl text-stone-900">
            Sign in to the studio
          </CardTitle>
          <p className="text-sm text-stone-600">
            Save your wishlist, track orders, and get early drop access.
          </p>
        </CardHeader>

        {user ? (
          <>
            <CardContent className="px-8">
              <div className="rounded-2xl border border-black/10 bg-[#f8f4ef] p-6">
                <p className="text-sm text-stone-600">You are signed in as</p>
                <p className="mt-2 text-lg font-semibold text-stone-900">
                  {user.username}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-full border border-black bg-black text-white transition hover:-translate-y-0.5"
                  >
                    <Link to="/products">Browse products</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setUser(null)
                    }}
                    className="rounded-full border-black/10"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <form className="space-y-5 px-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-stone-600">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder="example@gmail.com"
                className="h-11 rounded-full border-black/10 bg-white px-4 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-stone-600">
                Password
              </Label>
              <Input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="******"
                className="h-11 rounded-full border-black/10 bg-white px-4 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="h-11 cursor-pointer w-full rounded-full border border-black bg-black text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Continue
            </Button>
            <p className="text-center text-xs text-stone-500">
              By continuing you agree to receive the studio drop notes.
            </p>
          </form>
        )}
        <CardFooter className="px-8 pb-8" />
      </Card>
    </div>
  )
}

export default Login
