"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"

export default function NewIdea() {
  const [idea, setIdea] = useState("")
  const [tag, setTag] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const tags = ["Important Project", "Save for Later", "Act Quickly", "Idea Push"]

  const handleSelect = (value: string) => {
    setTag(prev => (prev === value ? "" : value))
  }

  const handleSubmit = () => {
    if (!idea.trim()) return
    console.log("Submitted Idea:", { idea, tag: tag || "Miscellaneous" })
    setIdea("")
    setTag("")
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [idea])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/* Sidebar Toggle Button */}
      <div className="absolute top-24 left-4 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(true)}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        {/* Title */}
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What are we doing today?
        </motion.h1>

        {/* Idea Input */}
        <motion.div
          className="relative w-full max-w-2xl mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <textarea
            ref={textareaRef}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder="Drop your thoughts, brainstorms, or ideas here..."
            rows={1}
            className="w-full resize-none overflow-hidden text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-3 pr-20 sm:pr-24 min-h-[3rem] max-h-40"
          />
          <AnimatePresence>
            {idea && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-2 right-2"
              >
                <Button
                  onClick={handleSubmit}
                  className="px-3 sm:px-4 py-2 text-sm shadow-sm"
                >
                  Send
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 px-2">
          {tags.map((label, i) => (
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
              >
                {label}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Tag Indicator */}
        {idea && (
          <motion.p
            className="text-center text-sm text-muted-foreground px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You’re saving this idea as{" "}
            <strong>{tag || "Miscellaneous"}</strong>.
          </motion.p>
        )}
      </main>
    </div>
  )
}
