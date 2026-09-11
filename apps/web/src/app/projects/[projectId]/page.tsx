"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useAddProjectMemberMutation,
  useGetProjectMembersQuery,
  useGetProjectQuery,
  useRemoveProjectMemberMutation,
  useUpdateProjectMutation,
} from "@/src/store/api";
import LoadingState from "@/src/components/ui/LoadingState";
import { getApiErrorMessage } from "@/src/lib/api-error";

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const projectQuery = useGetProjectQuery(projectId);
  const membersQuery = useGetProjectMembersQuery(projectId);
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();
  const [addMember, { isLoading: adding }] = useAddProjectMemberMutation();
  const [removeMember] = useRemoveProjectMemberMutation();
  const project = projectQuery.data?.data;
  const members =
    membersQuery.data?.data?.members ?? membersQuery.data?.data ?? [];
  const run = async (operation: () => Promise<unknown>) => {
    setMessage(null);
    try {
      await operation();
    } catch (reason) {
      setMessage(getApiErrorMessage(reason, "The change could not be saved."));
    }
  };
  const edit = () => {
    const name = window.prompt("Project name", project?.name);
    if (name?.trim() && name !== project?.name)
      void run(() =>
        updateProject({ projectId, data: { name: name.trim() } }).unwrap(),
      );
  };
  const invite = () => {
    const userId = window.prompt("User ID to add");
    if (userId?.trim())
      void run(() =>
        addMember({
          projectId,
          userId: userId.trim(),
          role: "MEMBER",
        }).unwrap(),
      );
  };
  if (projectQuery.isLoading)
    return (
      <main className="p-8">
        <LoadingState />
      </main>
    );
  if (projectQuery.error)
    return (
      <main className="p-8">
        <div className="rounded-xl bg-red-50 p-5 text-red-700">
          {getApiErrorMessage(projectQuery.error, "Failed to load project.")}{" "}
          <button onClick={projectQuery.refetch} className="ml-3 underline">
            Retry
          </button>
        </div>
      </main>
    );
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/projects" className="text-sm text-blue-600">
            ← Projects
          </Link>
          <h1 className="mt-2 text-3xl font-bold">{project?.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            {project?.description || "No description"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={edit}
            disabled={updating}
            className="rounded-lg border bg-white px-4 py-2 text-sm disabled:opacity-50"
          >
            {updating ? "Saving…" : "Edit project"}
          </button>
          <Link
            href={`/projects/${projectId}/tasks`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            View tasks
          </Link>
        </div>
      </div>
      {message && (
        <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {message}
        </p>
      )}
      <section className="mt-8 rounded-xl border bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Members</h2>
            <p className="mt-1 text-sm text-slate-500">
              Project owners and managers can add or remove members.
            </p>
          </div>
          <button
            onClick={invite}
            disabled={adding}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
          >
            {adding ? "Adding…" : "Add member"}
          </button>
        </div>
        {membersQuery.isLoading ? (
          <p className="mt-5 text-sm text-slate-500">Loading members…</p>
        ) : membersQuery.error ? (
          <p className="mt-5 text-sm text-red-700">
            {getApiErrorMessage(membersQuery.error, "Failed to load members.")}
          </p>
        ) : (
          <div className="mt-5 divide-y">
            {members.map(
              (member: {
                id: string;
                userId: string;
                role: string;
                user?: { name: string; email: string };
              }) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <p className="font-medium">
                      {member.user?.name || member.userId}
                    </p>
                    <p className="text-sm text-slate-500">
                      {member.user?.email || member.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      {member.role}
                    </span>
                    {member.role !== "OWNER" && (
                      <button
                        onClick={() => {
                          if (window.confirm("Remove this member?"))
                            void run(() =>
                              removeMember({
                                projectId,
                                userId: member.userId,
                              }).unwrap(),
                            );
                        }}
                        className="text-sm text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ),
            )}
            {members.length === 0 && (
              <p className="py-4 text-sm text-slate-500">No members found.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
