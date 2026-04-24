"use client";

import { useState } from "react";
import { Save, Store, Phone, Globe } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    store_name: "Sayur UMKM",
    admin_phone: "6282232415842",
    store_address: "Jl. Pasar Sayur No. 1, Indonesia",
    store_description: "Sayuran segar bebas pestisida langsung dari petani lokal.",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to Supabase or an API
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Toko</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola informasi dasar toko Anda.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-500" /> Informasi Toko
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Toko</label>
              <input
                type="text"
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi Toko</label>
              <textarea
                rows={3}
                value={settings.store_description}
                onChange={(e) => setSettings({ ...settings, store_description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-500" /> Kontak Admin
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nomor WhatsApp Admin</label>
              <input
                type="tel"
                value={settings.admin_phone}
                onChange={(e) => setSettings({ ...settings, admin_phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="628xxxxxxxxxx"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Format: 628xxxxxxxxxx (tanpa + atau spasi)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat Toko</label>
              <input
                type="text"
                value={settings.store_address}
                onChange={(e) => setSettings({ ...settings, store_address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all text-sm"
        >
          <Save className="w-4 h-4" />
          {saved ? "✓ Tersimpan!" : "Simpan Pengaturan"}
        </button>
      </div>
    </div>
  );
}
