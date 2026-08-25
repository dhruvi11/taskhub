"use client";

import Link from "next/link";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import LoadingState from "@/src/components/ui/LoadingState";
import { useGetProjectsQuery } from "@/src/store/api";
import { getApiErrorMessage } from "@/src/lib/api-error";

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useGetProjectsQuery({ page: 1, limit: 5 });
  const projects = data?.data?.projects ?? [];
  const activeProjects = projects.filter((project: { status: string }) => project.status === "ACTIVE").length;

  return <DashboardLayout>{isLoading ? <LoadingState /> : error ? (
    <div className="rounded-xl bg-red-50 p-6 text-red-700"><p className="font-semibold">Failed to load the dashboard</p><p className="mt-1 text-sm">{getApiErrorMessage(error, "Please try again.")}</p><button onClick={refetch} className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white">Retry</button></div>
  ) : (
    <div><div className="flex items-start justify-between gap-4"><div><h1 className="text-3xl font-bold text-slate-900">Dashboard</h1><p className="mt-2 text-slate-500">Your live project workspace.</p></div><Link href="/projects" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Manage projects</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-500">Projects</p><p className="mt-2 text-3xl font-bold">{data?.data?.pagination?.total ?? projects.length}</p></div><div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-500">Active projects on this page</p><p className="mt-2 text-3xl font-bold">{activeProjects}</p></div></div><section className="mt-8 rounded-xl border bg-white p-6"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Recent projects</h2><Link href="/projects" className="text-sm font-medium text-blue-600">View all</Link></div>{projects.length === 0 ? <p className="mt-5 text-sm text-slate-500">No projects yet. Create your first project to get started.</p> : <div className="mt-4 space-y-3">{projects.map((project: { id: string; name: string; description?: string; status: string }) => <Link key={project.id} href={`/projects/${project.id}`} className="block rounded-lg border p-4 hover:bg-slate-50"><div className="flex justify-between gap-4"><p className="font-medium">{project.name}</p><span className="text-xs text-slate-500">{project.status}</span></div><p className="mt-1 text-sm text-slate-500">{project.description || "No description"}</p></Link>)}</div>}</section></div>
  )}</DashboardLayout>;
}
