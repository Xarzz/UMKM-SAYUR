@extends('layouts.main')

@section('content')
<div class="bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300" x-data="checkoutData()">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="/" class="hover:text-emerald-600 transition-colors">Beranda</a>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
            <span class="text-gray-900 dark:text-white font-medium">Checkout Pembayaran</span>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Selesaikan Pesanan Anda</h1>

        <div x-show="cartItems.length === 0" style="display: none;" class="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm">
            <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-lucide="shopping-bag" class="w-10 h-10 text-gray-400"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Keranjang Anda Kosong</h2>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Anda belum menambahkan sayur apapun ke keranjang.</p>
            <a href="/" class="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                <i data-lucide="arrow-left" class="w-5 h-5"></i> Kembali Belanja
            </a>
        </div>

        <div x-show="cartItems.length > 0" class="flex flex-col lg:flex-row gap-8">
            
            <!-- Left Column: Form -->
            <div class="flex-1">
                <form id="checkout-form" method="POST" action="{{ route('checkout.process') }}" class="space-y-6">
                    @csrf
                    <!-- Hidden field to pass Alpine cart array to Laravel -->
                    <input type="hidden" name="cart_data" :value="JSON.stringify(cartItems)">
                    
                    <!-- 1. Alamat Pengiriman -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <i data-lucide="map-pin" class="w-6 h-6 text-emerald-500"></i> Alamat Pengiriman
                        </h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Penerima</label>
                                <input type="text" name="customer_name" required class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor WhatsApp</label>
                                <input type="tel" name="customer_phone" required class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500" placeholder="0812...">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Lengkap (Jl, RT/RW, Patokan)</label>
                            <textarea name="customer_address" required rows="3" class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                        </div>
                    </div>

                    <!-- 2. Opsi Pengiriman -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <i data-lucide="truck" class="w-6 h-6 text-emerald-500"></i> Pengiriman
                        </h2>
                        <div class="space-y-3">
                            <label class="relative flex cursor-pointer rounded-xl border bg-white dark:bg-gray-700 p-4 shadow-sm focus:outline-none transition-colors" :class="courier === 'regular' ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-600'">
                                <input type="radio" name="courier" value="regular" x-model="courier" class="sr-only">
                                <div class="flex w-full items-center justify-between">
                                    <div class="flex items-center">
                                        <div class="text-sm">
                                            <p class="font-bold text-gray-900 dark:text-white">Reguler (Dikirim Besok Pagi)</p>
                                            <p class="text-gray-500 dark:text-gray-400 mt-1">Estimasi tiba: 06:00 - 09:00 WIB</p>
                                        </div>
                                    </div>
                                    <div class="font-bold text-gray-900 dark:text-white">Rp 10.000</div>
                                </div>
                            </label>
                            
                            <label class="relative flex cursor-pointer rounded-xl border bg-white dark:bg-gray-700 p-4 shadow-sm focus:outline-none transition-colors" :class="courier === 'express' ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-600'">
                                <input type="radio" name="courier" value="express" x-model="courier" class="sr-only">
                                <div class="flex w-full items-center justify-between">
                                    <div class="flex items-center">
                                        <div class="text-sm">
                                            <p class="font-bold text-gray-900 dark:text-white">Express (Hari ini juga)</p>
                                            <p class="text-gray-500 dark:text-gray-400 mt-1">Estimasi tiba: Dalam 2 Jam</p>
                                        </div>
                                    </div>
                                    <div class="font-bold text-gray-900 dark:text-white">Rp 15.000</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- 3. Pembayaran -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <i data-lucide="wallet" class="w-6 h-6 text-emerald-500"></i> Metode Pembayaran
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label class="relative flex cursor-pointer rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 shadow-sm hover:border-emerald-500 transition-colors">
                                <input type="radio" name="payment_method" value="bank_transfer" class="mr-3 mt-1 text-emerald-600 focus:ring-emerald-500" checked>
                                <div>
                                    <span class="block text-sm font-bold text-gray-900 dark:text-white">Transfer Bank (BCA/Mandiri)</span>
                                    <span class="block text-xs text-gray-500 dark:text-gray-400 mt-1">Verifikasi manual</span>
                                </div>
                            </label>
                            <label class="relative flex cursor-pointer rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 shadow-sm hover:border-emerald-500 transition-colors">
                                <input type="radio" name="payment_method" value="cod" class="mr-3 mt-1 text-emerald-600 focus:ring-emerald-500">
                                <div>
                                    <span class="block text-sm font-bold text-gray-900 dark:text-white">Bayar di Tempat (COD)</span>
                                    <span class="block text-xs text-gray-500 dark:text-gray-400 mt-1">Bayar saat sayur sampai</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Right Column: Ringkasan Belanja -->
            <div class="w-full lg:w-1/3 shrink-0">
                <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Ringkasan Belanja</h2>
                    
                    <div class="flow-root mb-6">
                        <ul role="list" class="-my-4 divide-y divide-gray-100 dark:divide-gray-700">
                            <template x-for="item in cartItems" :key="item.id">
                                <li class="flex items-center py-4">
                                    <img :src="item.img" class="h-16 w-16 rounded-xl object-cover border border-gray-100 dark:border-gray-700">
                                    <div class="ml-4 flex-1">
                                        <h3 class="text-sm font-medium text-gray-900 dark:text-white" x-text="item.name"></h3>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" x-text="item.qty + ' x ' + formatRupiah(item.price)"></p>
                                    </div>
                                    <p class="text-sm font-bold text-gray-900 dark:text-white" x-text="formatRupiah(item.price * item.qty)"></p>
                                </li>
                            </template>
                        </ul>
                    </div>
                    
                    <div class="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                        <div class="flex items-center justify-between text-sm">
                            <p class="text-gray-600 dark:text-gray-400">Subtotal Produk</p>
                            <p class="font-medium text-gray-900 dark:text-white" x-text="formatRupiah(subtotal)"></p>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <p class="text-gray-600 dark:text-gray-400">Ongkos Kirim</p>
                            <p class="font-medium text-gray-900 dark:text-white" x-text="formatRupiah(shipping)"></p>
                        </div>
                        <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                            <p class="text-lg font-bold text-gray-900 dark:text-white">Total Tagihan</p>
                            <p class="text-xl font-bold text-emerald-600 dark:text-emerald-400" x-text="formatRupiah(total)"></p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <button type="button" onclick="document.getElementById('checkout-form').submit()" class="w-full flex justify-center items-center gap-2 rounded-xl border border-transparent bg-emerald-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all">
                            <i data-lucide="check-circle" class="w-5 h-5"></i> Bayar Sekarang
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script>
    // Component logic local to checkout page
    function checkoutData() {
        return {
            cartItems: JSON.parse(localStorage.getItem('sayur_cart') || '[]'),
            courier: 'regular',
            get subtotal() {
                return this.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
            },
            get shipping() {
                return this.courier === 'express' ? 15000 : 10000;
            },
            get total() {
                return this.subtotal + this.shipping;
            },
            formatRupiah(number) {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
            }
        }
    }
</script>
@endsection
