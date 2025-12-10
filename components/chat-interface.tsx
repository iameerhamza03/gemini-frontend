"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, Mic, Video, Share2, Send } from "lucide-react"
import { useState, useRef } from "react"

interface ChatInterfaceProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatInterface({ sidebarOpen, onToggleSidebar }: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (prompt.trim()) {
      console.log("Sending:", prompt)
      setPrompt("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between p-4 border-b border-border/20"
      >
        <Button onClick={onToggleSidebar} variant="ghost" size="icon" className="hover:bg-card/50 transition-colors">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-sm font-medium text-muted-foreground">Stream Realtime</h1>
        <div className="w-10" />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            <span className="text-foreground">Tal to </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Gemini Live</span>
          </h2>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl mb-8"
        >
          <div
            className={`relative rounded-full transition-all duration-300 ${
              isFocused ? "bg-card/80 shadow-lg shadow-primary/20 ring-2 ring-primary/50" : "bg-card/40 shadow-md"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Start typing a prompt"
              className="w-full px-6 py-4 bg-transparent text-foreground placeholder-muted-foreground outline-none text-base"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-primary/20 text-primary transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <ActionButton icon={Mic} label="Talk" />
          <ActionButton icon={Video} label="Webcam" />
          <ActionButton icon={Share2} label="Share Screen" />
        </motion.div>
      </div>

      {/* Responsive adjustments */}
      <div className="hidden md:block" />
    </div>
  )
}

interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
}

function ActionButton({ icon: Icon, label }: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/50 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl hover:shadow-primary/20"
    >
      <Icon className="w-5 h-5" />
      {label}
    </motion.button>
  )
}
