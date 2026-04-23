<x-app-layout>
    <x-slot name="header">Pesanan Masuk</x-slot>
    @if(session('success'))
    <div class="mb-4 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded relative">{{ session('success') }}</div>
    @endif
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold">
                    <tr>
                        <th class="px-6 py-4">Nomor Pesanan</th>
                        <th class="px-6 py-4">Pelanggan</th>
                        <th class="px-6 py-4">Total Harga</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4">Tanggal</th>
                        <th class="px-6 py-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @forelse($orders as $order)
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">{{ $order->order_number }}</td>
                        <td class="px-6 py-4">{{ $order->customer_name }}</td>
                        <td class="px-6 py-4 font-medium text-emerald-600">Rp {{ number_format($order->grand_total, 0, ',', '.') }}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs font-bold rounded-full {{ $order->status == 'pending' ? 'bg-yellow-100 text-yellow-700' : ($order->status == 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700') }}">
                                {{ strtoupper($order->status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4">{{ \Carbon\Carbon::parse($order->created_at)->format('d M Y, H:i') }}</td>
                        <td class="px-6 py-4 text-right">
                            <a href="{{ route('admin.orders.show', $order->id) }}" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold">Detail</a>
                        </td>
                    </tr>
                    @empty
                    <tr><td colspan="6" class="px-6 py-4 text-center">Belum ada pesanan</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
