import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ShellLayout from "./components/ShellLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Atelier Admin - Dashboard",
  description: "Luxury concierge admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#fffaf6] text-[#3f1f29]">
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}
