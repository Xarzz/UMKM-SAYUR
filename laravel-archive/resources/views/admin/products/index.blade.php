<x-app-layout>
    <x-slot name="header">
        Manajemen Katalog Produk
    </x-slot>

    @if(session('success'))
    <div class="mb-4 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ session('success') }}</span>
    </div>
    @endif

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Daftar Produk</h2>
            <a href="{{ route('admin.products.create') }}" class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i> Tambah Produk Baru
            </a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold">
                    <tr>
                        <th class="px-6 py-4">Foto</th>
                        <th class="px-6 py-4">Nama Produk</th>
                        <th class="px-6 py-4">Kategori</th>
                        <th class="px-6 py-4">Harga</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @forelse($products as $product)
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4">
                            <img src="{{ $product->first_image }}" class="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600">
                        </td>
                        <td class="px-6 py-4">
                            <p class="font-bold text-gray-900 dark:text-white">{{ $product->name }}</p>
                            <p class="text-xs text-gray-500">{{ $product->weight_label }}</p>
                        </td>
                        <td class="px-6 py-4">{{ $product->category->name ?? '-' }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Rp {{ number_format($product->price, 0, ',', '.') }}</td>
                        <td class="px-6 py-4">
                            @if($product->is_new)
                            <span class="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">Baru</span>
                            @elseif($product->is_fresh)
                            <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">Segar</span>
                            @else
                            <span class="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">Biasa</span>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-2">
                                <a href="{{ route('admin.products.edit', $product->id) }}" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><i data-lucide="edit" class="w-4 h-4"></i></a>
                                <form action="{{ route('admin.products.destroy', $product->id) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus produk ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="px-6 py-4 text-center">Belum ada produk.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
