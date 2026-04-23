<x-app-layout>
    <x-slot name="header">
        Manajemen Kategori
    </x-slot>

    @if(session('success'))
    <div class="mb-4 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ session('success') }}</span>
    </div>
    @endif
    @if(session('error'))
    <div class="mb-4 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ session('error') }}</span>
    </div>
    @endif

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Daftar Kategori</h2>
            <a href="{{ route('admin.categories.create') }}" class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i> Tambah Kategori
            </a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold">
                    <tr>
                        <th class="px-6 py-4">Ikon</th>
                        <th class="px-6 py-4">Nama Kategori</th>
                        <th class="px-6 py-4">Slug</th>
                        <th class="px-6 py-4">Jumlah Produk</th>
                        <th class="px-6 py-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @forelse($categories as $category)
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center rounded-xl">
                                <i data-lucide="{{ $category->icon }}" class="w-5 h-5"></i>
                            </div>
                        </td>
                        <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">{{ $category->name }}</td>
                        <td class="px-6 py-4">{{ $category->slug }}</td>
                        <td class="px-6 py-4">
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{ $category->products_count }} Produk</span>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.categories.edit', $category->id) }}" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><i data-lucide="edit" class="w-4 h-4"></i></a>
                                <form action="{{ route('admin.categories.destroy', $category->id) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus kategori ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center">Belum ada kategori.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
