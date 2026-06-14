"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface WorkspaceItem {
  id: string
  title: string
  description: string
  iconName: string
  iconColor: string
  iconBgColor: string
  tags: string[]
  editedAt: string
  createdAt: string
  status: "ACTIVE" | "COMPLETED"
}

export interface ActivityItem {
  id: string
  time: string
  title: string
  description: string
  dotColor: string
  ringColor: string
}

interface WorkspaceContextProps {
  workspaces: WorkspaceItem[]
  activities: ActivityItem[]
  addWorkspace: (title: string, description: string) => void
  deleteWorkspace: (id: string) => void
  isCreateModalOpen: boolean
  setCreateModalOpen: (open: boolean) => void
  activeWorkspaceId: string | null
  setActiveWorkspaceId: (id: string | null) => void
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined)

const INITIAL_WORKSPACES: WorkspaceItem[] = [
  {
    id: "nn-design",
    title: "Neural Network Design",
    description: "Architecture blueprints for the upcoming LLM fine-tuning project including quantization strategy.",
    iconName: "Cpu",
    iconColor: "text-indigo-400",
    iconBgColor: "bg-indigo-500/10",
    tags: ["#3b82f6", "#10b981"],
    editedAt: "Edited 2h ago",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "market-sentiment",
    title: "Market Sentiment Engine",
    description: "Financial data processing pipeline for real-time sentiment analysis of crypto markets.",
    iconName: "TrendingUp",
    iconColor: "text-emerald-400",
    iconBgColor: "bg-emerald-500/10",
    tags: ["#f59e0b"],
    editedAt: "Edited 5h ago",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "spring-boot-jwt",
    title: "Spring Boot JWT Project",
    description: "Authentication system using JWT and Spring Security 6.",
    iconName: "Network",
    iconColor: "text-blue-400",
    iconBgColor: "bg-blue-500/10",
    tags: ["#3b82f6"],
    editedAt: "Edited 1d ago",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "ai-memory-graph",
    title: "AI Memory Graph System",
    description: "Major project implementing a hierarchical knowledge graph with vector retrieval.",
    iconName: "BrainCircuit",
    iconColor: "text-purple-400",
    iconBgColor: "bg-purple-500/10",
    tags: ["#8b5cf6", "#10b981"],
    editedAt: "Edited 3d ago",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "ACTIVE",
  }
]

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    time: "Just Now",
    title: "Memory Sync Completed",
    description: "Synchronized 24 nodes from Workspace Explorer.",
    dotColor: "bg-blue-500",
    ringColor: "ring-blue-500/20",
  },
  {
    id: "act-2",
    time: "45 Minutes Ago",
    title: "Graph Auto-Reorganization",
    description: "Cluster 'Deep Learning' updated with 3 new associations.",
    dotColor: "bg-emerald-500",
    ringColor: "ring-emerald-500/20",
  },
  {
    id: "act-3",
    time: "3 Hours Ago",
    title: "Cloud Backup Finished",
    description: "Delta update: 4.2MB encrypted data sent to secure node.",
    dotColor: "bg-slate-600",
    ringColor: "ring-slate-600/20",
  },
  {
    id: "act-4",
    time: "Yesterday",
    title: "Weekly Insights Generated",
    description: "System identified a conflict in project deadlines.",
    dotColor: "bg-amber-500",
    ringColor: "ring-amber-500/20",
  },
  {
    id: "act-5",
    time: "Yesterday",
    title: "New Workspace Created",
    description: "'Personal Journal' added by user.",
    dotColor: "bg-purple-500",
    ringColor: "ring-purple-500/20",
  },
]

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(INITIAL_WORKSPACES)
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null)

  // Load state on mount (client-side only to avoid Next.js hydration mismatches)
  useEffect(() => {
    const savedWS = localStorage.getItem("ai_memory_graph_workspaces")
    const savedActs = localStorage.getItem("ai_memory_graph_activities")
    
    if (savedWS) {
      try {
        setWorkspaces(JSON.parse(savedWS))
      } catch (e) {
        console.error("Error loading workspaces", e)
      }
    }
    
    if (savedActs) {
      try {
        setActivities(JSON.parse(savedActs))
      } catch (e) {
        console.error("Error loading activities", e)
      }
    }
    
    setIsLoaded(true)
  }, [])

  // Save workspaces and activities changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ai_memory_graph_workspaces", JSON.stringify(workspaces))
    }
  }, [workspaces, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ai_memory_graph_activities", JSON.stringify(activities))
    }
  }, [activities, isLoaded])

  const addWorkspace = (title: string, description: string) => {
    const icons = ["Cpu", "BrainCircuit", "Network", "FolderClosed", "TrendingUp"]
    const colors = [
      { text: "text-indigo-400", bg: "bg-indigo-500/10" },
      { text: "text-emerald-400", bg: "bg-emerald-500/10" },
      { text: "text-blue-400", bg: "bg-blue-500/10" },
      { text: "text-purple-400", bg: "bg-purple-500/10" },
      { text: "text-amber-400", bg: "bg-amber-500/10" },
    ]
    const randomIcon = icons[Math.floor(Math.random() * icons.length)]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomTagColors = [
      ["#3b82f6", "#10b981"],
      ["#f59e0b"],
      ["#8b5cf6"],
      ["#ec4899", "#3b82f6"]
    ][Math.floor(Math.random() * 4)]

    const newWS: WorkspaceItem = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 6),
      title,
      description: description || "No description provided.",
      iconName: randomIcon,
      iconColor: randomColor.text,
      iconBgColor: randomColor.bg,
      tags: randomTagColors,
      editedAt: "Created just now",
      createdAt: new Date().toISOString(),
      status: "ACTIVE"
    }

    setWorkspaces((prev) => [newWS, ...prev])

    // Add corresponding event to the timeline
    const newActivity: ActivityItem = {
      id: "act-" + Math.random().toString(36).substring(2, 9),
      time: "Just Now",
      title: "New Workspace Created",
      description: `Workspace '${title}' initialized by user.`,
      dotColor: "bg-purple-500",
      ringColor: "ring-purple-500/20"
    }

    setActivities((prev) => [newActivity, ...prev])
  }

  const deleteWorkspace = (id: string) => {
    const wsToDelete = workspaces.find((w) => w.id === id)
    if (!wsToDelete) return

    setWorkspaces((prev) => prev.filter((w) => w.id !== id))

    // Add corresponding event to the timeline
    const newActivity: ActivityItem = {
      id: "act-" + Math.random().toString(36).substring(2, 9),
      time: "Just Now",
      title: "Workspace Deleted",
      description: `Workspace '${wsToDelete.title}' was deleted.`,
      dotColor: "bg-red-500",
      ringColor: "ring-red-500/20"
    }

    setActivities((prev) => [newActivity, ...prev])
  }

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activities,
        addWorkspace,
        deleteWorkspace,
        isCreateModalOpen,
        setCreateModalOpen,
        activeWorkspaceId,
        setActiveWorkspaceId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}
