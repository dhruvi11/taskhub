"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5050/api/v1";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-6">Unable to load dashboard.</div>;
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat title="Projects" value={data.totals.projects} />
        <Stat title="Tasks" value={data.totals.tasks} />
        <Stat
          title="Completed"
          value={data.totals.completedTasks}
        />
        <Stat
          title="Pending"
          value={data.totals.pendingTasks}
        />
      </div>

      <section className="mt-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Task Status
        </h2>

        <StatusBar
          label="Todo"
          value={data.taskStatus.TODO}
          total={data.totals.tasks}
        />

        <StatusBar
          label="In Progress"
          value={data.taskStatus.IN_PROGRESS}
          total={data.totals.tasks}
        />

        <StatusBar
          label="Completed"
          value={data.taskStatus.COMPLETED}
          total={data.totals.tasks}
        />
      </section>

      <section className="mt-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Recent Activity
        </h2>

        <div className="space-y-3">
          {data.recentActivity.map(
            (item: any, index: number) => (
              <div
                key={`${item.type}-${index}`}
                className="rounded border p-3"
              >
                <div className="font-medium">
                  {item.message}
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(
                    item.timestamp,
                  ).toLocaleString()}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusBar({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between">
        <span>{label}</span>
        <span>
          {value} ({percentage}%)
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded bg-gray-200">
        <div
          className="h-full rounded bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}