"use client";

import { useState } from "react";

import {
  useGetProjectsQuery,
  useCreateProjectMutation,
} from "@/src/store/api";

import AppButton from "@/src/components/ui/AppButton";
import LoadingState from "@/src/components/ui/LoadingState";
import EmptyState from "@/src/components/ui/EmptyState";
import ProjectCard from "@/src/components/projects/ProjectCard";

export default function ProjectsPage() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProjectsQuery({
    page,
    limit: 10,
  });

  const [
    createProject,
    { isLoading: isCreating },
  ] = useCreateProjectMutation();

  console.log("PROJECT RESPONSE:", data);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="rounded-xl bg-red-50 p-6">
          <p className="font-medium text-red-600">
            Failed to load projects.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-3 text-sm font-medium text-red-700 underline"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const projects =
    data?.data?.projects ||
    data?.data ||
    data?.projects ||
    [];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Projects
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your projects
            </p>
          </div>

          <AppButton>
            Create Project
          </AppButton>
        </div>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((p) => p - 1)
                }
                className="rounded-lg border bg-white px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-slate-500">
                Page {page}
              </span>

              <button
                disabled={
                  projects.length < 10
                }
                onClick={() =>
                  setPage((p) => p + 1)
                }
                className="rounded-lg border bg-white px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}

        {isFetching && !isLoading && (
          <p className="mt-4 text-sm text-slate-400">
            Updating projects...
          </p>
        )}
      </div>
    </main>
  );
}