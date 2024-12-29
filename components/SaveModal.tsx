"use client"

import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog"
import { useAppSelector } from "@/lib/hooks"
import { Button } from "./ui/button"
import { Check, Copy, Share2, X } from 'lucide-react'
import { useState } from "react"
import { generateShareableUrl } from "@/lib/url-utils"
import { motion } from "framer-motion"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface SaveModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SaveModal({ isOpen, onClose }: SaveModalProps) {
  const [copied, setCopied] = useState(false)
  const { collection, size, selectedFace, selectedBand, totalPrice, sideImage } = useAppSelector((state) => state.watch)

  const handleCopyLink = async () => {
    const shareableUrl = generateShareableUrl()
    try {
      await navigator.clipboard.writeText(shareableUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full sm:max-w-[600px] p-0 gap-0 bg-white dark:bg-zinc-900 border-none">
      <VisuallyHidden>
        <DialogTitle>Configuration Saved</DialogTitle>
      </VisuallyHidden>
        <div className="relative w-full">
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-zinc-100/90 p-2 text-zinc-500 hover:text-zinc-600 hover:bg-zinc-200/90 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col sm:flex-row w-full">
       
            <div className="relative w-full sm:w-1/2 bg-[#F5F5F7] dark:bg-zinc-800">
              <div className="aspect-square relative">
                <img
                  src={`/images/side/${selectedFace?.id}_${selectedBand?.id}_side.jpg`}
                  alt="Watch Configuration"
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

           
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {collection}
                    </span>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      Configuration Saved
                    </h2>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Watch Details
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50">
                      {`${size.size} ${selectedFace.name}`}
                    </p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50">
                      {selectedBand.name}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Total Price
                    </label>
                    <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                      ${totalPrice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Share your configuration with others
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleCopyLink}
                    className="flex-1 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
                  >
                    {copied ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Copied!
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </motion.div>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'My Apple Watch Configuration',
                          text: `Check out my ${collection} configuration!`,
                          url: generateShareableUrl(),
                        })
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}