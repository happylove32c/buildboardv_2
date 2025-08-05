// app/dashboard/page.tsx
import PrivateRoute from "@/components/PrivateRoute"

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className="sm:pt-16">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </PrivateRoute>
  )
}
