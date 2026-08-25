"use client";

import Link from "next/link";
import type { Project } from "@/src/types/project";

interface ProjectCardProps {
  project: Project;
  onDelete?: (
    id: string,
  ) => void;
}

export default function ProjectCard({
  project,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">
          {project.name}
        </h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {project.status ||
            "ACTIVE"}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-500">
        {project.description ||
          "No description"}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/projects/${project.id}`}
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          View project →
        </Link>

        {onDelete && (
          <button
            onClick={() =>
              onDelete(
                project.id,
              )
            }
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
