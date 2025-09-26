export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="p-4 bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}

import './global.css'
