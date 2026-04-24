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

  return (
    <CartProvider>
      {!isAuthPage && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}
      <main className={`${!isAuthPage ? "pt-16" : ""} min-h-screen`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <WhatsAppButton />}
      <Toast />
    </CartProvider>
  );
}
