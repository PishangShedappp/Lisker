"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}:{children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
