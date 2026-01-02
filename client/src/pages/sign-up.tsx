import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = () => { }
  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center justify-center px-6 py-16">

      <Card className="w-full max-w-lg rounded-[28px] border-black/10 bg-white/90 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
        <CardHeader className="space-y-2 px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Create Account
          </p>
          <CardTitle className="font-display text-3xl text-stone-900">
            Sign Up to the studio
          </CardTitle>
          <p className="text-sm text-stone-600">
            Save your wishlist, track orders, and get early drop access.
          </p>
        </CardHeader>
        <form className="space-y-5 px-8" onSubmit={handleSubmit}>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm text-stone-600">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              placeholder="yourusername"
              className="h-11 rounded-full border-black/10 bg-white px-4 text-sm"
            />
          </div>
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

          <p className="text-center text-xs text-stone-500">
            Don't have and account? <Link className='underline' to="/sign-up">Sign up</Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default SignUpPage;
