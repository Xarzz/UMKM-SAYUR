"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ChevronRight, Clock, CheckCircle, Truck, XCircle, Package, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function OrderHistory() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login?redirect=/history");
      } else {
        fetchOrders();
      }
    }
  }, [user, authLoading, router]);

  async function fetchOrders() {
    if (!user?.id) return;

    setDataLoading(true);
    setFetchError(false);
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      console.error("Supabase env vars missing");
      setFetchError(true);
      setDataLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(
        `${url}/rest/v1/orders?select=*&user_id=eq.${user.id}&order=created_at.desc`,
        {
          headers: {
            "apikey": key,
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text();
        console.error("Orders API error:", res.status, errText);
        setFetchError(true);
        setOrders([]);
      } else {
        const data = await res.json();
        setOrders(data || []);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.error("Orders fetch timed out after 8s");
      } else {
        console.error("Orders fetch error:", err?.message || err);
      }
      setFetchError(true);
      setOrders([]);
    } finally {
      setDataLoading(false);
    }
  }

  const fetchOrderDetails = async (order: any) => {
    setSelectedOrder(order);
    setOrderItems([]);
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    try {
      const res = await fetch(
        `${url}/rest/v1/order_items?select=*&order_id=eq.${order.id}`,
        {
          headers: {
            "apikey": key,
            "Authorization": `Bearer ${key}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setOrderItems(data || []);
      }
    } catch (err) {
      console.error("Error fetching order items:", err);
    }
  };

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing": return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped": return <Truck className="w-5 h-5 text-indigo-500" />;
      case "completed": return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "cancelled": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Menunggu";
      case "processing": return "Diproses";
      case "shipped": return "Dikirim";
      case "completed": return "Selesai";
      case "cancelled": return "Dibatalkan";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Riwayat Pesanan</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Lacak status pesanan sayur segar Anda</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
            Belanja Lagi <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {selectedOrder ? (
          <div className="space-y-6">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Nomor Pesanan</p>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{selectedOrder.order_number}</h2>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(selectedOrder.created_at)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm mb-2 bg-gray-50 dark:bg-gray-900/50">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" /> Produk yang Dipesan
                </h3>
                <div className="space-y-4">
                  {orderItems.length > 0 ? orderItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{item.product_name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} x {formatRupiah(item.price)}</p>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white">{formatRupiah(item.subtotal)}</p>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-400">Memuat item pesanan...</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Total Pembayaran</p>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{formatRupiah(selectedOrder.grand_total)}</p>
                  </div>
                  
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Informasi Pengiriman</h4>
                    <p className="text-sm text-emerald-800 dark:text-emerald-400 leading-relaxed">
                      {selectedOrder.customer_name} <br />
                      {selectedOrder.customer_phone} <br />
                      {selectedOrder.customer_address}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`https://wa.me/6282232415842?text=Halo Min, saya mau tanya status pesanan ${selectedOrder.order_number}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30"
                    >
                      Hubungi Admin WA <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {dataLoading ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Memuat pesanan...</p>
              </div>
            ) : fetchError ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Gagal Memuat Data</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Terjadi masalah saat mengambil data pesanan.</p>
                <button onClick={fetchOrders} className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                  Coba Lagi
                </button>
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => fetchOrderDetails(order)}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{order.order_number}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400">
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-50 dark:border-gray-700 pt-4 mt-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{formatRupiah(order.grand_total)}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Lihat Detail <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Pesanan</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Anda belum pernah melakukan pemesanan. Mulai belanja sayuran segar sekarang!</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30">
                  Mulai Belanja
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
