"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package, Tag, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    freshProducts: 0,
    promoProducts: 0,
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: products } = await supabase.from("products").select("*");
        const { data: categories } = await supabase.from("categories").select("*");

        const prods = products || [];
        const cats = categories || [];

        setStats({
          totalProducts: prods.length,
          totalCategories: cats.length,
          freshProducts: prods.filter((p: any) => p.is_fresh).length,
          promoProducts: prods.filter((p: any) => p.discount_percentage && p.discount_percentage > 0).length,
        });

        setRecentProducts(prods.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const getFirstImage = (imagesStr: string) => {
    try {
      const images = JSON.parse(imagesStr);
      return Array.isArray(images) ? images[0] : images;
    } catch {
      return "https://via.placeholder.com/100";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Produk", value: stats.totalProducts, icon: Package, color: "bg-blue-500", lightBg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Total Kategori", value: stats.totalCategories, icon: Tag, color: "bg-purple-500", lightBg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "Produk Segar", value: stats.freshProducts, icon: TrendingUp, color: "bg-emerald-500", lightBg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Sedang Promo", value: stats.promoProducts, icon: ShoppingCart, color: "bg-orange-500", lightBg: "bg-orange-50 dark:bg-orange-900/20" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Selamat datang di panel admin Sayur UMKM.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.lightBg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 dark:text-white">Produk Terbaru</h2>
          <a href="/admin/products" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1">
            Lihat Semua <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {recentProducts.map((product: any) => (
            <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <img 
                src={getFirstImage(product.images)} 
                alt={product.name} 
                className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-gray-700" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.weight_label}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">{formatRupiah(product.price)}</p>
                {product.discount_percentage > 0 && (
                  <span className="text-xs text-red-500 font-medium">-{product.discount_percentage}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
