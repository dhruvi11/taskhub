type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function TasksPage({
  params,
}: Props) {
  const { projectId } = await params;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold">
        Tasks
      </h1>

      <p className="mt-2 text-gray-600">
        Tasks for project {projectId}
      </p>

      <div className="mt-8 rounded-xl bg-white p-8 shadow">
        No tasks loaded yet.
      </div>
    </main>
  );
}