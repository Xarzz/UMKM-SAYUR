<x-app-layout>
    <x-slot name="header">Edit Kategori</x-slot>
    <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <form action="{{ route('admin.categories.update', $category->id) }}" method="POST">
            @csrf @method('PUT')
            <div class="space-y-4 mb-6">
                <div>
                    <label class="block text-sm font-medium mb-1">Nama Kategori</label>
                    <input type="text" name="name" value="{{ $category->name }}" required class="w-full px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Ikon (Lucide)</label>
                    <input type="text" name="icon" value="{{ $category->icon }}" class="w-full px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Deskripsi</label>
                    <textarea name="description" rows="3" class="w-full px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600">{{ $category->description }}</textarea>
                </div>
            </div>
            <div class="flex justify-end gap-3 border-t pt-4 border-gray-100 dark:border-gray-700">
                <a href="{{ route('admin.categories.index') }}" class="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</a>
                <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</x-app-layout>
