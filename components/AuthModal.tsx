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
import { Dispatch, SetStateAction, useState } from "react"
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog"

export default function AuthModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}){

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                <DialogContent className="p-6 space-y-6 z-50">
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                            <DialogDescription>
                                Get started by signing in with a provider.
                            </DialogDescription>
                    </DialogHeader>

                      <div className="grid gap-3 mt-4">
                        <Button
                            variant="outline"
                            className="w-full flex items-center p-8 gap-2"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6" alt="" />
                            Continue with Google
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full flex items-center p-8 gap-2"
                        >
                            <img src="https://www.svgrepo.com/show/503359/github.svg" className="h-6" alt="" />
                            Continue with GitHub
                        </Button>
                      </div>
                </DialogContent>
        </DialogPortal>
    </Dialog>
  )
}
