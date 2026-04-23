@extends('layouts.main')

@section('content')
<div class="bg-gray-50 dark:bg-gray-900 py-12 min-h-[80vh] transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="/" class="hover:text-emerald-600 transition-colors">Beranda</a>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
            <span class="text-gray-900 dark:text-white font-medium">Riwayat Belanja</span>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Riwayat Belanja Anda</h1>

        @if($orders->isEmpty())
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm">
                <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="receipt" class="w-10 h-10 text-gray-400"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Transaksi</h2>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Anda belum pernah melakukan pemesanan sayur. Yuk mulai belanja!</p>
                <a href="/" class="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i> Mulai Belanja
                </a>
            </div>
        @else
            <div class="space-y-6">
                @foreach($orders as $order)
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    
                    <div class="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <i data-lucide="shopping-bag" class="w-5 h-5 text-emerald-500"></i>
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Belanja • {{ \Carbon\Carbon::parse($order->created_at)->translatedFormat('d F Y') }}</p>
                                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ $order->order_number }}</p>
                            </div>
                        </div>
                        <div>
                            @if($order->status == 'pending')
                                <span class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-800/50">Menunggu Pembayaran</span>
                            @elseif($order->status == 'processing')
                                <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/50">Sedang Diproses</span>
                            @elseif($order->status == 'completed')
                                <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">Selesai</span>
                            @else
                                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">{{ ucfirst($order->status) }}</span>
                            @endif
                        </div>
                    </div>

                    <div class="p-6">
                        @if(isset($orderItems[$order->id]))
                            @foreach($orderItems[$order->id] as $item)
                            <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-50 dark:border-gray-700/50 last:mb-0 last:pb-0 last:border-0">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                                        <i data-lucide="leaf" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-900 dark:text-white">{{ $item->product_name }}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ $item->quantity }} barang x Rp {{ number_format($item->price, 0, ',', '.') }}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Total Harga</p>
                                    <p class="font-bold text-gray-900 dark:text-white">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</p>
                                </div>
                            </div>
                            @endforeach
                        @endif
                        
                        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Metode: <span class="font-bold uppercase text-gray-900 dark:text-white">{{ str_replace('_', ' ', $order->payment_method) }}</span></p>
                            <div class="text-right">
                                <p class="text-sm text-gray-500 dark:text-gray-400">Total Belanja</p>
                                <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400">Rp {{ number_format($order->grand_total, 0, ',', '.') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        @endif

    </div>
</div>
@endsection
