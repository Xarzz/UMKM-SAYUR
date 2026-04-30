"use client";

import { useState, useEffect } from "react";
import { sbGet, sbInsert, sbUpdate, sbDelete } from "@/lib/api";
import { Plus, Pencil, Trash2, X, Save, Tag } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<{ id?: number; name: string }>({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [productCounts, setProductCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const cats = await sbGet("categories", "select=*&order=id");
      const prods = await sbGet("products", "select=category_id");

      // Count products per category
      const counts: Record<number, number> = {};
      (prods || []).forEach((p: any) => {
        if (p.category_id) {
          counts[p.category_id] = (counts[p.category_id] || 0) + 1;
        }
      });

      setCategories(cats || []);
      setProductCounts(counts);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  }

  const openCreate = () => {
    setEditingCat({ name: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEdit = (cat: any) => {
    setEditingCat({ id: cat.id, name: cat.name });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (productCounts[id] && productCounts[id] > 0) {
      alert(`Kategori ini memiliki ${productCounts[id]} produk. Hapus atau pindahkan produk terlebih dahulu.`);
      return;
    }
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    try {
      await sbDelete("categories", id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSave = async () => {
    if (!editingCat.name.trim()) return;
    setSaving(true);

    try {
      if (isEditing && editingCat.id) {
        await sbUpdate("categories", editingCat.id, { name: editingCat.name.trim() });
      } else {
        await sbInsert("categories", { name: editingCat.name.trim() });
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
    }
    setSaving(false);
  };

  const colors = [
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
    "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400",
    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400",
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Kategori</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{categories.length} kategori terdaftar</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[i % colors.length]}`}>
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {productCounts[cat.id] || 0} produk
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
              Belum ada kategori. Klik "Tambah Kategori" untuk memulai.
            </div>
          )}
        </div>
      )}

      {/* Modal with backdrop click-outside */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {isEditing ? "Edit Kategori" : "Tambah Kategori Baru"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Kategori</label>
              <input
                type="text"
                value={editingCat.name}
                onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Contoh: Sayur Daun"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingCat.name.trim()}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Menyimpan..." : isEditing ? "Perbarui" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
