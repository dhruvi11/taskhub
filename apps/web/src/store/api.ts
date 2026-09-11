/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { clearCredentials } from "./slices/authSlice";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,

  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // The current API issues JWTs but has no refresh endpoint. Clearing stale
    // credentials prevents every subsequent request from failing silently.
    api.dispatch(clearCredentials());
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithAuth,

  tagTypes: ["Auth", "Project", "Task", "Member"],

  endpoints: (builder) => ({
    // =========================
    // AUTH
    // =========================

    login: builder.mutation<
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

    signup: builder.mutation<
      any,
      {
        name: string;
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),

      providesTags: ["Auth"],
    }),

    // =========================
    // PROJECTS
    // =========================

    getProjects: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search, status, sortBy, sortOrder }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));

        params.set("limit", String(limit));

        if (search) {
          params.set("search", search);
        }

        if (status) {
          params.set("status", status);
        }

        if (sortBy) {
          params.set("sortBy", sortBy);
        }

        if (sortOrder) {
          params.set("sortOrder", sortOrder);
        }

        return `/projects?${params.toString()}`;
      },

      providesTags: (result) =>
        result
          ? [
              {
                type: "Project",
                id: "LIST",
              },
              ...(result?.data?.projects || []).map((project: any) => ({
                type: "Project" as const,
                id: project.id,
              })),
            ]
          : [
              {
                type: "Project",
                id: "LIST",
              },
            ],
    }),

    getProject: builder.query<any, string>({
      query: (projectId) => `/projects/${projectId}`,

      providesTags: (result, error, projectId) => [
        {
          type: "Project",
          id: projectId,
        },
      ],
    }),

    createProject: builder.mutation<
      any,
      {
        name: string;
        description?: string;
        status?: string;
      }
    >({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        {
          type: "Project",
          id: "LIST",
        },
      ],
    }),

    updateProject: builder.mutation<
      any,
      {
        projectId: string;
        data: {
          name?: string;
          description?: string;
          status?: string;
        };
      }
    >({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, error, { projectId }) => [
        {
          type: "Project",
          id: projectId,
        },
        {
          type: "Project",
          id: "LIST",
        },
      ],
    }),

    deleteProject: builder.mutation<any, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),

      invalidatesTags: [
        {
          type: "Project",
          id: "LIST",
        },
      ],
    }),

    // =========================
    // TASKS
    // =========================

    getTasks: builder.query<
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
      }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));

        params.set("limit", String(limit));

        if (search) {
          params.set("search", search);
        }

        if (status) {
          params.set("status", status);
        }

        if (priority) {
          params.set("priority", priority);
        }

        if (sortBy) {
          params.set("sortBy", sortBy);
        }

        if (sortOrder) {
          params.set("sortOrder", sortOrder);
        }

        return `/projects/${projectId}/tasks?${params.toString()}`;
      },

      providesTags: (result, error, { projectId }) => [
        {
          type: "Task",
          id: `LIST-${projectId}`,
        },

        ...(result?.data?.tasks || []).map((task: any) => ({
          type: "Task" as const,
          id: task.id,
        })),
      ],
    }),

    getTask: builder.query<
      any,
      {
        projectId: string;
        taskId: string;
      }
    >({
      query: ({ projectId, taskId }) =>
        `/projects/${projectId}/tasks/${taskId}`,

      providesTags: (result, error, { taskId }) => [
        {
          type: "Task",
          id: taskId,
        },
      ],
    }),

    createTask: builder.mutation<
      any,
      {
        projectId: string;
        title: string;
        description?: string;
        priority: string;
        dueDate?: string;
        assignedToId?: string;
      }
    >({
      query: ({ projectId, ...body }) => ({
        url: `/projects/${projectId}/tasks`,
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error, { projectId }) => [
        {
          type: "Task",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    updateTask: builder.mutation<
      any,
      {
        projectId: string;
        taskId: string;
        data: any;
      }
    >({
      query: ({ projectId, taskId, data }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (result, error, { projectId, taskId }) => [
        {
          type: "Task",
          id: taskId,
        },
        {
          type: "Task",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    deleteTask: builder.mutation<
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

      invalidatesTags: (result, error, { projectId }) => [
        {
          type: "Task",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    completeTask: builder.mutation<
      any,
      {
        projectId: string;
        taskId: string;
      }
    >({
      query: ({ projectId, taskId }) => ({
        url: `/projects/${projectId}/tasks/${taskId}/complete`,
        method: "PATCH",
      }),

      invalidatesTags: (result, error, { projectId, taskId }) => [
        {
          type: "Task",
          id: taskId,
        },
        {
          type: "Task",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    // =========================
    // MEMBERS
    // =========================

    getProjectMembers: builder.query<any, string>({
      query: (projectId) => `/projects/${projectId}/members`,

      providesTags: (result, error, projectId) => [
        {
          type: "Member",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    addProjectMember: builder.mutation<
      any,
      {
        projectId: string;
        userId: string;
        role?: string;
      }
    >({
      query: ({ projectId, ...body }) => ({
        url: `/projects/${projectId}/members`,
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error, { projectId }) => [
        {
          type: "Member",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    removeProjectMember: builder.mutation<
      any,
      {
        projectId: string;
        userId: string;
      }
    >({
      query: ({ projectId, userId }) => ({
        url: `/projects/${projectId}/members/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, { projectId }) => [
        {
          type: "Member",
          id: `LIST-${projectId}`,
        },
      ],
    }),

    updateProfile: builder.mutation<any, { name?: string; email?: string }>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetCurrentUserQuery,

  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,

  useGetProjectMembersQuery,
  useAddProjectMemberMutation,
  useRemoveProjectMemberMutation,
  useUpdateProfileMutation,
} = api;
