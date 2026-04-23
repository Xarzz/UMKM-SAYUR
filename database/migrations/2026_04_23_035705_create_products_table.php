<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description'); // Penjelasan berat dan manfaat
            $table->integer('price');
            $table->string('weight_label'); // e.g., '250 gram', '1 ikat'
            $table->boolean('is_featured')->default(false); // Produk Unggulan/Terlaris
            $table->boolean('is_fresh')->default(false); // Label Kesegaran "Dipanen Hari Ini"
            $table->boolean('is_new')->default(false); // Filter "Baru Datang"
            $table->boolean('limited_stock')->default(false); // Filter "Stok Terbatas"
            $table->text('cooking_suggestions')->nullable(); // Saran Masak
            $table->json('images')->nullable(); // Foto Produk: Minimal 2-3 foto
            $table->decimal('rating', 3, 2)->nullable(); // Testimoni & Rating
            $table->integer('discount_percentage')->nullable(); // Promo/Flash Sale
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
