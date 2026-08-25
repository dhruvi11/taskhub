"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { clearCredentials } from "@/src/store/slices/authSlice";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const logout = () => {
    dispatch(clearCredentials());
    router.replace("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3"><button onClick={onMenuClick} className="rounded p-2 lg:hidden" aria-label="Toggle navigation">☰</button><Link href="/dashboard" className="text-xl font-bold text-slate-900">TaskHub</Link></div>
      <div className="flex items-center gap-3 text-sm"><Link href="/profile" className="hidden text-slate-600 sm:block">{user?.name ?? user?.email ?? "Account"}</Link><button onClick={logout} className="rounded-lg border px-3 py-2 text-slate-700 hover:bg-slate-50">Log out</button></div>
    </header>
  );
}
