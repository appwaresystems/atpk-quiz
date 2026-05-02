import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'ԱՏՊՔ - Ծրագրավորման բաժնի քվիզ',
  description: 'Որոշեք՝ արդյոք հարմար եք ծրագրավորման բաժնի համար',
}
export default function RootLayout({ children }) {
  return (
      <html lang="hy">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      </body>
      </html>
  )
}