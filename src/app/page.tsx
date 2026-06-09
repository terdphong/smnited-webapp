"use client";

import Head from "next/head";
import SupervisionForm from "@/components/SupervisionForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>แบบนิเทศการจัดการเรียนรู้ | โรงเรียนบางปลาม้า “สูงสุมารผดุงวิทย์”</title>
      </Head>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <header className="card header-card">
          <div className="header-inner">
            <div className="header-text">
              <p className="header-sub">ระบบนิเทศการสอน</p>
              <h1 className="header-title">แบบนิเทศการจัดการเรียนรู้</h1>
              <p className="header-school">โรงเรียนบางปลาม้า “สูงสุมารผดุงวิทย์”</p>
            </div>
          </div>
        </header>

        <div style={{ marginTop: "2rem" }}>
          <SupervisionForm />
        </div>
      </div>
    </>
  );
}
