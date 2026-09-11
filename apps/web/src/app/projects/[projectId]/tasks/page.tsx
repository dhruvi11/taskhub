"use client";

import { use, useState } from "react";

import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
} from "@/src/store/api";

import LoadingState from "@/src/components/ui/LoadingState";
import EmptyState from "@/src/components/ui/EmptyState";
import type { Task } from "@/src/types/task";

export default function TasksPage({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) {
  const { projectId } = use(params);

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetTasksQuery({
    projectId,
    page,
    limit: 10,
  });

  const [createTask, { isLoading: creating }] = useCreateTaskMutation();

  const [deleteTask] = useDeleteTaskMutation();

  const [completeTask] = useCompleteTaskMutation();

  const tasks = data?.data?.tasks || [];

  const pagination = data?.data?.pagination;

  const handleCreate = async () => {
    const title = window.prompt("Task title");

    if (!title) {
      return;
    }

    await createTask({
      projectId,
      title,
      priority: "MEDIUM",
    }).unwrap();
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    await deleteTask({
      projectId,
      taskId,
    }).unwrap();
  };

  const handleComplete = async (taskId: string) => {
    await completeTask({
      projectId,
      taskId,
    }).unwrap();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <main className="p-8">
        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          Failed to load tasks.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="mt-2 text-slate-500">Manage project tasks</p>
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Task"}
        </button>
      </div>

      {isFetching && (
        <p className="mt-4 text-sm text-slate-400">Updating tasks...</p>
      )}

      {tasks.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No tasks yet"
            description="Create a task to begin tracking this project."
          />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {tasks.map((task: Task) => (
            <div
              key={task.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">{task.title}</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.description || "No description"}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                  {task.priority}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleComplete(task.id)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
                >
                  Complete
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          disabled={page <= 1 || isFetching}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="py-2 text-sm text-slate-500">
          Page {pagination?.page || page}
        </span>

        <button
          disabled={page >= (pagination?.totalPages || 1) || isFetching}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
