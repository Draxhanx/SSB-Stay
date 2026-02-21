"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-background px-4 relative overflow-hidden transition-colors duration-300">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-xl shadow-2xl border border-secondary/10 dark:border-white/5 relative z-10">
        <h2 className="text-3xl font-heading font-semibold text-center mb-2 text-primary dark:text-white">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 font-medium">
          Please sign in to your admin account
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold text-center p-3 rounded-xl mb-6 border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-gray-400 mb-2">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-800 outline-none transition dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-800 outline-none transition dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-5 px-6 rounded-xl shadow-xl text-white bg-primary hover:bg-primary-dark font-semibold text-lg transition shadow-teal-900/20 transform hover:-translate-y-1 active:scale-95"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
