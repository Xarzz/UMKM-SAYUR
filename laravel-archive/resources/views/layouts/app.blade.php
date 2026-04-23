<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Sayur UMKM') }} - Admin</title>
    <!-- Fonts & Icons -->
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800&display=swap" rel="stylesheet" />
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex overflow-hidden h-screen" x-data="{ sidebarOpen: false }">

    <!-- Sidebar Overlay -->
    <div x-show="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-20 bg-black/50 lg:hidden"></div>

    <!-- Sidebar -->
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <a href="/" class="flex items-center gap-2">
                <div class="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                    <i data-lucide="leaf" class="w-5 h-5"></i>
                </div>
                <span class="font-bold text-xl text-emerald-900 dark:text-white">Sayur <span class="text-emerald-500">UMKM</span></span>
            </a>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <a href="{{ route('dashboard') }}" class="flex items-center px-3 py-2.5 rounded-lg {{ request()->routeIs('dashboard') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' }} font-medium transition-colors">
                <i data-lucide="layout-dashboard" class="w-5 h-5 mr-3"></i> Dashboard
            </a>
            <a href="{{ route('admin.products.index') }}" class="flex items-center px-3 py-2.5 rounded-lg {{ request()->routeIs('admin.products.*') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' }} font-medium transition-colors">
                <i data-lucide="box" class="w-5 h-5 mr-3"></i> Katalog Produk
            </a>
            <a href="{{ route('admin.categories.index') }}" class="flex items-center px-3 py-2.5 rounded-lg {{ request()->routeIs('admin.categories.*') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' }} font-medium transition-colors">
                <i data-lucide="tags" class="w-5 h-5 mr-3"></i> Kategori
            </a>
            <a href="{{ route('admin.orders.index') }}" class="flex items-center px-3 py-2.5 rounded-lg {{ request()->routeIs('admin.orders.*') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' }} font-medium transition-colors">
                <i data-lucide="shopping-cart" class="w-5 h-5 mr-3"></i> Pesanan Masuk
            </a>
        </nav>

        <!-- User bottom -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="w-full flex items-center px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors">
                    <i data-lucide="log-out" class="w-5 h-5 mr-3"></i> Keluar
                </button>
            </form>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
        <!-- Topbar -->
        <header class="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
            <div class="flex items-center gap-4">
                <button @click="sidebarOpen = true" class="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
                @isset($header)
                    <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ $header }}</h1>
                @endisset
            </div>
            
            <div class="flex items-center gap-4">
                <button id="theme-toggle-admin" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">
                    <i data-lucide="sun" id="theme-toggle-light-icon-admin" class="hidden w-5 h-5"></i>
                    <i data-lucide="moon" id="theme-toggle-dark-icon-admin" class="hidden w-5 h-5"></i>
                </button>
                <div class="flex items-center gap-2">
                    <img src="https://ui-avatars.com/api/?name={{ urlencode(Auth::user()->name) }}&background=10b981&color=fff" class="w-8 h-8 rounded-full">
                    <span class="hidden sm:block text-sm font-medium">{{ Auth::user()->name }}</span>
                </div>
            </div>
        </header>

        <!-- Main Scrollable Area -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
            {{ $slot }}
        </main>
    </div>

    <script>
        lucide.createIcons();
        
        // Dark mode toggle logic
        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon-admin');
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon-admin');
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }
        var themeToggleBtn = document.getElementById('theme-toggle-admin');
        themeToggleBtn.addEventListener('click', function() {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    </script>
</body>
</html>
