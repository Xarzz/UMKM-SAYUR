<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Kategori
        $kategoriSayur = Category::create(['name' => 'Sayuran Hijau', 'slug' => Str::slug('Sayuran Hijau'), 'icon' => 'leaf']);
        $kategoriBumbu = Category::create(['name' => 'Bumbu Dapur', 'slug' => Str::slug('Bumbu Dapur'), 'icon' => 'flame']);
        $kategoriUmbi = Category::create(['name' => 'Umbi & Akar', 'slug' => Str::slug('Umbi & Akar'), 'icon' => 'carrot']);
        $kategoriBuah = Category::create(['name' => 'Buah Segar', 'slug' => Str::slug('Buah Segar'), 'icon' => 'apple']);
        $kategoriPaket = Category::create(['name' => 'Paket Masak', 'slug' => Str::slug('Paket Masak'), 'icon' => 'package']);

        // 2. Buat Produk Sayur
        Product::create([
            'category_id' => $kategoriSayur->id,
            'name' => 'Bayam Hijau Segar',
            'slug' => Str::slug('Bayam Hijau Segar'),
            'description' => 'Bayam hijau segar langsung dari kebun. Kaya akan zat besi.',
            'price' => 4500,
            'weight_label' => '250 gram / ikat',
            'is_featured' => true,
            'is_fresh' => true,
            'images' => ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1780&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriSayur->id,
            'name' => 'Selada Bokor',
            'slug' => Str::slug('Selada Bokor'),
            'description' => 'Selada renyah cocok untuk salad atau lalapan.',
            'price' => 7000,
            'weight_label' => '200 gram',
            'discount_percentage' => 10,
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=1974&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriUmbi->id,
            'name' => 'Wortel Berastagi',
            'slug' => Str::slug('Wortel Berastagi'),
            'description' => 'Wortel manis dan renyah pilihan terbaik dari Berastagi.',
            'price' => 10800,
            'weight_label' => '500 gram / pack',
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1445282768818-728615cd2cbc?q=80&w=1770&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriBumbu->id,
            'name' => 'Tomat Merah',
            'slug' => Str::slug('Tomat Merah'),
            'description' => 'Tomat merah merona, cocok untuk sambal atau jus.',
            'price' => 12000,
            'weight_label' => '500 gram',
            'is_new' => true,
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1780&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriBumbu->id,
            'name' => 'Bawang Merah',
            'slug' => Str::slug('Bawang Merah'),
            'description' => 'Bawang merah lokal, harum dan tidak cepat busuk.',
            'price' => 15000,
            'weight_label' => '250 gram',
            'limited_stock' => true,
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1887&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriBumbu->id,
            'name' => 'Cabai Rawit Merah',
            'slug' => Str::slug('Cabai Rawit Merah'),
            'description' => 'Cabai rawit setan super pedas, dipetik hari ini.',
            'price' => 20000,
            'weight_label' => '250 gram',
            'is_fresh' => true,
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1588015344840-7f41a87e0766?q=80&w=1888&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriPaket->id,
            'name' => 'Paket Sayur Asem',
            'slug' => Str::slug('Paket Sayur Asem'),
            'description' => 'Paket lengkap sayur asem tinggal cemplung, sudah ada bumbu raciknya.',
            'price' => 12000,
            'weight_label' => 'Untuk 3-4 porsi',
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1770&auto=format&fit=crop'],
        ]);

        Product::create([
            'category_id' => $kategoriSayur->id,
            'name' => 'Kangkung Cabut',
            'slug' => Str::slug('Kangkung Cabut'),
            'description' => 'Kangkung muda pilihan, batang renyah dan daun segar.',
            'price' => 3500,
            'weight_label' => '250 gram / ikat',
            'is_featured' => true,
            'images' => ['https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=1770&auto=format&fit=crop'],
        ]);
    }
}
