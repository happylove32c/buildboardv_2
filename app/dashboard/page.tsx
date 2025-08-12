"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

type Project = {
  id: string
  title: string
  mvp_description: string
  status: string
  raw_idea: string
  // We'll fetch tasks count for each status
  todoCount: number
  inProgressCount: number
  doneCount: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    const fetchProjects = async () => {
      setLoading(true)
      setError("")
      try {
        // Get projects of user
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select(`
            id,
            title,
            raw_idea,
            mvp_description,
            status,
            tasks (
              status
            )
          `)
          .eq("user_id", user.id)

        if (projectsError) throw projectsError

        if (!projectsData) {
          setProjects([])
          setLoading(false)
          return
        }

        // Calculate task counts for kanban summary
        const projectsWithCounts: Project[] = projectsData.map((proj: any) => {
          const tasks = proj.tasks || []
          const todoCount = tasks.filter((t: any) => t.status === "todo").length
          const inProgressCount = tasks.filter((t: any) => t.status === "in_progress").length
          const doneCount = tasks.filter((t: any) => t.status === "done").length

          return {
            id: proj.id,
            title: proj.title,
            mvp_description: proj.mvp_description,
            raw_idea: proj.raw_idea,
            status: proj.status,
            todoCount,
            inProgressCount,
            doneCount,
          }
        })

        setProjects(projectsWithCounts)
      } catch (err: any) {
        setError(err.message || "Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading your projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-200 text-red-800 p-4 rounded-md">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <p className="text-gray-600 text-lg">No projects found.</p>
        <Link
          href="/project/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
        >
          Create New Project
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">Your Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const totalTasks = project.todoCount + project.inProgressCount + project.doneCount
          const completionPercent =
            totalTasks === 0 ? 0 : Math.round((project.doneCount / totalTasks) * 100)

          return (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition cursor-pointer flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-700">{project.title}</h2>
              <p className="text-gray-600 mb-2">{project.raw_idea || "No idea provided."}</p>
              <p className="text-gray-700 mb-4 line-clamp-3">{project.mvp_description || "No MVP description yet."}</p>

              {/* Kanban summary */}
              <div className="flex justify-between text-sm font-medium mb-4 text-gray-600">
                <span>Todo: {project.todoCount}</span>
                <span>In Progress: {project.inProgressCount}</span>
                <span>Done: {project.doneCount}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-purple-600 h-3"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <p className="mt-1 text-right text-sm text-gray-500">{completionPercent}% Complete</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
