@extends('layouts.main')

@section('content')
<!-- Hero Section -->
<section class="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden bg-emerald-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-emerald-200/50 dark:bg-emerald-900/20 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-lighten transition-colors"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-yellow-200/50 dark:bg-yellow-900/10 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-lighten transition-colors"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div class="max-w-2xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6 transition-colors">
                    <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    Dipanen Pagi Ini, Diantar Siang Ini
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 transition-colors">
                    Segar dari Petani,<br>
                    <span class="text-emerald-600 dark:text-emerald-400">Langsung ke Dapurmu.</span>
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl transition-colors">
                    Nikmati sayuran segar bebas pestisida setiap hari. Kami menghubungkan Anda langsung dengan petani lokal untuk kualitas terbaik dengan harga jujur.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="#produk" class="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1">
                        Belanja Sekarang
                    </a>
                    <a href="#kategori" class="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-all">
                        Lihat Kategori
                    </a>
                </div>
                
                <!-- USP/Kenapa Kami -->
                <div class="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
                    <div>
                        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Tanpa Pestisida</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">< 24J</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Waktu Kirim</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Petani Lokal</div>
                    </div>
                </div>
            </div>
            
            <div class="relative lg:ml-auto">
                <div class="absolute inset-0 bg-emerald-500 rounded-[3rem] rotate-3 scale-105 opacity-20 blur-xl"></div>
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" alt="Sayuran Segar" class="relative rounded-[3rem] shadow-2xl object-cover h-[600px] w-full max-w-lg mx-auto">
                
                <!-- Floating badge -->
                <div class="absolute bottom-10 -left-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce border border-gray-100 dark:border-gray-700 transition-colors" style="animation-duration: 3s;">
                    <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                        <i data-lucide="star" class="w-6 h-6 fill-current"></i>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900 dark:text-white">4.9/5 Rating</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Dari 2,000+ Pembeli</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Kategori Populer -->
<section id="kategori" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kategori Populer</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Pilih dari berbagai macam kategori hasil bumi segar yang kami sediakan setiap harinya.</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="#" class="group relative overflow-hidden rounded-3xl h-64 hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1887&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 text-left">
                    <h3 class="font-bold text-2xl text-white mb-1 drop-shadow-md">Sayur Daun</h3>
                    <p class="text-sm text-emerald-100 drop-shadow-md">120+ Produk</p>
                </div>
            </a>
            
            <a href="#" class="group relative overflow-hidden rounded-3xl h-64 hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1770&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/40 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 text-left">
                    <h3 class="font-bold text-2xl text-white mb-1 drop-shadow-md">Umbi-umbian</h3>
                    <p class="text-sm text-orange-100 drop-shadow-md">45+ Produk</p>
                </div>
            </a>
            
            <a href="#" class="group relative overflow-hidden rounded-3xl h-64 hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1770&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/40 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 text-left">
                    <h3 class="font-bold text-2xl text-white mb-1 drop-shadow-md">Bumbu Dapur</h3>
                    <p class="text-sm text-red-100 drop-shadow-md">80+ Produk</p>
                </div>
            </a>
            
            <a href="#" class="group relative overflow-hidden rounded-3xl h-64 hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1770&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/40 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 text-left">
                    <h3 class="font-bold text-2xl text-white mb-1 drop-shadow-md">Buah Segar</h3>
                    <p class="text-sm text-yellow-100 drop-shadow-md">60+ Produk</p>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- Promo / Flash Sale -->
<section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-800 dark:from-emerald-800 dark:to-teal-950 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            <div class="grid md:grid-cols-2 items-center">
                <div class="p-12 md:p-16 relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold mb-6">
                        <i data-lucide="zap" class="w-4 h-4 fill-current"></i> Flash Sale
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Diskon Spesial<br>Musim Hujan!
                    </h2>
                    <p class="text-emerald-100 mb-8 text-lg">
                        Dapatkan paket sayur sop dan aneka jamur dengan potongan harga hingga 40%. Stok terbatas setiap harinya.
                    </p>
                    <button class="bg-white text-emerald-800 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-lg">
                        Cek Promo
                    </button>
                </div>
                <div class="h-full hidden md:block">
                    <img src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1915&auto=format&fit=crop" class="w-full h-full object-cover rounded-l-[4rem] border-8 border-emerald-600/30 dark:border-emerald-800/30">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Produk & Katalog Sidebar (With Skeleton Loading Simulation) -->
