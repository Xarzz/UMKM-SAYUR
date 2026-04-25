"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Mail, Lock, User, ArrowRight } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        console.error("Supabase SignUp Error:", error);
        throw error;
      }

      console.log("SignUp Success:", data);
      
      // Langsung ke home
      router.push("/");
      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (err: any) {
      console.error("Catch Error:", err);
      setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl shadow-emerald-500/10 p-6 md:p-8 border border-white dark:border-gray-700">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img src="/logo/wss.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar Akun</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gabung untuk akses sayur segar pilihan</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-xs font-medium animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
            <div className="relative">
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all text-sm"
                placeholder="John Doe"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all text-sm"
                placeholder="Min. 8 karakter"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <p className="text-[10px] text-gray-500 dark:text-gray-400 px-1 leading-tight">
            Dengan mendaftar, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi Warung Sayur Segar Malang.
          </p>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Memproses..." : "Buat Akun"}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
