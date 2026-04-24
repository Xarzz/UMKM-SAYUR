"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Leaf, Search, Moon, Sun, ShoppingCart, ChevronDown, LogOut, LogIn, UserPlus, X, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const { cartItems, totalItems, cartTotal, incrementQty, decrementQty, removeFromCart } = useCart();
  
  // Real auth state will come from Supabase later
  const [user, setUser] = useState<any>(null); 

  // Sync search input with URL search param
  useEffect(() => {
    const urlSearch = currentSearchParams.get("search") || "";
    setSearchQuery(urlSearch);
  }, [currentSearchParams]);

  useEffect(() => {
    // 1. Sync User dari localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 2. Theme initialization
    const isDark = localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
      localStorage.theme = "light";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Preserve existing filters from URL when searching
    const params = new URLSearchParams(window.location.search);
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}#produk` : "/#produk");
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <>
      <nav className="fixed w-full z-40 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md transition-all duration-300 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="font-bold text-lg sm:text-xl tracking-tight text-emerald-900 dark:text-white">
                  Warung Sayur <span className="text-emerald-500">Segar Malang</span>
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex flex-1 items-center justify-center px-8">
              <form onSubmit={handleSearch} className="w-full max-w-lg relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari bayam, wortel, dsb..." 
                  className="w-full bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
                />
                <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 relative">
              <button onClick={toggleDarkMode} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none rounded-lg text-sm p-2.5 transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button onClick={() => setCartOpen(true)} className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900 transition-colors">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <div className="relative ml-2">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 focus:outline-none">
                  <img 
                    src={user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10b981&color=fff` : "https://ui-avatars.com/api/?name=Guest&background=e2e8f0&color=475569"} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-full border-2 border-transparent hover:border-emerald-500 transition-all" 
                  />
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 overflow-hidden">
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <button 
                            onClick={() => {
                              localStorage.removeItem("user");
                              setUser(null);
                              setProfileOpen(false);
                              router.push("/");
                            }}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />Keluar
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/login" className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-gray-700 transition-colors">
                            <LogIn className="w-4 h-4 mr-3" />Masuk
                          </Link>
                          <Link href="/register" className="flex items-center px-4 py-2.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors">
                            <UserPlus className="w-4 h-4 mr-3" />Daftar Akun Baru
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-Over Cart */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col pointer-events-auto h-full">
              <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Keranjang Belanja</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
                    <p>Keranjang Anda masih kosong.</p>
                  </div>
                ) : (
                  <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                          <img src={item.img} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                              <h3>{item.name}</h3>
                              <p className="ml-4 font-bold">{formatRupiah(item.price * item.qty)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                              <button onClick={() => decrementQty(item.id)} className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">-</button>
                              <span className="px-3 py-1 font-medium dark:text-white bg-white dark:bg-gray-800">{item.qty}</span>
                              <button onClick={() => incrementQty(item.id)} className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="font-medium text-red-500 hover:text-red-600 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white mb-4">
                    <p>Total Estimasi</p>
                    <p>{formatRupiah(cartTotal)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">Ongkos kirim akan dihitung saat checkout.</p>
                  <button 
                    onClick={() => {
                      if (!user) {
                        setCartOpen(false);
                        router.push("/login?redirect=/checkout");
                      } else {
                        setCartOpen(false);
                        router.push("/checkout");
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Lanjut ke Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
