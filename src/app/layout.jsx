// app/layout.jsx
import React from "react";
import { Inter } from "next/font/google";
import './page.css'
import Image from "next/image";


// Load a Google font (Inter is just an example)
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SisyphusScrolls",
  description: "An absurdist scroll through the history of philosophy.",
  icons: {
    icon: '/OuroborosSisyphus.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} site-body dark:text-gray-100`}>
        {/*Nav */}
        <header className="site-header fixed top-0 left-0 right-0 shadow-lg z-50">
          <h1 className="site-title text-3xl font-bold tracking-tight text-center py-4">
            SisyphusScrolls
          </h1>
        </header>

        {/* Main page content */}
        <main className="site-main container mx-auto px-4 pt-24 pb-12 flex-grow bg-transparent">
          {children}
        </main>

        {/* Footer */}
        <footer className="site-footer border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
          <div className="container mx-auto py-6 text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} SisyphusScrolls — A philosophical journey
          </div>
        </footer>
      </body>
    </html>
  );
}
