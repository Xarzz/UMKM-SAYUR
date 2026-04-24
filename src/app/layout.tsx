import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import MainLayout from "../components/MainLayout";

export const metadata: Metadata = {
  title: "Warung Sayur Segar Malang - Segar dari Petani",
  description: "Sayuran segar bebas pestisida langsung dari petani lokal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && supportDarkMode)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
