"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { List, Banknote, Tag, Truck, ChevronDown, SlidersHorizontal } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface FilterSidebarProps {
  categories: Category[];
  searchParams: any;
}

export default function FilterSidebar({ categories, searchParams }: FilterSidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // State for real-time price display
  const [maxPrice, setMaxPrice] = useState(searchParams.max_price || 200000);

  // Sync maxPrice with searchParams
  useEffect(() => {
    setMaxPrice(searchParams.max_price || 200000);
  }, [searchParams.max_price]);

  // Unified handler for all filters
  const handleFilterChange = (name: string, value: string | boolean) => {
    const params = new URLSearchParams(window.location.search);
    
    if (value === "" || value === false || value === undefined) {
      params.delete(name);
    } else {
      params.set(name, value.toString());
    }
    
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}#produk` : "/#produk", { scroll: false });
  };

  // Debounce for range input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (maxPrice != (searchParams.max_price || 200000)) {
        handleFilterChange("max_price", maxPrice);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [maxPrice]);

  return (
    <aside className="w-full lg:w-1/4 shrink-0">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-4"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-emerald-500" /> 
          Filter & Kategori
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Form */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24 transition-colors`}>
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <List className="w-5 h-5 text-emerald-500" /> Kategori Lengkap
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="category_filter" 
                checked={!searchParams.category} 
                onChange={() => handleFilterChange("category", "")}
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
              />
              <span className="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 transition-colors">Semua Kategori</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category_filter" 
                  checked={String(searchParams.category) === String(cat.id)} 
                  onChange={() => handleFilterChange("category", cat.id.toString())}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
                />
                <span className="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 transition-colors">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <hr className="border-gray-100 dark:border-gray-700 mb-6" />

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-500" /> Harga Maksimal
          </h3>
          <div className="px-2">
            <input 
              type="range" 
              name="max_price" 
              min="5000" 
              max="200000" 
              step="5000" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-3">
              <span>Rp {Number(maxPrice).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-700 mb-6" />

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-500" /> Spesial
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={!!searchParams.is_fresh} 
                onChange={(e) => handleFilterChange("is_fresh", e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer" 
              />
              <span className="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 transition-colors">Dipanen Hari Ini</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={!!searchParams.is_promo} 
                onChange={(e) => handleFilterChange("is_promo", e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer" 
              />
              <span className="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 transition-colors">Diskon & Promo</span>
            </label>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 flex items-start gap-3 mb-6">
          <Truck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm">Info Kirim</h4>
            <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">Pesan sebelum 15:00, kirim besok pagi.</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => {
            setMaxPrice(200000);
            router.push("/");
          }}
          className="w-full flex justify-center py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Hapus Semua Filter
        </button>
      </div>
    </aside>
  );
}
