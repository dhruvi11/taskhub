"use client";

import ProjectCard from "./ProjectCard";

import { Project } from "@/src/types/project";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({
  projects,
}: ProjectListProps) {
  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="font-medium text-gray-700">
          No projects found
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Create your first project to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}