export const metadata = {
  title: "Kids Games Generator",
  description: "Игры дома и в дороге — без регистрации",
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        <header className="border-b">
          <div className="container py-4 font-medium">Kids Games</div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="border-t">
          <div className="container py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Kids Games — без регистрации и рекламы
          </div>
        </footer>
<script
  dangerouslySetInnerHTML={{
    __html: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
`,
  }}
/>

      </body>
    </html>
  );
}
