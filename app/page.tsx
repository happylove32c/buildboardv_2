"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AuthFormModal from "@/components/AuthForm"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (user) {
      router.push("/dashboard") // or "/dashboard/username" if dynamic
    } else {
      setOpenModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        {user ? (
          <>
            <h1 className="text-xl font-semibold mb-2 text-gray-900">
              Hello, {user.username} 👋
            </h1>
            <p className="text-muted-foreground mb-6">Welcome back!</p>
          </>
        ) : (
          <>
            <img src="https://www.svgrepo.com/show/494799/ghost.svg" alt="" className="h-24" />
            <h1 className="text-xl font-semibold mb-2 text-gray-900">
              There's nothing here
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

      <AuthFormModal open={openModal} setOpen={setOpenModal} />
    </div>
  )
}
