<x-app-layout>
    <x-slot name="header">Detail Pesanan: {{ $order->order_number }}</x-slot>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <h3 class="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700">Daftar Produk</h3>
                <div class="space-y-4">
                    @foreach($items as $item)
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-4">
                            <div>
                                <p class="font-bold text-gray-900 dark:text-white">{{ $item->product_name }}</p>
                                <p class="text-sm text-gray-500">{{ $item->quantity }} x Rp {{ number_format($item->price, 0, ',', '.') }}</p>
                            </div>
                        </div>
                        <p class="font-bold">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</p>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <h3 class="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700">Info Pelanggan</h3>
                <p class="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                <p class="font-bold text-gray-900 dark:text-white mb-4">{{ $order->customer_name }}</p>
                
                <p class="text-sm text-gray-500 mb-1">Nomor Telepon / WA</p>
                <p class="font-bold text-gray-900 dark:text-white mb-4">{{ $order->customer_phone }}</p>
                
                <p class="text-sm text-gray-500 mb-1">Alamat Pengiriman</p>
                <p class="text-gray-900 dark:text-white">{{ $order->customer_address }}</p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <h3 class="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-700">Update Status</h3>
                <form action="{{ route('admin.orders.update', $order->id) }}" method="POST">
                    @csrf @method('PUT')
                    <select name="status" class="w-full mb-4 px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600">
                        <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="processing" {{ $order->status == 'processing' ? 'selected' : '' }}>Diproses</option>
                        <option value="shipped" {{ $order->status == 'shipped' ? 'selected' : '' }}>Dikirim</option>
                        <option value="completed" {{ $order->status == 'completed' ? 'selected' : '' }}>Selesai</option>
                        <option value="cancelled" {{ $order->status == 'cancelled' ? 'selected' : '' }}>Dibatalkan</option>
                    </select>
                    <button type="submit" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">Simpan Status</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
