"use client";

import { useEffect, useState } from "react";

import {
  Alert,
  Snackbar,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import AppButton from "@/src/components/ui/AppButton";
import AppDialog from "@/src/components/ui/AppDialog";
import LoadingState from "@/src/components/ui/LoadingState";
import ProjectList from "@/src/components/projects/ProjectList";

import {
  createProject,
  getProjects,
} from "@/src/services/project.service";

import { Project } from "@/src/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response =
        await getProjects(1, 10);

      setProjects(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error,
      );

      setError(
        "Unable to load projects.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!name.trim()) {
      setError(
        "Project name is required.",
      );

      return;
    }

    try {
      setCreating(true);

      const project =
        await createProject({
          name: name.trim(),
          description:
            description.trim() || undefined,
        });

      setProjects((current) => [
        project,
        ...current,
      ]);

      setName("");
      setDescription("");

      setDialogOpen(false);

      setSuccess(
        "Project created successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to create project:",
        error,
      );

      setError(
        "Unable to create project.",
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your projects and collaborate
            with your team.
          </p>
        </div>

        <AppButton
          startIcon={<AddIcon />}
          onClick={() =>
            setDialogOpen(true)
          }
        >
          Create Project
        </AppButton>

      </div>

      {/* Content */}

      {loading ? (
        <LoadingState />
      ) : (
        <ProjectList
          projects={projects}
        />
      )}

      {/* Create Project Dialog */}

      <AppDialog
        open={dialogOpen}
        title="Create Project"
        onClose={() => {
          if (!creating) {
            setDialogOpen(false);
          }
        }}
        onConfirm={
          creating
            ? undefined
            : handleCreateProject
        }
        confirmText={
          creating
            ? "Creating..."
            : "Create Project"
        }
      >
        <div className="space-y-5 pt-2">

          <TextField
            fullWidth
            label="Project Name"
            placeholder="Enter project name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />

          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Description"
            placeholder="Enter project description"
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value,
              )
            }
          />

        </div>
      </AppDialog>

      {/* Error */}

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setError("")}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success */}

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      </Snackbar>

    </main>
  );
}