<section id="produk" class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" x-data="{ loading: true }" x-init="setTimeout(() => loading = false, 1500)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col lg:flex-row gap-8" x-data="{ mobileFilterOpen: false }">
            
            <!-- Mobile Filter Toggle Button -->
            <button @click="mobileFilterOpen = !mobileFilterOpen" class="lg:hidden w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="flex items-center gap-2"><i data-lucide="sliders-horizontal" class="w-5 h-5 text-emerald-500"></i> Filter & Kategori</span>
                <i data-lucide="chevron-down" class="w-5 h-5 transition-transform text-gray-400" :class="mobileFilterOpen ? 'rotate-180' : ''"></i>
            </button>

            <!-- Sidebar -->
            <aside class="w-full lg:w-1/4 shrink-0 transition-all duration-300 hidden lg:block" :class="mobileFilterOpen ? '!block' : ''">
                <form id="filterForm" action="{{ route('home') }}" method="GET" class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24 transition-colors">
                    
                    <!-- Kategori Lengkap -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <i data-lucide="list" class="w-5 h-5 text-emerald-500"></i> Kategori Lengkap
                        </h3>
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 group cursor-pointer">
                                <input type="radio" name="category" value="" onchange="submitFilter()" {{ !request('category') ? 'checked' : '' }} class="w-5 h-5 border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500">
                                <span class="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Semua Kategori</span>
                            </label>
                            @foreach($categories as $category)
                            <label class="flex items-center gap-3 group cursor-pointer">
                                <input type="radio" name="category" value="{{ $category->id }}" onchange="submitFilter()" {{ request('category') == $category->id ? 'checked' : '' }} class="w-5 h-5 border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500">
                                <span class="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ $category->name }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>
                    
                    <hr class="border-gray-100 dark:border-gray-700 mb-6">

                    <!-- Filter Harga -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <i data-lucide="banknote" class="w-5 h-5 text-emerald-500"></i> Harga Maksimal
                        </h3>
                        <div class="px-2">
                            <input type="range" name="max_price" min="5000" max="200000" step="5000" value="{{ request('max_price', 200000) }}" onchange="submitFilter()" oninput="document.getElementById('priceValue').innerText = 'Rp ' + parseInt(this.value).toLocaleString('id-ID')" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600">
                            <div class="flex justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-3">
                                <span id="priceValue">Rp {{ number_format(request('max_price', 200000), 0, ',', '.') }}</span>
                            </div>
                        </div>
                    </div>

                    <hr class="border-gray-100 dark:border-gray-700 mb-6">

                    <!-- Filter Spesial -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <i data-lucide="tag" class="w-5 h-5 text-emerald-500"></i> Spesial Hari Ini
                        </h3>
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 group cursor-pointer">
                                <input type="checkbox" name="is_fresh" value="1" onchange="submitFilter()" {{ request('is_fresh') ? 'checked' : '' }} class="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500">
                                <span class="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Dipanen Hari Ini</span>
                            </label>
                            <label class="flex items-center gap-3 group cursor-pointer">
                                <input type="checkbox" name="is_promo" value="1" onchange="submitFilter()" {{ request('is_promo') ? 'checked' : '' }} class="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500">
                                <span class="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Diskon & Promo</span>
                            </label>
                            <label class="flex items-center gap-3 group cursor-pointer">
                                <input type="checkbox" name="is_new" value="1" onchange="submitFilter()" {{ request('is_new') ? 'checked' : '' }} class="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500">
                                <span class="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Baru Datang</span>
                            </label>
                            <label class="flex items-center gap-3 group cursor-pointer">
                                <input type="checkbox" name="limited_stock" value="1" onchange="submitFilter()" {{ request('limited_stock') ? 'checked' : '' }} class="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500">
                                <span class="text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Stok Terbatas</span>
                            </label>
                        </div>
                    </div>

                    <hr class="border-gray-100 dark:border-gray-700 mb-6">

                    <!-- Info Pengiriman -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 flex items-start gap-3 mb-6">
                        <div class="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2 rounded-lg shrink-0">
                            <i data-lucide="truck" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-blue-900 dark:text-blue-300 text-sm">Metode Pengiriman</h4>
                            <p class="text-xs text-blue-800 dark:text-blue-200 mt-1">Pesan hari ini sebelum jam 15:00, dikirim besok pagi (06:00 - 09:00).</p>
                        </div>
                    </div>

                    <a href="{{ route('home') }}#produk" class="w-full flex justify-center py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-colors">Hapus Semua Filter</a>

                </form>
            </aside>

            <!-- Product Grid -->
            <div class="flex-1">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Produk Pilihan</h2>
                        <p class="text-gray-600 dark:text-gray-400">Sayuran paling banyak dicari minggu ini</p>
                    </div>
                </div>

                <!-- SKELETON LOADING VIEW (Shows initially for 1.5s) -->
                <div x-show="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <template x-for="i in 6">
                        <div class="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
                            <div class="rounded-2xl bg-gray-200 dark:bg-gray-700 aspect-square mb-4"></div>
                            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                            <div class="flex justify-between items-center mt-4 pt-2">
                                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- ACTUAL PRODUCT VIEW -->
                <div x-show="!loading" style="display: none;" x-transition.opacity.duration.500ms class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    @forelse($products as $product)
                    <div class="{{ str_contains(strtolower($product->category->name ?? ''), 'paket') ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/50 hover:border-orange-300 dark:hover:border-orange-700' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800' }} rounded-3xl p-4 shadow-sm border group hover:shadow-xl transition-all duration-300">
                        <div class="relative rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-900 aspect-square">
                            @if($product->is_new)
                            <span class="absolute top-3 left-3 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Baru Datang</span>
                            @elseif($product->is_fresh)
                            <span class="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Dipanen Hari Ini</span>
                            @elseif($product->limited_stock)
                            <span class="absolute top-3 left-3 z-10 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm text-gray-900">Stok Terbatas</span>
                            @elseif($product->discount_percentage)
                            <span class="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Diskon {{ $product->discount_percentage }}%</span>
                            @elseif(str_contains(strtolower($product->category->name ?? ''), 'paket'))
                            <span class="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">Paket Masak</span>
                            @endif
                            
                            <img src="{{ $product->first_image }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            
                            @if($product->cooking_suggestions)
                            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p class="text-white text-xs font-medium"><i data-lucide="chef-hat" class="w-3 h-3 inline mr-1"></i>Cocok untuk: {{ $product->cooking_suggestions }}</p>
                            </div>
                            @endif
                        </div>
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900 dark:text-white {{ str_contains(strtolower($product->category->name ?? ''), 'paket') ? 'group-hover:text-orange-600' : 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' }} transition-colors">{{ $product->name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ $product->weight_label }}</p>
                            </div>
                            @if($product->rating)
                            <div class="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                                <i data-lucide="star" class="w-3 h-3 fill-yellow-400 text-yellow-400"></i>
                                <span class="text-xs font-bold text-yellow-700 dark:text-yellow-400">{{ $product->rating }}</span>
                            </div>
                            @endif
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            @if($product->discount_percentage)
                            <div>
                                <span class="text-xs text-gray-400 dark:text-gray-500 line-through block">Rp {{ number_format($product->price, 0, ',', '.') }}</span>
                                <span class="text-xl font-bold text-gray-900 dark:text-white">Rp {{ number_format($product->price - ($product->price * $product->discount_percentage / 100), 0, ',', '.') }}</span>
                            </div>
                            @else
                            <span class="text-xl font-bold text-gray-900 dark:text-white">Rp {{ number_format($product->price, 0, ',', '.') }}</span>
                            @endif
                            
                            <button @click="addToCart({
                                id: {{ $product->id }}, 
                                name: '{{ addslashes($product->name) }}', 
                                price: {{ $product->discount_percentage ? ($product->price - ($product->price * $product->discount_percentage / 100)) : $product->price }}, 
                                label: '{{ addslashes($product->weight_label) }}', 
                                img: '{{ $product->first_image }}'
                            })" class="w-10 h-10 rounded-full {{ str_contains(strtolower($product->category->name ?? ''), 'paket') ? 'bg-orange-200 dark:bg-orange-800/50 text-orange-700 dark:text-orange-400 hover:bg-orange-500 hover:text-white' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white' }} flex items-center justify-center transition-colors">
                                <i data-lucide="plus" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    @empty
                    <div class="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 text-gray-400 mx-auto rounded-full flex items-center justify-center mb-4">
                            <i data-lucide="search-x" class="w-10 h-10"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Produk Tidak Ditemukan</h3>
                        <p class="text-gray-500 dark:text-gray-400 mb-6">Coba sesuaikan filter pencarian Anda atau hapus filter untuk melihat semua produk.</p>
                        <a href="{{ route('home') }}" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">Hapus Semua Filter</a>
                    </div>
                    @endforelse

                </div>
                
            </div>
        </div>
    </div>
</section>

<script>
    function submitFilter() {
        const form = document.getElementById('filterForm');
        const url = new URL(form.action);
        const formData = new FormData(form);
        for (const [key, value] of formData) {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        }
        url.hash = 'produk';
        window.location.href = url.toString();
    }
</script>

@endsection
