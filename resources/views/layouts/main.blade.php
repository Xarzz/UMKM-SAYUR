<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Katalog Sayur UMKM') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700|outfit:400,500,600,700&display=swap" rel="stylesheet" />
    
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <style>
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; }
        
        .glass {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        .dark .glass {
            background: rgba(17, 24, 39, 0.85);
            border-bottom: 1px solid rgba(55, 65, 81, 0.5);
        }
    </style>

    <!-- Dark Mode Init Script -->
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>
</head>
<body class="font-sans antialiased bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" x-data="appData()">
    
    <!-- Navbar -->
    <nav class="fixed w-full z-40 glass transition-all duration-300 border-b border-gray-200/50 dark:border-gray-800/50" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="{{ route('home') }}" class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <i data-lucide="leaf" class="w-6 h-6"></i>
                        </div>
                        <span class="font-bold text-xl tracking-tight text-emerald-900 dark:text-white">Sayur <span class="text-emerald-500">UMKM</span></span>
                    </a>
                </div>
                
                <!-- Search Bar -->
                <div class="hidden md:flex flex-1 items-center justify-center px-8">
                    <form action="{{ route('home') }}" method="GET" onsubmit="window.location.href='{{ route('home') }}?search=' + encodeURIComponent(this.search.value) + '#produk'; return false;" class="w-full max-w-lg relative group">
                        <input type="text" name="search" value="{{ request('search') }}" placeholder="Cari bayam, wortel, dsb..." class="w-full bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all">
                        <button type="submit" class="absolute left-4 top-1/2 -translate-y-1/2"><i data-lucide="search" class="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors"></i></button>
                    </form>
                </div>

                <div class="flex items-center gap-2 sm:gap-4 relative">
                    <!-- Dark Mode Toggle -->
                    <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none rounded-lg text-sm p-2.5 transition-colors">
                        <i id="theme-toggle-dark-icon" data-lucide="moon" class="hidden w-5 h-5"></i>
                        <i id="theme-toggle-light-icon" data-lucide="sun" class="hidden w-5 h-5"></i>
                    </button>

                    <!-- Cart Button (Opens Slide-over) -->
                    <button @click="cartOpen = true" class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        <i data-lucide="shopping-cart" class="w-6 h-6"></i>
                        <span x-show="totalCartItems > 0" x-text="totalCartItems" class="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900 transition-colors"></span>
                    </button>
                    
                    <!-- Profile Dropdown -->
                    <div class="relative ml-2">
                        <button @click="profileOpen = !profileOpen" @click.away="profileOpen = false" class="flex items-center gap-2 focus:outline-none">
                            <img src="https://ui-avatars.com/api/?name=Budi+S&background=10b981&color=fff" alt="Profile" class="w-9 h-9 rounded-full border-2 border-transparent hover:border-emerald-500 transition-all">
                            <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500 dark:text-gray-400"></i>
                        </button>
                        <!-- Dropdown -->
                        <div x-show="profileOpen" @click.away="profileOpen = false" x-transition.opacity
                             class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 overflow-hidden" style="display: none;">
                            @auth
                                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ Auth::user()->name }}</p>
                                    <p class="text-xs text-gray-500 truncate">{{ Auth::user()->email }}</p>
                                </div>
                                <a href="{{ route('checkout.history') }}" class="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-gray-700 transition-colors">
                                    <i data-lucide="shopping-bag" class="w-4 h-4 mr-3"></i>Riwayat Belanja
                                </a>
                                @if(auth()->user()->is_admin)
                                <a href="{{ route('dashboard') }}" class="flex items-center px-4 py-2.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors">
                                    <i data-lucide="layout-dashboard" class="w-4 h-4 mr-3"></i>Dashboard Admin
                                </a>
                                @endif
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                        <i data-lucide="log-out" class="w-4 h-4 mr-3"></i>Keluar
                                    </button>
                                </form>
                            @else
                                <a href="{{ route('login') }}" class="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-gray-700 transition-colors">
                                    <i data-lucide="log-in" class="w-4 h-4 mr-3"></i>Masuk
                                </a>
                                <a href="{{ route('register') }}" class="flex items-center px-4 py-2.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors">
                                    <i data-lucide="user-plus" class="w-4 h-4 mr-3"></i>Daftar Akun Baru
                                </a>
                            @endauth
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16 min-h-screen">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-emerald-950 text-emerald-50 pt-16 pb-8 border-t border-emerald-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div class="col-span-1 md:col-span-1">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                            <i data-lucide="leaf" class="w-6 h-6"></i>
                        </div>
                        <span class="font-bold text-xl tracking-tight text-white">Sayur <span class="text-emerald-400">UMKM</span></span>
                    </div>
                    <p class="text-emerald-200/80 text-sm mb-6 leading-relaxed">
                        Sayuran segar langsung dari petani lokal. Lebih sehat, lebih murah, dan memberdayakan petani UMKM.
                    </p>
                </div>
                <div>
                    <h3 class="font-semibold text-lg mb-4 text-white">Kategori</h3>
                    <ul class="space-y-2 text-sm text-emerald-200/80">
                        <li><a href="#" class="hover:text-emerald-400 transition-colors">Sayur Daun</a></li>
                        <li><a href="#" class="hover:text-emerald-400 transition-colors">Umbi-umbian</a></li>
                        <li><a href="#" class="hover:text-emerald-400 transition-colors">Bumbu Dapur</a></li>
                        <li><a href="#" class="hover:text-emerald-400 transition-colors">Buah Segar</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-lg mb-4 text-white">Layanan</h3>
                    <ul class="space-y-2 text-sm text-emerald-200/80">
                        <li><a href="#" class="hover:text-emerald-400 transition-colors">Cara Pesan</a></li>
                        <li><a href="#" class="hover:text-emerald-400 transition-colors">Jadwal Pengiriman</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-lg mb-4 text-white">Hubungi Kami</h3>
                    <ul class="space-y-3 text-sm text-emerald-200/80">
                        <li class="flex items-start gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-emerald-400 shrink-0"></i>
                            <span>Jl. Pertanian 123, Jawa Barat</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-emerald-800/50 pt-8 text-center text-sm text-emerald-200/60">
                &copy; {{ date('Y') }} Sayur UMKM. All rights reserved.
            </div>
        </div>
    </footer>

    <!-- Slide-Over Cart (Keranjang Belanja) -->
    <div x-show="cartOpen" class="fixed inset-0 z-50 overflow-hidden" style="display: none;" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div class="absolute inset-0 overflow-hidden">
            <!-- Background Overlay -->
            <div x-show="cartOpen" x-transition.opacity class="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" @click="cartOpen = false"></div>

            <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <!-- Slide-over panel -->
                <div x-show="cartOpen" 
                     x-transition:enter="transform transition ease-in-out duration-300 sm:duration-500" 
                     x-transition:enter-start="translate-x-full" 
                     x-transition:enter-end="translate-x-0" 
                     x-transition:leave="transform transition ease-in-out duration-300 sm:duration-500" 
                     x-transition:leave-start="translate-x-0" 
                     x-transition:leave-end="translate-x-full" 
                     class="w-screen max-w-md pointer-events-auto">
                    <div class="flex h-full flex-col overflow-y-hidden bg-white dark:bg-gray-800 shadow-xl">
                        
                        <!-- Cart Header -->
                        <div class="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white" id="slide-over-title">Keranjang Belanja</h2>
                            <button type="button" @click="cartOpen = false" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <i data-lucide="x" class="h-6 w-6"></i>
                            </button>
                        </div>

                        <!-- Cart Items -->
                        <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            
                            <div x-show="cartItems.length === 0" class="py-10 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                                <i data-lucide="shopping-cart" class="w-12 h-12 mb-4 opacity-50"></i>
                                Keranjang Anda masih kosong.
                            </div>

                            <ul role="list" class="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                <template x-for="(item, index) in cartItems" :key="item.id">
                                    <li class="flex py-6">
                                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                            <img :src="item.img" class="h-full w-full object-cover object-center">
                                        </div>
                                        <div class="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                    <h3 x-text="item.name"></h3>
                                                    <p class="ml-4 font-bold" x-text="formatRupiah(item.price * item.qty)"></p>
                                                </div>
                                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400" x-text="item.label"></p>
                                            </div>
                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                <div class="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                                                    <button type="button" @click.prevent.stop="if(item.qty > 1) item.qty--; else cartItems.splice(index, 1)" class="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">-</button>
                                                    <span class="px-3 py-1 font-medium dark:text-white bg-white dark:bg-gray-800" x-text="item.qty"></span>
                                                    <button type="button" @click.prevent.stop="item.qty++" class="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">+</button>
                                                </div>
                                                <button type="button" @click.prevent.stop="cartItems.splice(index, 1)" class="font-medium text-red-500 hover:text-red-600 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                            </div>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>

                        <!-- Cart Footer (Checkout) -->
                        <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
                            <div class="flex justify-between text-base font-bold text-gray-900 dark:text-white mb-4">
                                <p>Total Estimasi</p>
                                <p x-text="formatRupiah(cartTotal)"></p>
                            </div>
                            <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">Ongkos kirim akan dihitung saat checkout.</p>
                            
                            <!-- ALIGNED BUTTONS -->
                            <div class="mt-4 flex flex-col gap-4 w-full">
                                <a href="{{ route('checkout.index') }}" class="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors focus:ring-4 focus:ring-emerald-500/30">
                                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                                    Lanjut ke Checkout
                                </a>
                                
                                <div class="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    atau 
                                    <button type="button" @click="cartOpen = false" class="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 hover:underline">
                                        Lanjut Belanja <span aria-hidden="true">&rarr;</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div x-show="toastOpen" 
         x-transition:enter="transform ease-out duration-300 transition" 
         x-transition:enter-start="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" 
         x-transition:enter-end="translate-y-0 opacity-100 sm:translate-x-0" 
         x-transition:leave="transition ease-in duration-100" 
         x-transition:leave-start="opacity-100" 
         x-transition:leave-end="opacity-0" 
         class="fixed bottom-24 right-6 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-50 border border-emerald-100 dark:border-emerald-900/50" 
         style="display: none;">
        <div class="p-4">
            <div class="flex items-start">
                <div class="flex-shrink-0 mt-0.5">
                    <i data-lucide="check-circle-2" class="h-5 w-5 text-emerald-500"></i>
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900 dark:text-white" x-text="toastMsg"></p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                    <button @click="toastOpen = false" class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                        <i data-lucide="x" class="h-5 w-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- WhatsApp Floating Action Button -->
    <a href="https://wa.me/6281234567890" target="_blank" class="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 hover:-translate-y-1 transition-all z-40 animate-bounce" style="animation-duration: 3s;">
        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
    </a>

    <script>
        // Init Lucide
        lucide.createIcons();

        // Dark Mode Logic
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }

        const themeToggleBtn = document.getElementById('theme-toggle');
        themeToggleBtn.addEventListener('click', function() {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
            if (localStorage.theme) {
                if (localStorage.theme === 'light') { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; } 
                else { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; }
            } else {
                if (document.documentElement.classList.contains('dark')) { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; } 
                else { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; }
            }
        });

        // Alpine Global State App Data
        function appData() {
            return {
                cartOpen: false,
                profileOpen: false,
                toastMsg: '',
                toastOpen: false,
                cartItems: JSON.parse(localStorage.getItem('sayur_cart') || '[]'),
                saveCart() {
                    localStorage.setItem('sayur_cart', JSON.stringify(this.cartItems));
                },
                get totalCartItems() {
                    return this.cartItems.reduce((total, item) => total + item.qty, 0);
                },
                get cartTotal() {
                    return this.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
                },
                addToCart(product) {
                    let existing = this.cartItems.find(i => i.id === product.id);
                    if(existing) {
                        existing.qty++;
                    } else {
                        this.cartItems.push({...product, qty: 1});
                    }
                    this.saveCart();
                    this.toastMsg = product.name + ' ditambahkan ke keranjang!';
                    this.toastOpen = true;
                    setTimeout(() => { this.toastOpen = false; }, 3000);
                    setTimeout(() => lucide.createIcons(), 50);
                },
                removeFromCart(index) {
                    this.cartItems.splice(index, 1);
                    this.saveCart();
                },
                incrementQty(index) {
                    this.cartItems[index].qty++;
                    this.saveCart();
                },
                decrementQty(index) {
                    if(this.cartItems[index].qty > 1) {
                        this.cartItems[index].qty--;
                    } else {
                        this.cartItems.splice(index, 1);
                    }
                    this.saveCart();
                },
                formatRupiah(number) {
                    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
                },
                checkoutToWhatsApp() {
                    if (this.cartItems.length === 0) {
                        this.toastMsg = 'Keranjang belanja masih kosong!';
                        this.toastOpen = true;
                        setTimeout(() => { this.toastOpen = false; }, 3000);
                        return;
                    }
                    
                    let message = "Halo Admin Sayur UMKM, saya ingin memesan sayur berikut ini:%0A%0A";
                    
                    this.cartItems.forEach((item, index) => {
                        message += `*${index + 1}. ${item.name}*%0A`;
                        message += `- Jumlah: ${item.qty} ${item.label ? '('+item.label+')' : ''}%0A`;
                        message += `- Subtotal: ${this.formatRupiah(item.price * item.qty)}%0A%0A`;
                    });
                    
                    message += `*Total Estimasi: ${this.formatRupiah(this.cartTotal)}*%0A%0A`;
                    message += "Mohon infokan total beserta ongkos kirimnya ya. Terima kasih!";
                    
                    let phone = "6282232415842"; // Nomor asli UMKM
                    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                }
            }
        }
    </script>
</body>
</html>
