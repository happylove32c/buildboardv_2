"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Github, Mail, User, GanttChart } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

export default function AuthModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}){

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Get started by signing in with a provider.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6" alt="" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <img src="https://www.svgrepo.com/show/503359/github.svg" className="h-6" alt="" />
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
