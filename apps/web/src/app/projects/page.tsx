import AppButton from "@/src/components/ui/AppButton";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your projects
          </p>
        </div>

       <AppButton>
  Create Project
</AppButton>
      </div>

      <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
        <p className="text-gray-500">
          No projects loaded yet.
        </p>
      </div>
    </main>
  );
}