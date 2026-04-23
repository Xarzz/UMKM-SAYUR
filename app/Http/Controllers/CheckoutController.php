<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function index()
    {
        return view('checkout');
    }

    public function process(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_address' => 'required|string',
            'courier' => 'required|string',
            'payment_method' => 'required|string',
            'cart_data' => 'required|json'
        ]);

        $cart = json_decode($request->cart_data, true);
        if (empty($cart)) {
            return back()->with('error', 'Keranjang belanja kosong.');
        }

        $subtotal = collect($cart)->sum(function($item) {
            return $item['price'] * $item['qty'];
        });

        // Hitung ongkir
        $shippingCost = $request->courier == 'express' ? 15000 : 10000;
        $grandTotal = $subtotal + $shippingCost;
        $orderNumber = 'ORD-' . strtoupper(Str::random(8));

        $orderId = DB::transaction(function() use ($request, $cart, $subtotal, $shippingCost, $grandTotal, $orderNumber) {
            $orderId = DB::table('orders')->insertGetId([
                'user_id' => auth()->id(),
                'order_number' => $orderNumber,
                'customer_name' => $request->customer_name,
                'customer_phone' => $request->customer_phone,
                'customer_address' => $request->customer_address,
                'courier' => $request->courier,
                'payment_method' => $request->payment_method,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'grand_total' => $grandTotal,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($cart as $item) {
                DB::table('order_items')->insert([
                    'order_id' => $orderId,
                    'product_id' => $item['id'] ?? null,
                    'product_name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => $item['qty'],
                    'subtotal' => $item['price'] * $item['qty'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            
            return $orderId;
        });

        // Alihkan ke halaman sukses dengan order_number
        return redirect()->route('checkout.success')->with('order_number', $orderNumber);
    }

    public function success()
    {
        if (!session('order_number')) {
            return redirect('/');
        }
        return view('checkout_success');
    }

    public function history()
    {
        $orders = DB::table('orders')
            ->where('user_id', auth()->id())
            ->orderByDesc('created_at')
            ->get();
            
        $orderIds = $orders->pluck('id')->toArray();
        
        $orderItems = DB::table('order_items')
            ->whereIn('order_id', $orderIds)
            ->get()
            ->groupBy('order_id');

        return view('riwayat', compact('orders', 'orderItems'));
    }
}
