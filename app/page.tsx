"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import AuthModal from "@/components/AuthModal"

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
          <Ghost className="h-12 w-12 text-muted-foreground mb-4" />

          <h1 className="text-xl font-semibold mb-2 text-gray-900">
            There's nothing here
          </h1>

          <p className="text-muted-foreground mb-6">
            Sign in to get started with your first project.
          </p>

          <Button onClick={() => setAuthOpen(true)}>
            Sign In
          </Button>
        </main>
      </div>

      {/* Mount modal */}
      <AuthModal open={authOpen} setOpen={setAuthOpen} />
    </>
  )
}
