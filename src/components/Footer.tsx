import { Leaf, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50 pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6" />
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
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Sayur Daun</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Umbi-umbian</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Bumbu Dapur</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Buah Segar</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Layanan</h3>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Cara Pesan</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Jadwal Pengiriman</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-emerald-200/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Jl. Pertanian 123, Jawa Barat</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-800/50 pt-8 text-center text-sm text-emerald-200/60">
          &copy; {new Date().getFullYear()} Warung Sayur Segar Malang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
