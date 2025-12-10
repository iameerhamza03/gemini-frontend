"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Trash2 } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const mockChats = [
  { id: 1, title: "React Performance Tips", timestamp: "2 hours ago" },
  { id: 2, title: "Next.js 15 Features", timestamp: "1 day ago" },
  { id: 3, title: "Tailwind CSS Best Practices", timestamp: "3 days ago" },
  { id: 4, title: "TypeScript Advanced Types", timestamp: "1 week ago" },
  { id: 5, title: "Web Performance Optimization", timestamp: "2 weeks ago" },
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [chats, setChats] = useState(mockChats)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handleDeleteChat = (id: number) => {
    setChats(chats.filter((chat) => chat.id !== id))
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <Button
              onClick={() => {}}
              className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredId(chat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                <button className="w-full text-left p-3 rounded-lg hover:bg-sidebar-accent/50 transition-colors duration-150 flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-sidebar-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">{chat.title}</p>
                    <p className="text-xs text-sidebar-foreground/60 mt-1">{chat.timestamp}</p>
                  </div>
                </button>
                {hoveredId === chat.id && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => handleDeleteChat(chat.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
            <p>© 2025 Gemini Live</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
