// components/PrivateRoute.tsx
"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/") // redirect to home if not logged in
    }
  }, [user, router])

  if (!user) return null // or show a loading spinner

  return <>{children}</>
}
