"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <nav className="flex-none min-h-0 w-full flex gap-4 p-4 bg-background text-foreground">
          <Link href="/" className={pathname === "/" ? "underline" : ""}>
            Home
          </Link>
          <Link
            href="/vert-to-hort"
            className={pathname === "/vert-to-hort" ? "underline" : ""}
          >
            Vert to Hort
          </Link>
          <Link
            href="/hort-to-vert"
            className={pathname === "/hort-to-vert" ? "underline" : ""}
          >
            Hort to Vert
          </Link>
        </nav>
        <div className="flex-1 min-h-0">{children}</div>
      </body>
    </html>
  );
}
