"use client";

import { MapPin, X, Clock, ShoppingBag, MessageCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [isCaraPesanOpen, setIsCaraPesanOpen] = useState(false);
  const [isJadwalOpen, setIsJadwalOpen] = useState(false);

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
                Sayuran segar langsung dari petani lokal. Lebih sehat, lebih murah, dan memberdayakan petani UMKM di Malang Raya.
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/6281234567890" className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center hover:bg-emerald-400 hover:text-emerald-950 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="tel:+6281234567890" className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center hover:bg-emerald-400 hover:text-emerald-950 transition-all">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:info@warungsayurmalang.com" className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center hover:bg-emerald-400 hover:text-emerald-950 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm text-emerald-200/80">
                <li>
                  <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
                </li>
                <li>
                  <Link href="/#produk" className="hover:text-emerald-400 transition-colors">Katalog Produk</Link>
                </li>
                <li>
                  <Link href="/#kategori" className="hover:text-emerald-400 transition-colors">Kategori Populer</Link>
                </li>
                <li>
                  <Link href="/history" className="hover:text-emerald-400 transition-colors">Riwayat Pesanan</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Bantuan</h3>
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
                <li>
                  <Link href="/login" className="hover:text-emerald-400 transition-colors">Masuk ke Akun</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Hubungi Kami</h3>
              <ul className="space-y-3 text-sm text-emerald-200/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Jl. Pertanian 123, Lowokwaru, Malang, Jawa Timur 65141</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>+62 812-3456-7890 (WA Only)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Setiap Hari: 08:00 - 17:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800/50 pt-8 text-center text-sm text-emerald-200/60">
            &copy; {new Date().getFullYear()} Warung Sayur Segar Malang. Terdaftar sebagai mitra UMKM binaan lokal.
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

