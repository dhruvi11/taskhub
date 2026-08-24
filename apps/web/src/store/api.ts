import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "./index";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5050/api/v1",

  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const token =
      state.auth.token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null);

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",

  baseQuery,

  tagTypes: ["Auth", "Projects", "Project", "Tasks", "Task"],

  endpoints: (builder) => ({
    // =========================
    // LOGIN
    // =========================

    login: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Auth"],
    }),

    // =========================
    // GET PROJECTS
    // =========================

    getProjects: builder.query<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
      } | void
    >({
      query: (params) => ({
        url: "/projects",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.status ? { status: params.status } : {}),
        },
      }),

      providesTags: ["Projects"],
    }),

    // =========================
    // GET PROJECT
    // =========================

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProject: builder.query<any, string>({
      query: (projectId) => `/projects/${projectId}`,

      providesTags: (_result, _error, projectId) => [
        {
          type: "Project",
          id: projectId,
        },
      ],
    }),

    // =========================
    // CREATE PROJECT
    // =========================

    createProject: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        name: string;
        description?: string;
      }
    >({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Projects"],
    }),

    // =========================
    // UPDATE PROJECT
    // =========================

    updateProject: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        projectId: string;
        body: {
          name?: string;
          description?: string;
        };
      }
    >({
      query: ({ projectId, body }) => ({
        url: `/projects/${projectId}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_result, _error, { projectId }) => [
        "Projects",
        {
          type: "Project",
          id: projectId,
        },
      ],
    }),

    // =========================
    // DELETE PROJECT
    // =========================

    deleteProject: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      string
    >({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Projects"],
    }),

    // =========================
    // GET TASKS
    // =========================

    getTasks: builder.query<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        projectId: string;
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        priority?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: ({
        projectId,
        page = 1,
        limit = 10,
        search,
        status,
        priority,
        sortBy,
        sortOrder,
      }) => ({
        url: `/projects/${projectId}/tasks`,

        params: {
          page,
          limit,

          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
          ...(priority ? { priority } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(sortOrder ? { sortOrder } : {}),
        },
      }),

      providesTags: (_result, _error, { projectId }) => [
        {
          type: "Tasks",
          id: projectId,
        },
      ],
    }),

    // =========================
    // CREATE TASK
    // =========================

    createTask: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        projectId: string;
        title: string;
        description?: string;
        priority?: string;
        dueDate?: string;
        assignedToId?: string;
      }
    >({
      query: ({ projectId, ...body }) => ({
        url: `/projects/${projectId}/tasks`,
        method: "POST",
        body,
      }),

      invalidatesTags: (_result, _error, { projectId }) => [
        {
          type: "Tasks",
          id: projectId,
        },
      ],
    }),

    // =========================
    // UPDATE TASK
    // =========================

    updateTask: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        projectId: string;
        taskId: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: any;
      }
    >({
      query: ({ projectId, taskId, body }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_result, _error, { projectId }) => [
        {
          type: "Tasks",
          id: projectId,
        },
      ],
    }),

    // =========================
    // DELETE TASK
    // =========================

    deleteTask: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        projectId: string;
        taskId: string;
      }
    >({
      query: ({ projectId, taskId }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, { projectId }) => [
        {
          type: "Tasks",
          id: projectId,
        },
      ],
    }),
  }),
});

export const {
  useLoginMutation,

  useGetProjectsQuery,
  useGetProjectQuery,

  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = api;
