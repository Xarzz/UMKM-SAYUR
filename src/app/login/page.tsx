"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Leaf, Mail, Lock, ArrowRight, User } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi Login: Simpan data ke localStorage agar Navbar bisa baca
    const userData = {
      name: "Muhammad Uhib",
      email: "muhammaduhib@example.com"
    };
    localStorage.setItem("user", JSON.stringify(userData));

    setTimeout(() => {
      setLoading(false);
      router.push(redirect);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl shadow-emerald-500/10 p-6 md:p-8 border border-white dark:border-gray-700">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 mb-4">
            <Leaf className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Selamat Datang</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Masuk untuk mulai belanja sayur segar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <input 
                type="email" 
                required 
                className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all text-sm"
                placeholder="nama@email.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input 
                type="password" 
                required 
                className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all text-sm"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-gray-300" />
              <span className="text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 transition-colors">Ingat Saya</span>
            </label>
            <a href="#" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Lupa Password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Menghubungkan..." : "Masuk Sekarang"}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
          </div>
          <span className="relative px-4 bg-white dark:bg-gray-800 text-xs text-gray-500">Atau masuk dengan</span>
        </div>

        <button className="w-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white rounded-xl py-3 font-bold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-3 text-sm">
          <User className="w-4 h-4" />
          Akun Lain
        </button>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
