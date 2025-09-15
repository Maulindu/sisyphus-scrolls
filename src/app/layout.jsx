// app/layout.jsx
import React from "react";
import { Inter } from "next/font/google";

// Load a Google font (Inter is just an example)
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SisyphusScrolls",
  description: "An absurdist scroll through the history of philosophy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/*Nav */}
        <header className="w-full p-4 shadow-md bg-white">
          <h1 className="text-2xl font-bold text-center">SisyphusScrolls</h1>
        </header>

        {/* Main page content */}
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full mt-12 p-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SisyphusScrolls — A philosophical journey
        </footer>
      </body>
    </html>
  );
}
