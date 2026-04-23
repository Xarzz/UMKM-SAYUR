import { supabase } from "@/lib/supabase";
import { Star, Truck, Banknote, Tag, List, ChefHat, Plus, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import PromoBanner from "@/components/PromoBanner";
import FilterSidebar from "@/components/FilterSidebar";

// Make this page dynamic since we use search params
export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // IMPORTANT: In Next.js 15+, searchParams is a Promise and must be awaited
  const params = await searchParams;

  // Fetch logic from Supabase
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const { data: catData } = await supabase.from("categories").select("*");
    categories = catData || [];

    let query = supabase.from("products").select("*, category:categories(*)");

    if (params.category) query = query.eq("category_id", params.category);
    if (params.max_price) query = query.lte("price", params.max_price);
    if (params.is_fresh) query = query.eq("is_fresh", true);
    if (params.is_promo) query = query.gt("discount_percentage", 0);
    if (params.is_new) query = query.eq("is_new", true);
    if (params.limited_stock) query = query.eq("limited_stock", true);
    if (params.search) {
      query = query.ilike("name", `%${params.search}%`);
    }

    const { data: prodData } = await query.order("created_at", { ascending: false });
    products = prodData || [];
  } catch (error) {
    console.error("Supabase fetch error:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden bg-emerald-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-emerald-200/50 dark:bg-emerald-900/20 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-lighten transition-colors"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-yellow-200/50 dark:bg-yellow-900/10 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-lighten transition-colors"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6 transition-colors">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                Dipanen Pagi Ini, Diantar Siang Ini
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 transition-colors">
                Segar dari Petani,<br />
                <span className="text-emerald-600 dark:text-emerald-400">Langsung ke Dapurmu.</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl transition-colors">
                Nikmati sayuran segar bebas pestisida setiap hari. Kami menghubungkan Anda langsung dengan petani lokal untuk kualitas terbaik dengan harga jujur.
              </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#produk" className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1">
                    Belanja Sekarang
                  </a>
                  <a href="#kategori" className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-all">
                    Lihat Kategori
                  </a>
                </div>

                {/* USP Section */}
                <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tanpa Pestisida</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">&lt; 24J</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Waktu Kirim</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Petani Lokal</div>
                  </div>
                </div>
              </div>

            <div className="relative lg:ml-auto">
              <div className="absolute inset-0 bg-emerald-500 rounded-[3rem] rotate-3 scale-105 opacity-20 blur-xl"></div>
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" alt="Sayuran Segar" className="relative rounded-[3rem] shadow-2xl object-cover h-[600px] w-full max-w-lg mx-auto" />
              
              {/* Floating badge */}
              <div className="absolute bottom-10 -left-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce border border-gray-100 dark:border-gray-700 transition-colors" style={{ animationDuration: "3s" }}>
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                      <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                      <div className="font-bold text-gray-900 dark:text-white">4.9/5 Rating</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Dari 2,000+ Pembeli</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryGrid />
      <PromoBanner />

      {/* Main Product Section */}
      <section id="produk" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <FilterSidebar categories={categories} searchParams={params} />

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Produk Pilihan</h2>
                  <p className="text-gray-600 dark:text-gray-400">Sayuran segar siap kirim</p>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 text-gray-400 mx-auto rounded-full flex items-center justify-center mb-4">
                    <SearchX className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Produk Tidak Ditemukan</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Coba sesuaikan filter pencarian Anda atau hapus filter.</p>
                  <Link href="/" className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">Hapus Semua Filter</Link>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
