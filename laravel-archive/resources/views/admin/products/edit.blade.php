<x-app-layout>
    <x-slot name="header">
        Edit Produk
    </x-slot>

    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        
        @if ($errors->any())
        <div class="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            <ul class="list-disc list-inside text-sm">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Nama -->
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Produk</label>
                    <input type="text" name="name" value="{{ old('name', $product->name) }}" required class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                </div>

                <!-- Kategori -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                    <select name="category_id" required class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                        <option value="">-- Pilih Kategori --</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Harga -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Harga (Rp)</label>
                    <input type="number" name="price" value="{{ old('price', $product->price) }}" required class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                </div>

                <!-- Label Berat -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Label Berat / Satuan</label>
                    <input type="text" name="weight_label" value="{{ old('weight_label', $product->weight_label) }}" required class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                </div>

                <!-- Gambar -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ganti Foto (Kosongkan jika tidak diganti)</label>
                    <input type="file" name="image" accept="image/*" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                </div>

                <!-- Rekomendasi Masakan -->
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cocok Untuk (Opsional)</label>
                    <input type="text" name="cooking_suggestions" value="{{ old('cooking_suggestions', $product->cooking_suggestions) }}" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                </div>

                <!-- Diskon -->
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diskon (%) - Opsional</label>
                    <input type="number" name="discount_percentage" value="{{ old('discount_percentage', $product->discount_percentage) }}" min="0" max="100" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                </div>

                <!-- Label Status -->
                <div class="col-span-1 md:col-span-2 flex flex-wrap gap-6 mt-2">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_new" value="1" {{ old('is_new', $product->is_new) ? 'checked' : '' }} class="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Label "Baru Datang"</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_fresh" value="1" {{ old('is_fresh', $product->is_fresh) ? 'checked' : '' }} class="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Label "Dipanen Hari Ini"</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="limited_stock" value="1" {{ old('limited_stock', $product->limited_stock) ? 'checked' : '' }} class="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Label "Stok Terbatas"</span>
                    </label>
                </div>
            </div>

            <div class="mt-8 flex items-center justify-end gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <a href="{{ route('admin.products.index') }}" class="px-6 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Batal</a>
                <button type="submit" class="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-colors flex items-center gap-2">
                    <i data-lucide="save" class="w-5 h-5"></i> Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</x-app-layout>
