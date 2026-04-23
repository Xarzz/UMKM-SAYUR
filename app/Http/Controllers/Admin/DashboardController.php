<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = DB::table('orders')->count();
        $totalRevenue = DB::table('orders')->where('status', '!=', 'cancelled')->sum('grand_total');
        $totalProducts = Product::count();
        $totalCustomers = User::where('is_admin', false)->count();

        $recentOrders = DB::table('orders')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        return view('dashboard', compact(
            'totalOrders', 
            'totalRevenue', 
            'totalProducts', 
            'totalCustomers', 
            'recentOrders'
        ));
    }
}
