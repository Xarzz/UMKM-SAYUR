"use client";

import { useState, useEffect, useRef } from "react";
import { sbGet, sbInsert, sbUpdate, sbDelete, sbUploadImage } from "@/lib/api";
import { Plus, Pencil, Trash2, Search, X, Save, Image as ImageIcon, Upload, Loader2 } from "lucide-react";

interface Product {
  id?: number;
  name: string;
  price: number;
  weight_label: string;
  images: string;
  category_id: number | null;
  is_new: boolean;
  is_fresh: boolean;
  limited_stock: boolean;
  discount_percentage: number;
  cooking_suggestions: string;
  rating: number;
}

const emptyProduct: Product = {
  name: "",
  price: 0,
  weight_label: "",
  images: '[""]',
  category_id: null,
  is_new: false,
  is_fresh: false,
  limited_stock: false,
  discount_percentage: 0,
  cooking_suggestions: "",
  rating: 0,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product>(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar (jpg, png, webp, dll.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    try {
      const url = await sbUploadImage(file);
      setImageUrl(url);
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Gagal upload gambar: " + (err?.message || "Unknown error"));
    }
    setUploading(false);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const prods = await sbGet("products", "select=*,category:categories(*)&order=created_at.desc");
      const cats = await sbGet("categories", "select=*");
      setProducts(prods || []);
      setCategories(cats || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  }

  const openCreate = () => {
    setEditingProduct(emptyProduct);
    setImageUrl("");
    setIsEditing(false);
    setShowModal(true);
  };

  const openEdit = (product: any) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      weight_label: product.weight_label,
      images: product.images,
      category_id: product.category_id,
      is_new: product.is_new || false,
      is_fresh: product.is_fresh || false,
      limited_stock: product.limited_stock || false,
      discount_percentage: product.discount_percentage || 0,
      cooking_suggestions: product.cooking_suggestions || "",
      rating: product.rating || 0,
    });
    try {
      const imgs = JSON.parse(product.images);
      setImageUrl(Array.isArray(imgs) ? imgs[0] : imgs);
    } catch {
      setImageUrl("");
    }
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await sbDelete("products", id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...editingProduct,
      images: JSON.stringify([imageUrl]),
    };
    delete (data as any).id;

    try {
      if (isEditing && editingProduct.id) {
        await sbUpdate("products", editingProduct.id, data);
      } else {
        await sbInsert("products", data);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
    }
    setSaving(false);
  };

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const getFirstImage = (imagesStr: string) => {
    try {
      const images = JSON.parse(imagesStr);
      const img = Array.isArray(images) ? images[0] : images;
      return img || null;
    } catch {
      return null;
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Katalog Produk</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Produk Baru
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:text-white transition-all"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden animate-pulse">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
          </div>
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Produk</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold text-center">
                <tr>
                  <th className="px-6 py-4">Foto</th>
                  <th className="px-6 py-4">Nama Produk</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      {getFirstImage(product.images) ? (
                        <img
                          src={getFirstImage(product.images) || undefined}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.weight_label}</p>
                    </td>
                    <td className="px-6 py-4">
                      {product.category?.name || "-"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      {product.is_new ? (
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">Baru</span>
                      ) : product.is_fresh ? (
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">Segar</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">Biasa</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal with backdrop click-outside */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Image Upload & Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gambar Produk</label>
                
                {/* Preview */}
                {imageUrl ? (
                  <div className="relative w-40 h-40 mb-3 group">
                    <img src={imageUrl} alt="Preview" className="w-full h-full rounded-2xl object-cover border-2 border-gray-200 dark:border-gray-700 shadow-sm" />
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all mb-3"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
                        <p className="text-sm text-gray-500">Mengupload...</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Klik untuk upload gambar</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — Maks 5MB</p>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Upload button + URL fallback */}
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? "Mengupload..." : "Upload Gambar"}
                  </button>
                  <span className="text-xs text-gray-400">atau</span>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Tempel URL gambar..."
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Name & Weight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Produk</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Contoh: Bayam Segar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Label Berat</label>
                  <input
                    type="text"
                    value={editingProduct.weight_label}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weight_label: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Contoh: 250g / ikat"
                  />
                </div>
              </div>

              {/* Price, Discount, Rating */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Harga (Rp)</label>
                  <input
                    type="number"
                    value={editingProduct.price === 0 ? "" : editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value ? Number(e.target.value) : 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diskon (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingProduct.discount_percentage === 0 ? "" : editingProduct.discount_percentage}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discount_percentage: e.target.value ? Number(e.target.value) : 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editingProduct.rating === 0 ? "" : editingProduct.rating}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value ? Number(e.target.value) : 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                <select
                  value={editingProduct.category_id || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Cooking Suggestions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saran Masak</label>
                <input
                  type="text"
                  value={editingProduct.cooking_suggestions}
                  onChange={(e) => setEditingProduct({ ...editingProduct, cooking_suggestions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Contoh: Tumis, Sup, Salad"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4">
                {[
                  { key: "is_fresh", label: "Dipanen Hari Ini" },
                  { key: "is_new", label: "Produk Baru" },
                  { key: "limited_stock", label: "Stok Terbatas" },
                ].map((toggle) => (
                  <label key={toggle.key} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(editingProduct as any)[toggle.key]}
                      onChange={(e) => setEditingProduct({ ...editingProduct, [toggle.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 transition-colors">{toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingProduct.name}
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
