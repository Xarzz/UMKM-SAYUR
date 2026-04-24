"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Save, ArrowLeft } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }

  const openDetail = async (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    // Fetch order items
    const { data } = await supabase.from("order_items").select("*").eq("order_id", order.id);
    setOrderItems(data || []);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setSaving(true);
    await supabase.from("orders").update({ status: newStatus }).eq("id", selectedOrder.id);
    setSaving(false);
    setSuccessMsg("Status pesanan berhasil diperbarui!");
    setTimeout(() => setSuccessMsg(""), 3000);
    setSelectedOrder(null);
    fetchOrders();
  };

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "processing": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "shipped": return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "completed": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "cancelled": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "pending": return "PENDING";
      case "processing": return "DIPROSES";
      case "shipped": return "DIKIRIM";
      case "completed": return "SELESAI";
      case "cancelled": return "DIBATALKAN";
      default: return status?.toUpperCase();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Detail View
  if (selectedOrder) {
    return (
      <div>
        <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Pesanan
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700 text-gray-900 dark:text-white">Daftar Produk</h3>
              <div className="space-y-4">
                {orderItems.length > 0 ? orderItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{item.product_name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} x {formatRupiah(item.price)}</p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{formatRupiah(item.subtotal)}</p>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm">Data item pesanan tidak tersedia.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Customer Info + Status Update */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700 text-gray-900 dark:text-white">Info Pelanggan</h3>
              <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
              <p className="font-bold text-gray-900 dark:text-white mb-4">{selectedOrder.customer_name}</p>

              <p className="text-sm text-gray-500 mb-1">Nomor Telepon / WA</p>
              <p className="font-bold text-gray-900 dark:text-white mb-4">{selectedOrder.customer_phone || "-"}</p>

              <p className="text-sm text-gray-500 mb-1">Alamat Pengiriman</p>
              <p className="text-gray-900 dark:text-white">{selectedOrder.customer_address || "-"}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700 text-gray-900 dark:text-white">Update Status</h3>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 bg-white text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={saving}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <>
      {successMsg && (
        <div className="mb-4 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded relative">
          {successMsg}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Nomor Pesanan</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Total Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.order_number || `#${order.id}`}</td>
                  <td className="px-6 py-4">{order.customer_name}</td>
                  <td className="px-6 py-4 font-medium text-emerald-600">{formatRupiah(order.grand_total || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusBadge(order.status)}`}>
                      {statusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(order.created_at)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openDetail(order)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-bold transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">Belum ada pesanan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
