"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  PlusSquare,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import AuthFormModal from "./AuthForm"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth() // 👈 auth context

  // Base links
  const baseLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/new", label: "New", icon: PlusSquare },
  ]

  // Only show dashboard if logged in
  const navLinks = user
    ? [...baseLinks, { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
    : baseLinks

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="hidden sm:flex fixed top-0 z-50 w-full border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
          <Link href="/" className="text-xl font-bold text-black">
            Buildboard
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium flex items-center gap-1 hover:text-black transition-colors",
                  pathname === href ? "text-black" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}

            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button onClick={() => setOpenModal(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-6 shadow-inner z-50">
        <div className="flex justify-around py-2">
          {navLinks.map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center text-xs transition-colors",
                pathname === href ? "text-black" : "text-muted-foreground"
              )}
            >
              <Icon className="h-6" />
            </Link>
          ))}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthFormModal open={openModal} setOpen={setOpenModal} />
    </>
  )
}
