"use client";

import { FormEvent, useState } from "react";

import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/src/store/api";

import { setUser } from "@/src/store/slices/authSlice";

import { useAppDispatch } from "@/src/store/hooks";
import { getApiErrorMessage } from "@/src/lib/api-error";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetCurrentUserQuery();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [name, setName] = useState("");

  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveError(null);

    try {
      const response = await updateProfile({
        name: name || data?.data?.name,
      }).unwrap();

      dispatch(setUser(response.data));
    } catch (error) {
      setSaveError(getApiErrorMessage(error, "Profile update failed."));
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-600">Failed to load profile.</div>;
  }

  const user = data?.data;

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

      <p className="mt-2 text-slate-500">Manage your account information.</p>

      <div className="mt-8 max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {saveError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {saveError}
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>

            <input
              value={name || user?.name || ""}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              value={user?.email ?? ""}
              disabled
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Role</label>

            <input
              value={user?.role ?? "USER"}
              disabled
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
