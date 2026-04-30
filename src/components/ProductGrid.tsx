"use client";

import { useState, useEffect } from "react";
import { Plus, Star, ChefHat } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  weight_label: string;
  images: string; // JSON string
  is_new?: boolean;
  is_fresh?: boolean;
  limited_stock?: boolean;
  discount_percentage?: number;
  cooking_suggestions?: string;
  category?: { name: string };
  rating?: number;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const { addToCart } = useCart();
  const [isFiltering, setIsFiltering] = useState(false);

  // Matikan skeleton saat data produk baru masuk
  useEffect(() => {
    setIsFiltering(false);
  }, [products]);

  // Dengarkan event dari FilterSidebar
  useEffect(() => {
    const handleFilterStart = () => setIsFiltering(true);
    window.addEventListener("filterStart", handleFilterStart);
    return () => window.removeEventListener("filterStart", handleFilterStart);
  }, []);

  const getFirstImage = (imagesStr: string) => {
    try {
      if (!imagesStr) return "https://via.placeholder.com/300";
      const images = JSON.parse(imagesStr);
      const img = Array.isArray(images) ? images[0] : images;
      return img || "https://via.placeholder.com/300";
    } catch (e) {
      return "https://via.placeholder.com/300";
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (isFiltering) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 aspect-square mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-4"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3"></div>
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const firstImage = getFirstImage(product.images);
        const isPaket = product.category?.name?.toLowerCase().includes("paket");
        const finalPrice = product.discount_percentage 
          ? product.price - (product.price * product.discount_percentage / 100)
          : product.price;

        return (
          <div 
            key={product.id} 
            className={`${
              isPaket 
                ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/50 hover:border-orange-300 dark:hover:border-orange-700' 
                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800'
            } rounded-3xl p-4 shadow-sm border group hover:shadow-xl transition-all duration-300`}
          >
            <div className="relative rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-900 aspect-square">
              <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
                {product.is_new && (
                  <span className="bg-blue-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Baru Datang</span>
                )}
                {product.is_fresh && (
                  <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Dipanen Hari Ini</span>
                )}
                {product.limited_stock && (
                  <span className="bg-yellow-400 text-yellow-900 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Stok Terbatas</span>
                )}
                {product.discount_percentage !== undefined && product.discount_percentage > 0 && (
                  <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Diskon {product.discount_percentage}%</span>
                )}
              </div>
              
              <img 
                src={firstImage} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              
              {product.cooking_suggestions && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium">
                    <ChefHat className="w-3 h-3 inline mr-1" />Cocok untuk: {product.cooking_suggestions}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className={`font-bold text-lg text-gray-900 dark:text-white ${isPaket ? 'group-hover:text-orange-600' : 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'} transition-colors`}>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.weight_label}</p>
              </div>
              {product.rating !== undefined && product.rating > 0 && (
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{product.rating}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                {product.discount_percentage && product.discount_percentage > 0 ? (
                  <>
                    <span className="text-xs text-gray-400 dark:text-gray-500 line-through block">{formatRupiah(product.price)}</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{formatRupiah(finalPrice)}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{formatRupiah(product.price)}</span>
                )}
              </div>
              
              <button 
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: finalPrice,
                  label: product.weight_label,
                  img: firstImage
                })}
                className={`w-10 h-10 rounded-full ${
                  isPaket 
                    ? 'bg-orange-200 dark:bg-orange-800/50 text-orange-700 dark:text-orange-400 hover:bg-orange-500 hover:text-white' 
                    : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white'
                } flex items-center justify-center transition-colors`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
