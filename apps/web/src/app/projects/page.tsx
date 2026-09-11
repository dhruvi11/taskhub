"use client";

import { useState } from "react";

import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
} from "@/src/store/api";

import LoadingState from "@/src/components/ui/LoadingState";
import EmptyState from "@/src/components/ui/EmptyState";
import ProjectCard from "@/src/components/projects/ProjectCard";
import type { Project } from "@/src/types/project";
import { getApiErrorMessage } from "@/src/lib/api-error";

export default function ProjectsPage() {
  const [page, setPage] = useState(1);

  const [actionError, setActionError] = useState<string | null>(null);

  const limit = 10;

  const { data, isLoading, isFetching, error } = useGetProjectsQuery({
    page,
    limit,
  });

  const [deleteProject] = useDeleteProjectMutation();

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();

  const projects = data?.data?.projects || [];

  const pagination = data?.data?.pagination;

  const handleCreate = async () => {
    setActionError(null);
    const name = window.prompt("Project name");

    if (!name) {
      return;
    }

    try {
      await createProject({
        name,
        description: "New TaskHub project",
      }).unwrap();
    } catch (reason) {
      setActionError(
        getApiErrorMessage(reason, "Unable to create the project."),
      );
    }
  };

  const handleDelete = async (projectId: string) => {
    const confirmed = window.confirm("Delete this project?");

    if (!confirmed) {
      return;
    }

    setActionError(null);
    try {
      await deleteProject(projectId).unwrap();
    } catch (reason) {
      setActionError(
        getApiErrorMessage(reason, "Unable to delete the project."),
      );
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <main className="p-8">
        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          Failed to load projects.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>

          <p className="mt-2 text-slate-500">Manage your projects</p>
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {creating ? "Creating..." : "Create Project"}
        </button>
      </div>

      {isFetching && (
        <p className="mt-4 text-sm text-slate-400">Updating projects...</p>
      )}

      {actionError && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {actionError}
        </p>
      )}

      {projects.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No projects yet"
            description="Create a project to start organizing work."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          disabled={page <= 1 || isFetching}
          onClick={() => setPage((value) => value - 1)}
          className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-slate-500">
          Page {pagination?.page || page} of {pagination?.totalPages || 1}
        </span>

        <button
          disabled={page >= (pagination?.totalPages || 1) || isFetching}
          onClick={() => setPage((value) => value + 1)}
          className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
