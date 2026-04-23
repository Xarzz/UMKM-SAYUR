<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = DB::table('orders')->orderByDesc('created_at')->get();
        return view('admin.orders.index', compact('orders'));
    }

    public function show($id)
    {
        $order = DB::table('orders')->where('id', $id)->first();
        if (!$order) abort(404);

        $items = DB::table('order_items')->where('order_id', $id)->get();
        
        return view('admin.orders.show', compact('order', 'items'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,processing,shipped,completed,cancelled'
        ]);

        DB::table('orders')->where('id', $id)->update([
            'status' => $request->status,
            'updated_at' => now(),
        ]);

        return redirect()->route('admin.orders.index')->with('success', 'Status pesanan berhasil diperbarui!');
    }
}
