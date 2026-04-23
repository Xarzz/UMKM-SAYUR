<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        
        $query = Product::with('category');

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->filled('is_fresh')) {
            $query->where('is_fresh', true);
        }

        if ($request->filled('is_promo')) {
            $query->where('discount_percentage', '>', 0);
        }

        if ($request->filled('is_new')) {
            $query->where('is_new', true);
        }

        if ($request->filled('limited_stock')) {
            $query->where('limited_stock', true);
        }

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('description', 'like', '%' . $searchTerm . '%');
            });
        }

        $products = $query->latest()->get();
        
        return view('home', compact('categories', 'products'));
    }
}
