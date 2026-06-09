import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | AI Memory Graph",
  description: "Monitor and access your personal AI-powered knowledge second brain. Sync conversations, analyze workspaces, and review memory insights.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
