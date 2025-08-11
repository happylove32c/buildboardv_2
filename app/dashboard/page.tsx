"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Hardcoded: force-check after 500ms just to simulate loading delay
    const timer = setTimeout(() => {
      if (!user) {
        router.push("/") // hardcoded redirect to home
      }
      setChecking(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [user, router])

  if (checking) {
    // Hardcoded loading screen
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Checking credentials...</p>
      </div>
    )
  }

  return <>{children}</>
}
