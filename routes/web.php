<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CheckoutController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'process'])->name('checkout.process');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/riwayat-pesanan', [CheckoutController::class, 'history'])->name('checkout.history');
});

Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->middleware(['auth', 'admin'])->name('dashboard');
Route::resource('/admin/products', \App\Http\Controllers\Admin\ProductController::class)->middleware(['auth', 'admin'])->names('admin.products');
Route::resource('/admin/categories', \App\Http\Controllers\Admin\CategoryController::class)->middleware(['auth', 'admin'])->names('admin.categories');
Route::resource('/admin/orders', \App\Http\Controllers\Admin\OrderController::class)->only(['index', 'show', 'update'])->middleware(['auth', 'admin'])->names('admin.orders');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
