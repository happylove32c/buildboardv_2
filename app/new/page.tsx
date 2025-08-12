"use client"

import { supabase } from "@/lib/supabaseClient" // import your supabase client
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewIdea() {
  const [idea, setIdea] = useState("")
  const [tag, setTag] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const router = useRouter()

  const handleSelect = (value: string) => {
    setTag(value === tag ? "" : value)
  }

const handleSubmit = async () => {
  if (!idea.trim()) return

  setLoading(true)
  try {
    // Call your Next.js API to get AI-generated title and MVP
    const response = await fetch("/api/generateMvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawIdea: idea }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate MVP")
    }

    const aiData = await response.json()
    const generatedTitle = aiData.title || tag || "Miscellaneous"
    const generatedMvp = aiData.mvp_description || ""

    // Get current user from supabase auth or your auth context
    const user = await supabase.auth.getUser()

    const { error } = await supabase.from("projects").insert([
      {
        user_id: user.data.user?.id,
        title: generatedTitle,
        raw_idea: idea,
        mvp_description: generatedMvp,
        build_steps: [],
        status: "draft",
      },
    ])

    if (error) {
      alert("Failed to save idea: " + error.message)
      setLoading(false)
      return
    }

    setIdea("")
    setTag("")
    router.push("/dashboard")
  } catch (err: any) {
    alert(err.message || "Unexpected error")
  } finally {
    setLoading(false)
  }
}
  // Adjust textarea height based on content

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [idea])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <Navbar />

      {/* Open Sidebar Button */}
      <div className="absolute top-4 left-4 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(true)}
          aria-label="Open sidebar"
          disabled={loading}
        >
          <Menu size={20} />
        </Button>
      </div>

      <AnimatePresence>{showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}</AnimatePresence>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What are we doing today?
        </motion.h1>

        <motion.div
          className="relative w-full max-w-2xl mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (idea.trim()) handleSubmit()
                }
              }}
              placeholder="Drop your thoughts, brainstorms, or ideas here..."
              rows={1}
              disabled={loading}
              className="w-full resize-none overflow-hidden flex justify-center items-center text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-3 pr-20 sm:pr-24 min-h-[3rem] max-h-40"
            />
            <AnimatePresence>
              {idea && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-[10%] right-2"
                >
                  <Button onClick={handleSubmit} className="px-3 sm:px-4 py-2 text-sm shadow-sm" disabled={loading}>
                    Send
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6 px-2">
          {["Important Project", "Save for Later", "Act Quickly", "Idea Push"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Button
                variant={tag === label ? "default" : "outline"}
                onClick={() => handleSelect(label)}
                className="text-xs sm:text-sm px-3 py-1.5"
                disabled={loading}
              >
                {label}
              </Button>
            </motion.div>
          ))}
        </div>

        {idea && (
          <motion.p
            className="text-center text-sm text-muted-foreground px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You’re saving this idea as <strong>{tag || "Miscellaneous"}</strong>.
          </motion.p>
        )}
      </main>
    </div>
  )
}
