"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import { Project } from "@/src/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Card
      elevation={0}
      className="
        h-full
        border
        border-gray-200
        transition
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <CardContent className="flex h-full flex-col">

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
              <FolderOutlinedIcon className="text-blue-600" />
            </div>

            <div>
              <Typography
                variant="h6"
                className="font-semibold text-gray-900"
              >
                {project.name}
              </Typography>

              <Typography
                variant="body2"
                className="text-gray-500"
              >
                Project
              </Typography>
            </div>

          </div>

          <Chip
            size="small"
            label={project.status || "ACTIVE"}
            color={
              project.status === "ARCHIVED"
                ? "default"
                : "success"
            }
          />

        </div>

        <Typography
          variant="body2"
          className="mt-5 min-h-[40px] text-gray-600"
        >
          {project.description ||
            "No project description available."}
        </Typography>

        <div className="mt-6 flex items-center gap-5 border-t border-gray-100 pt-4">

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <TaskOutlinedIcon fontSize="small" />

            <span>
              {project._count?.tasks ?? 0} tasks
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <GroupOutlinedIcon fontSize="small" />

            <span>
              {project._count?.members ?? 0} members
            </span>
          </div>

        </div>

        <div className="mt-auto pt-5">

          <Link
            href={`/projects/${project.id}`}
            className="
              text-sm
              font-semibold
              text-blue-600
              hover:text-blue-800
            "
          >
            View project →
          </Link>

        </div>

      </CardContent>
    </Card>
  );
}