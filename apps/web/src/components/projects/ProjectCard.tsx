import Link from "next/link";

import type {
  Project,
} from "@/src/store/api";

interface Props {
  project: Project;
}

export default function ProjectCard({
  project,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <h2 className="text-lg font-semibold text-slate-900">
          {project.name}
        </h2>

        {project.status && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {project.status}
          </span>
        )}

      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-500">
        {project.description ||
          "No description available."}
      </p>

      <Link
        href={`/projects/${project.id}`}
        className="mt-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        View project →
      </Link>

    </div>
  );
}