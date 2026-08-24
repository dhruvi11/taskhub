import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">
            TaskHub
          </h1>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Project Management
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            Manage projects.
            <br />
            <span className="text-blue-600">
              Get things done.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            TaskHub helps teams organize projects, assign tasks,
            track progress and collaborate efficiently.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start for free
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}