"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, MapPin, Truck, Wallet, CheckCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, totalItems } = useCart();
  
  const { user, profile, loading: authLoading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    payment_method: "bank_transfer",
  });

  useEffect(() => {
    // Tunggu sampai auth Supabase selesai loading
    if (authLoading) return;

    if (user) {
      setFormData(prev => ({
        ...prev,
        customer_name: profile?.full_name || user.user_metadata?.full_name || "",
        customer_email: user.email || ""
      }));
      setPageLoading(false);
    } else {
      // Redirect ke login jika belum login
      router.push("/login?redirect=/checkout");
    }
  }, [user, profile, authLoading, router]);

  if (authLoading || pageLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  const grandTotal = cartTotal;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp logic as in the original project
    let message = `*PESANAN BARU - WARUNG SAYUR SEGAR MALANG*%0A%0A`;
    message += `*Data Penerima:*%0A`;
    message += `- Nama: ${formData.customer_name}%0A`;
    message += `- Email: ${formData.customer_email}%0A`;
    message += `- WA: ${formData.customer_phone}%0A`;
    message += `- Alamat: ${formData.customer_address}%0A%0A`;
    
    message += `*Daftar Belanja:*%0A`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.qty}x) - ${formatRupiah(item.price * item.qty)}%0A`;
    });
    
    message += `%0A*Rincian:*%0A`;
    message += `- Subtotal: ${formatRupiah(cartTotal)}%0A`;
    message += `*Total Tagihan: ${formatRupiah(grandTotal)}*%0A%0A`;
    message += `*Metode Bayar:* ${formData.payment_method === 'bank_transfer' ? 'Transfer Bank' : 'COD'}%0A%0A`;
    message += `Mohon segera diproses ya Min. Terima kasih!`;

    const phone = "6282232415842"; // Admin phone baru
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  if (totalItems === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Keranjang Anda Kosong</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Anda belum menambahkan sayur apapun ke keranjang.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Kembali Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium">Checkout Pembayaran</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Selesaikan Pesanan Anda</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Alamat Pengiriman */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-emerald-500" /> Alamat Pengiriman
                </h2>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nama Penerima</label>
                      <input 
                        type="text" 
                        name="customer_name" 
                        required 
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nomor WhatsApp</label>
                      <input 
                        type="tel" 
                        name="customer_phone" 
                        required 
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                        placeholder="Contoh: 08123456789" 
                      />
                    </div>
                  </div>

                  <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Aktif</label>
                      <input 
                        type="email" 
                        name="customer_email" 
                        required 
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                        placeholder="nama@email.com"
                      />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Alamat Lengkap (Jl, RT/RW, Patokan)</label>
                    <textarea 
                      name="customer_address" 
                      required 
                      rows={3} 
                      value={formData.customer_address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 2. Pembayaran */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-emerald-500" /> Metode Pembayaran
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative flex cursor-pointer rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 shadow-sm hover:border-emerald-500 transition-colors">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="bank_transfer" 
                      checked={formData.payment_method === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="mr-3 mt-1 text-emerald-600 focus:ring-emerald-500" 
                    />
                    <div>
                      <span className="block text-sm font-bold text-gray-900 dark:text-white">Transfer Bank (BCA/Mandiri)</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Verifikasi manual</span>
                    </div>
                  </label>
                  <label className="relative flex cursor-pointer rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 shadow-sm hover:border-emerald-500 transition-colors">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="cod" 
                      checked={formData.payment_method === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3 mt-1 text-emerald-600 focus:ring-emerald-500" 
                    />
                    <div>
                      <span className="block text-sm font-bold text-gray-900 dark:text-white">Bayar di Tempat (COD)</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Bayar saat sayur sampai</span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Ringkasan Belanja */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Ringkasan Belanja</h2>
              
              <div className="flow-root mb-6">
                <ul role="list" className="-my-4 divide-y divide-gray-100 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center py-4">
                      <img src={item.img} className="h-16 w-16 rounded-xl object-cover border border-gray-100 dark:border-gray-700" />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.qty} x {formatRupiah(item.price)}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formatRupiah(item.price * item.qty)}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-600 dark:text-gray-400">Subtotal Produk</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatRupiah(cartTotal)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Total Tagihan</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatRupiah(grandTotal)}</p>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  type="submit" 
                  form="checkout-form"
                  className="w-full flex justify-center items-center gap-2 rounded-xl border border-transparent bg-emerald-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all"
                >
                  <CheckCircle className="w-5 h-5" /> Bayar Sekarang
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
