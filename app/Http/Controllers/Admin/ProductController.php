<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        return view('admin.products.index', compact('products'));
    }

    public function create()
    {
        $categories = Category::all();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'weight_label' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Upload image
        $imagePath = $request->file('image')->store('products', 'public');
        $imageUrl = asset('storage/' . $imagePath);

        Product::create([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'price' => $request->price,
            'weight_label' => $request->weight_label,
            'category_id' => $request->category_id,
            'images' => [$imageUrl],
            'description' => $request->description ?? '',
            'cooking_suggestions' => $request->cooking_suggestions ?? '',
            'is_new' => $request->has('is_new'),
            'is_fresh' => $request->has('is_fresh'),
            'limited_stock' => $request->has('limited_stock'),
            'discount_percentage' => $request->discount_percentage,
        ]);

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'weight_label' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $imageUrl = asset('storage/' . $imagePath);
            $product->images = [$imageUrl];
        }

        $product->name = $request->name;
        $product->slug = \Illuminate\Support\Str::slug($request->name);
        $product->price = $request->price;
        $product->weight_label = $request->weight_label;
        $product->category_id = $request->category_id;
        $product->description = $request->description ?? '';
        $product->cooking_suggestions = $request->cooking_suggestions ?? '';
        $product->is_new = $request->has('is_new');
        $product->is_fresh = $request->has('is_fresh');
        $product->limited_stock = $request->has('limited_stock');
        $product->discount_percentage = $request->discount_percentage;
        $product->save();

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus!');
    }
}
