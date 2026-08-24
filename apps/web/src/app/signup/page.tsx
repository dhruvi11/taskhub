export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create your TaskHub account
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}