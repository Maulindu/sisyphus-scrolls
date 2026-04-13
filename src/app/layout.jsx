// app/layout.jsx
import React from "react";
import { IM_Fell_English } from "next/font/google";
import './page.css';

const imFell = IM_Fell_English({ 
  subsets: ["latin"], 
  weight: ['400'],
  style: ['normal', 'italic']
});

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
      <body className={`${imFell.className} site-body`}>
        {/* Nav */}
        <header className="site-header fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="site-title">SisyphusScrolls</h1>
            <nav className="flex gap-6">
              <a href="/" className="nav-link">Timeline</a>
              <a href="/tension-map" className="nav-link">Tension Map</a>
            </nav>
          </div>
        </header>

        {/* Main page content */}
        <main className="site-main pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="container mx-auto py-5 text-center">
            © {new Date().getFullYear()} SisyphusScrolls — One must imagine Sisyphus happy.
          </div>
        </footer>
      </body>
    </html>
  );
}