// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import pages from "@/data/pages.json"


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar pages={pages} />
          <div className="flex-1 flex flex-col">
            <Navbar pageName="Dashboard" />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
