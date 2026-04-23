<x-app-layout>
    <x-slot name="header">
        Ringkasan Admin
    </x-slot>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Card 1 -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                <i data-lucide="shopping-bag" class="w-7 h-7"></i>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Pesanan</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ number_format($totalOrders, 0, ',', '.') }}</p>
            </div>
        </div>
        <!-- Card 2 -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <i data-lucide="box" class="w-7 h-7"></i>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Produk</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ number_format($totalProducts, 0, ',', '.') }}</p>
            </div>
        </div>
        <!-- Card 3 -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div class="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center shrink-0">
                <i data-lucide="users" class="w-7 h-7"></i>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Pelanggan</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ number_format($totalCustomers, 0, ',', '.') }}</p>
            </div>
        </div>
        <!-- Card 4 -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div class="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0">
                <i data-lucide="wallet" class="w-7 h-7"></i>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pendapatan</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">Rp {{ number_format($totalRevenue, 0, ',', '.') }}</p>
            </div>
        </div>
    </div>

    <!-- Recent Orders Section -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
            <a href="#" class="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Lihat Semua</a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold">
                    <tr>
                        <th class="px-6 py-4">ID Pesanan</th>
                        <th class="px-6 py-4">Pelanggan</th>
                        <th class="px-6 py-4">Tanggal</th>
                        <th class="px-6 py-4">Total</th>
                        <th class="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @forelse($recentOrders as $order)
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">{{ $order->order_number }}</td>
                        <td class="px-6 py-4">{{ $order->customer_name }}</td>
                        <td class="px-6 py-4">{{ \Carbon\Carbon::parse($order->created_at)->diffForHumans() }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Rp {{ number_format($order->grand_total, 0, ',', '.') }}</td>
                        <td class="px-6 py-4">
                            @if($order->status == 'pending')
                            <span class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-800/50">Pending</span>
                            @else
                            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">{{ ucfirst($order->status) }}</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Belum ada pesanan masuk.</td>
                    </tr>
                    @endforelse
            </table>
        </div>
    </div>
</x-app-layout>
