import { Zap } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-800 dark:from-emerald-800 dark:to-teal-950 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12 md:p-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold mb-6">
                <Zap className="w-4 h-4 fill-current" /> Flash Sale
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Diskon Spesial<br />Musim Hujan!
              </h2>
              <p className="text-emerald-100 mb-8 text-lg">
                Dapatkan paket sayur sop dan aneka jamur dengan potongan harga hingga 40%. Stok terbatas setiap harinya.
              </p>
              <Link 
                href="/?is_promo=true#produk"
                className="inline-block bg-white text-emerald-800 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-lg text-center"
              >
                Cek Promo
              </Link>
            </div>
            <div className="h-full hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1915&auto=format&fit=crop"
                className="w-full h-full object-cover rounded-l-[4rem] border-8 border-emerald-600/30 dark:border-emerald-800/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
