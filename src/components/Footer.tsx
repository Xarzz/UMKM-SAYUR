"use client";

import { MapPin, X, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: number;
  name: string;
}

// Kategori default agar tidak kosong saat loading/error
const DEFAULT_CATEGORIES = [
  { id: 1, name: "Sayur Daun" },
  { id: 2, name: "Umbi-umbian" },
  { id: 3, name: "Bumbu Dapur" },
  { id: 4, name: "Buah Segar" },
  { id: 5, name: "Paket Masak" }
];

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [isCaraPesanOpen, setIsCaraPesanOpen] = useState(false);
  const [isJadwalOpen, setIsJadwalOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase.from("categories").select("id, name").limit(5);
        if (error) throw error;
        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Footer category fetch error:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <footer className="bg-emerald-950 text-emerald-50 pt-16 pb-8 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 shrink-0">
                  <img src="/logo/wss.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
                  Warung Sayur <span className="text-emerald-400">Segar Malang</span>
                </span>
              </div>
              <p className="text-emerald-200/80 text-sm mb-6 leading-relaxed">
                Sayuran segar langsung dari petani lokal. Lebih sehat, lebih murah, dan memberdayakan petani UMKM.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Kategori</h3>
              <ul className="space-y-2 text-sm text-emerald-200/80">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link href={`/?category=${cat.id}#produk`} className="hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Layanan</h3>
              <ul className="space-y-2 text-sm text-emerald-200/80">
                <li>
                  <button onClick={() => setIsCaraPesanOpen(true)} className="hover:text-emerald-400 transition-colors text-left w-full">
                    Cara Pesan
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsJadwalOpen(true)} className="hover:text-emerald-400 transition-colors text-left w-full">
                    Jadwal Pengiriman
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Hubungi Kami</h3>
              <ul className="space-y-3 text-sm text-emerald-200/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Jl. Pertanian 123, Malang, Jawa Timur</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800/50 pt-8 text-center text-sm text-emerald-200/60">
            &copy; {new Date().getFullYear()} Warung Sayur Segar Malang. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modal Cara Pesan */}
      {isCaraPesanOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCaraPesanOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCaraPesanOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cara Memesan</h2>
            <ol className="space-y-4 text-gray-600 dark:text-gray-300 list-decimal list-inside text-sm leading-relaxed">
              <li>Pilih produk sayuran segar atau paket yang Anda inginkan dari katalog.</li>
              <li>Masukkan produk ke dalam keranjang belanja.</li>
              <li>Klik keranjang dan tekan tombol <strong>Lanjut ke Checkout</strong>.</li>
              <li>Isi data diri dan alamat pengiriman dengan lengkap.</li>
              <li>Pesanan Anda akan segera diproses oleh tim kami.</li>
            </ol>
            <button onClick={() => setIsCaraPesanOpen(false)} className="mt-8 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Modal Jadwal Pengiriman */}
      {isJadwalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsJadwalOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsJadwalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Jadwal Pengiriman</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-600">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Pesanan Sebelum 15:00
                </h4>
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Akan dikirimkan keesokan harinya (H+1) pagi hari agar sayuran tiba di dapur Anda dalam kondisi paling segar.</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-600">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Pesanan Setelah 15:00
                </h4>
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Akan diproses untuk pengiriman hari lusa (H+2).</p>
              </div>
            </div>
            <button onClick={() => setIsJadwalOpen(false)} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
