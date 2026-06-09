"use client";

import Head from "next/head";
import ObservationForm from "@/components/ObservationForm";

export default function ObservePage() {
  return (
    <>
      <Head>
        <title>แบบสังเกตการจัดการเรียนรู้ | โรงเรียนบางปลาม้า "สูงสุมารผดุงวิทย์"</title>
      </Head>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <header className="card header-card observe-header">
          <div className="header-inner">
            <div className="header-text">
              <p className="header-sub">ระบบนิเทศการสอน</p>
              <h1 className="header-title">แบบสังเกตการจัดการเรียนรู้</h1>
              <p className="header-school">โรงเรียนบางปลาม้า "สูงสุมารผดุงวิทย์"</p>
            </div>
          </div>
        </header>

        <div style={{ marginTop: "2rem" }}>
          <ObservationForm />
        </div>
      </div>
    </>
  );
}
