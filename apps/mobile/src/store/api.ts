import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
} from "../types/auth";

import type { Project, ProjectListResponse } from "../types/project";

import type { Task, TaskListResponse } from "../types/task";

import { API_BASE_URL } from "../services/api";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;

      const token = state.auth?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  tagTypes: ["User", "Project", "Task"],

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    getCurrentUser: builder.query<{ success: boolean; data: User }, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),

    getProjects: builder.query<ProjectListResponse, void>({
      query: () => "/projects",
      providesTags: ["Project"],
    }),

    getProject: builder.query<{ success: boolean; data: Project }, string>({
      query: (projectId) => `/projects/${projectId}`,

      providesTags: (result, error, projectId) => [
        {
          type: "Project",
          id: projectId,
        },
      ],
    }),

    getTasks: builder.query<TaskListResponse, string>({
      query: (projectId) => `/projects/${projectId}/tasks`,

      providesTags: (result, error, projectId) => [
        {
          type: "Task",
          id: projectId,
        },
      ],
    }),

    getTask: builder.query<
      { success: boolean; data: Task },
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
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetCurrentUserQuery,
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetTasksQuery,
  useGetTaskQuery,
} = api;
