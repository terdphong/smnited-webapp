import type { Metadata } from "next";
import { Sarabun, Prompt } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
});

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "ระบบนิเทศการจัดการเรียนรู้ | โรงเรียนบางปลาม้า “สูงสุมารผดุงวิทย์”",
  description: "ระบบประเมินและสังเกตการจัดการเรียนรู้",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${sarabun.variable} ${prompt.variable} antialiased`}>
        {/* Global Navigation */}
        <nav className="top-nav" id="topNav">
          <div className="nav-inner">
            <div className="nav-brand">
              <span className="nav-logo">🏫</span>
              <span className="nav-name">โรงเรียนบางปลาม้า “สูงสุมารผดุงวิทย์”</span>
            </div>
            <div className="nav-links">
              <Link href="/" className="nav-link">
                <span>📋</span> แบบนิเทศ
              </Link>
              <Link href="/observe" className="nav-link">
                <span>👁</span> แบบสังเกต
              </Link>
              <Link href="/dashboard" className="nav-link">
                <span>📊</span> แดชบอร์ด
              </Link>
            </div>
          </div>
        </nav>

        {/* Global Background */}
        <div className="bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <main style={{ position: "relative", zIndex: 1, paddingBottom: "4rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
