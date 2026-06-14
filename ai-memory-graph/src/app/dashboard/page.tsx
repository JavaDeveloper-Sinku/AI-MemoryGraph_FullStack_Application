"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { RecentWorkspace } from "@/components/dashboard/RecentWorkspace"
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import * as LucideIcons from "lucide-react"
import { useWorkspace } from "@/hooks/useWorkspace"
import { useRouter } from "next/navigation"
import {
  Network,
  MessageSquare,
  BrainCircuit,
  Rocket,
  Cpu,
  TrendingUp,
  GitMerge,
  Radio,
  Sparkles,
  ArrowRight,
  SearchX
} from "lucide-react"

// Mock Data
const memoryInsights = [
  {
    id: "insight-1",
    title: "Synthesized Insight: Architecture Consolidation",
    description: "Based on last week's discussions, the AI suggests merging the data ingestion and preprocessing nodes to reduce latency by 15%.",
    badges: ["PROJECT-ALPHA", "SYSTEM-OPT"],
    icon: GitMerge,
    iconColor: "text-blue-400",
    iconBgColor: "bg-blue-500/10",
  },
  {
    id: "insight-2",
    title: "Pattern Detected: Collaborative Burst",
    description: "Activity in 'Workspace Explorer' peaked between 9-11 PM. This correlates with high-energy brainstorming phases identified previously.",
    badges: ["ANALYTICS"],
    icon: Radio,
    iconColor: "text-emerald-400",
    iconBgColor: "bg-emerald-500/10",
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const { workspaces, activities, setActiveWorkspaceId } = useWorkspace()
  const router = useRouter()

  const statsData = [
    {
      id: "total-workspaces",
      title: "Total Workspaces",
      value: workspaces.length.toString(),
      subtitle: "+2 this week",
      icon: Network,
      iconColor: "text-blue-400",
      iconBgColor: "bg-blue-500/10",
      trendType: "positive" as const,
    },
    {
      id: "total-conversations",
      title: "Total Conversations",
      value: "142",
      subtitle: "Synced 5m ago",
      icon: MessageSquare,
      iconColor: "text-amber-400",
      iconBgColor: "bg-amber-500/10",
      trendType: "neutral" as const,
    },
    {
      id: "memories-generated",
      title: "Memories Generated",
      value: "856",
      subtitle: "12% increase",
      icon: BrainCircuit,
      iconColor: "text-emerald-400",
      iconBgColor: "bg-emerald-500/10",
      trendType: "positive" as const,
    },
    {
      id: "active-projects",
      title: "Active Projects",
      value: "4",
      subtitle: "No urgent alerts",
      icon: Rocket,
      iconColor: "text-purple-400",
      iconBgColor: "bg-purple-500/10",
      trendType: "neutral" as const,
    },
  ]

  // Filter logic
  const filteredWorkspaces = workspaces.filter(
    (ws) =>
      ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredInsights = memoryInsights.filter(
    (insight) =>
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const hasResults = filteredWorkspaces.length > 0 || filteredInsights.length > 0

  return (
    <AppLayout searchVal={searchQuery} onSearchChange={setSearchQuery}>
      {/* Welcome & Greetings Header */}
      <div className="mb-8 select-none">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
          Good Morning, Alex
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse hidden sm:inline-block" />
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your AI memory graph is synchronized and ready for new insights.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
            trendType={stat.trendType}
          />
        ))}
      </div>

      {/* Inner Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Double-Column */}
        <div className="lg:col-span-2 space-y-8 min-w-0">
          
          {/* Recent Workspaces section */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1 select-none">
              <h3 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">
                Recent Workspaces
              </h3>
              <Button
                variant="link"
                className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 p-0 h-auto gap-1"
                onClick={() => router.push("/workspaces")}
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {filteredWorkspaces.length === 0 ? (
              searchQuery && (
                <div className="p-8 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-500 text-xs">
                  <SearchX className="w-8 h-8 text-slate-600 mb-2" />
                  <span>No matching workspaces found</span>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredWorkspaces.map((ws) => {
                  const IconComponent = (LucideIcons as any)[ws.iconName] || LucideIcons.FolderClosed
                  return (
                    <RecentWorkspace
                      key={ws.id}
                      title={ws.title}
                      description={ws.description}
                      icon={IconComponent}
                      iconColor={ws.iconColor}
                      iconBgColor={ws.iconBgColor}
                      tags={ws.tags}
                      editedAt={ws.editedAt}
                      onClick={() => {
                        setActiveWorkspaceId(ws.id)
                        router.push("/chat")
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Memory Insights section */}
          <div>
            <div className="flex items-center mb-4 px-1 select-none">
              <h3 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">
                Memory Insights
              </h3>
            </div>

            {filteredInsights.length === 0 ? (
              searchQuery && (
                <div className="p-8 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-500 text-xs">
                  <SearchX className="w-8 h-8 text-slate-600 mb-2" />
                  <span>No matching memory insights found</span>
                </div>
              )
            ) : (
              <div className="space-y-4">
                {filteredInsights.map((insight) => {
                  const InsightIcon = insight.icon
                  return (
                    <Card
                      key={insight.id}
                      className="hover:border-slate-700/60 hover:bg-[#151c2d]/40 duration-200"
                    >
                      <CardContent className="p-5 flex items-start gap-4">
                        {/* Insight Leading Icon */}
                        <div className={`p-2.5 rounded-lg border border-white/5 shadow-inner shrink-0 ${insight.iconBgColor}`}>
                          <InsightIcon className={`w-5 h-5 ${insight.iconColor}`} />
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-2 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                            {insight.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {insight.description}
                          </p>
                          
                          {/* Badges */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            {insight.badges.map((badge) => (
                              <span
                                key={badge}
                                className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 tracking-wider uppercase border border-slate-700/30"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Combined Empty State */}
          {!hasResults && searchQuery && (
            <div className="py-12 border border-dashed border-slate-800/60 rounded-xl flex flex-col items-center justify-center text-slate-500 text-sm">
              <SearchX className="w-12 h-12 text-slate-700 mb-3" />
              <p className="font-semibold text-slate-400">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">Try checking your spelling or search term</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}

        </div>

        {/* Right Single-Column */}
        <div className="lg:col-span-1 h-full lg:sticky lg:top-20">
          <ActivityTimeline activities={activities} className="max-h-[580px] lg:max-h-[640px]" />
        </div>
      </div>
    </AppLayout>
  )
}
