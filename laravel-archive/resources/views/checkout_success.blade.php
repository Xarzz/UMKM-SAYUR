@extends('layouts.main')

@section('content')
<div class="bg-gray-50 dark:bg-gray-900 min-h-[80vh] flex items-center justify-center transition-colors duration-300">
    <div class="max-w-xl w-full px-4 sm:px-6">
        <div class="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 shadow-xl border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden">
            
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div class="relative z-10">
                <div class="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                    <i data-lucide="badge-check" class="w-12 h-12"></i>
                </div>
                
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pesanan Berhasil Dibuat!</h1>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Terima kasih telah berbelanja di Sayur UMKM. Pesanan Anda akan segera kami proses.</p>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-600 text-left">
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Nomor Pesanan</p>
                    <p class="text-xl font-mono font-bold text-gray-900 dark:text-white">{{ session('order_number') }}</p>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://wa.me/6282232415842?text=Halo%20Admin,%20saya%20sudah%20memesan%20sayur%20dengan%20nomor%20pesanan%20*{{ session('order_number') }}*.%20Mohon%20info%20total%20pembayaran%20dan%20nomor%20rekening." target="_blank" class="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-colors">
                        <i data-lucide="message-circle" class="w-6 h-6"></i> Lanjutkan Pembayaran via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Clear cart using JS since order is complete -->
<script>
    localStorage.removeItem('sayur_cart');
    // We can also trigger alpine re-eval by dispatching event if needed, but since we redirect, the main layout will reload cartItems as empty.
</script>
@endsection
