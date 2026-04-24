"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import Toast from "./Toast";
import { CartProvider } from "@/context/CartContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // List of paths where we DON'T want Navbar/Footer/WhatsApp
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAdminPage = pathname.startsWith("/admin");
  const hideChrome = isAuthPage || isAdminPage;

  return (
    <CartProvider>
      {!hideChrome && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}
      <main className={`${!hideChrome ? "pt-16" : ""} min-h-screen`}>
        {children}
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <WhatsAppButton />}
      <Toast />
    </CartProvider>
  );
}
