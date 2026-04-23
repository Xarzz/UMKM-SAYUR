@extends('layouts.main')

@section('content')
<div class="bg-gray-50 dark:bg-gray-900 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div class="relative z-10">
            <div class="text-center">
                <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <i data-lucide="log-in" class="w-8 h-8"></i>
                </div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Selamat Datang!</h2>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Masuk ke akun Anda untuk mulai berbelanja.</p>
            </div>

            <form class="mt-8 space-y-6" method="POST" action="{{ route('login') }}">
                @csrf
                <div class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input id="email" name="email" type="email" autocomplete="email" required class="mt-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-colors" placeholder="budi@example.com">
                        @error('email')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="mt-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-colors" placeholder="••••••••">
                        @error('password')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember_me" name="remember" type="checkbox" class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">
                        <label for="remember_me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Ingat Saya</label>
                    </div>

                    @if (Route::has('password.request'))
                    <div class="text-sm">
                        <a href="{{ route('password.request') }}" class="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">Lupa password?</a>
                    </div>
                    @endif
                </div>

                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30 transition-all">
                        Masuk Sekarang
                    </button>
                </div>
                
                <div class="text-center text-sm text-gray-500 dark:text-gray-400">
                    Belum punya akun? 
                    <a href="{{ route('register') }}" class="font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">Daftar di sini</a>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
