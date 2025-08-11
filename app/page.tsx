"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import AuthModal from "@/components/AuthModal"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Fetch user's full name if available
  useEffect(() => {
    if (!user) return
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setFullName(data.user.user_metadata.full_name)
      }
    }
    fetchUser()
  }, [user])

  const handleClick = () => {
    if (user) {
      console.log(user.email)
      router.push("/dashboard")
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        {user ? (
          <>
            <h1 className="text-xl font-semibold mb-2 text-gray-900">
              Hello, {fullName || user.email} 👋
            </h1>
            <p className="text-muted-foreground mb-6">Welcome back!</p>
          </>
        ) : (
          <>
            <img
              src="https://www.svgrepo.com/show/494799/ghost.svg"
              alt="Empty State"
              className="h-24"
            />
            <h1 className="text-xl font-semibold mb-2 text-gray-900">
              There&apos;s nothing here
            </h1>
            <p className="text-muted-foreground mb-6">
              Sign in to get started with your first project.
            </p>
          </>
        )}

        <Button onClick={handleClick}>
          {user ? "Go to Dashboard" : "Sign In"}
        </Button>
      </main>

      <AuthModal open={open} setOpen={setOpen} />
    </div>
  )
}
