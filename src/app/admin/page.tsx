"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShoppingBag, Box, Users, Wallet } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: products } = await supabase.from("products").select("id");
        const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false });

        const allOrders = orders || [];
        const uniqueCustomers = new Set(allOrders.map((o: any) => o.customer_name)).size;
        const revenue = allOrders.reduce((sum: number, o: any) => sum + (o.grand_total || 0), 0);

        setStats({
          totalOrders: allOrders.length,
          totalProducts: (products || []).length,
          totalCustomers: uniqueCustomers,
          totalRevenue: revenue,
        });

        setRecentOrders(allOrders.slice(0, 5));
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50";
      case "processing":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
      case "completed":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
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
    { label: "Total Pesanan", value: stats.totalOrders.toLocaleString("id-ID"), icon: ShoppingBag, bgIcon: "bg-emerald-100 dark:bg-emerald-900/30", colorIcon: "text-emerald-600 dark:text-emerald-400" },
    { label: "Total Produk", value: stats.totalProducts.toLocaleString("id-ID"), icon: Box, bgIcon: "bg-blue-100 dark:bg-blue-900/30", colorIcon: "text-blue-600 dark:text-blue-400" },
    { label: "Total Pelanggan", value: stats.totalCustomers.toLocaleString("id-ID"), icon: Users, bgIcon: "bg-orange-100 dark:bg-orange-900/30", colorIcon: "text-orange-600 dark:text-orange-400" },
    { label: "Pendapatan", value: formatRupiah(stats.totalRevenue), icon: Wallet, bgIcon: "bg-purple-100 dark:bg-purple-900/30", colorIcon: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bgIcon} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-7 h-7 ${stat.colorIcon}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
          <a href="/admin/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Lihat Semua</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.order_number || `#${order.id}`}</td>
                  <td className="px-6 py-4">{order.customer_name}</td>
                  <td className="px-6 py-4">{formatDate(order.created_at)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{formatRupiah(order.grand_total || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge(order.status)}`}>
                      {order.status === "pending" ? "Pending" : order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Belum ada pesanan masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
