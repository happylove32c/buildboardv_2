"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AuthFormModal from "@/components/AuthForm"

export default function Home() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
          {/* <Ghost className="h-12 w-12 text-muted-foreground mb-4" /> */}
          
          <img src="https://www.svgrepo.com/show/494799/ghost.svg" alt="" className="h-24" />
          <h1 className="text-xl font-semibold mb-2 text-gray-900">
            There's nothing here
          </h1>

          <p className="text-muted-foreground mb-6">
            Sign in to get started with your first project.
          </p>

          <Button onClick={() => setOpenModal(true)}>
            Sign In
          </Button>
        </main>
      </div>

      {/* Mount modal */}
      <AuthFormModal open={openModal} setOpen={setOpenModal} />
    </>
  )
}