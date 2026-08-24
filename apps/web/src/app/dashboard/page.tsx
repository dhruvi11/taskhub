import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back to TaskHub.
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        <StatCard
          title="Total Projects"
          value="12"
          description="Active projects"
        />

        <StatCard
          title="Total Tasks"
          value="48"
          description="Across all projects"
        />

        <StatCard
          title="Completed"
          value="32"
          description="Tasks completed"
        />

        <StatCard
          title="Pending"
          value="16"
          description="Tasks remaining"
        />

      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-gray-200 bg-white p-6">

          <h2 className="text-lg font-semibold text-gray-900">
            Recent Projects
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your latest projects will appear here.
          </p>

        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">

          <h2 className="text-lg font-semibold text-gray-900">
            Recent Tasks
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your latest tasks will appear here.
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}