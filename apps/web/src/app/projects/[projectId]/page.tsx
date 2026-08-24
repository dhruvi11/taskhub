type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: Props) {
  const { projectId } = await params;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold">
        Project Details
      </h1>

      <p className="mt-3 text-gray-600">
        Project ID: {projectId}
      </p>
    </main>
  );
}