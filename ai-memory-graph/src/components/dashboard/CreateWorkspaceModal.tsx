"use client"

import * as React from "react"
import { X, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string, description: string) => void
}

export function CreateWorkspaceModal({ isOpen, onClose, onCreate }: CreateWorkspaceModalProps) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [error, setError] = React.useState("")

  // Focus and reset state when opening modal
  React.useEffect(() => {
    if (isOpen) {
      setTitle("")
      setDescription("")
      setError("")
    }
  }, [isOpen])

  // Handle escape key to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Workspace name is required")
      return
    }
    onCreate(title.trim(), description.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with strong blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#0d1321]/95 border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-blue-500/5 z-[101] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Subtle top light reflection glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        
        {/* Decorative corner blur glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-blue-600/10 blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
                Create Workspace
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                Initialize a new virtual second brain
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Workspace Name *
            </label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (e.target.value.trim()) setError("")
              }}
              placeholder="e.g. Brainstorming, Java Spring Boot"
              className={error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}
              autoFocus
            />
            {error && (
              <span className="text-[10px] text-red-400 font-medium pl-1">{error}</span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize the core topics and purpose..."
              className="flex min-h-[80px] w-full rounded-lg border border-slate-800/80 bg-[#161c2c]/40 backdrop-blur-sm px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-xs h-9 px-4 font-semibold hover:bg-slate-800/30"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="text-xs h-9 px-5 font-semibold bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/10"
            >
              Start
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
