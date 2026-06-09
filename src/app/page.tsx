"use client";

import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Send data to API Route
    setTimeout(() => {
      alert("บันทึกข้อมูลเรียบร้อย (Mock)");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>แบบนิเทศการจัดการเรียนรู้ | โรงเรียนบางปลาม้า “สูงสุมารผดุงวิทย์”</title>
      </Head>
      
      {/* Navigation */}
      <nav className="top-nav" id="topNav">
        <div className="nav-inner">
          <div className="nav-brand">
            <span className="nav-logo">🏫</span>
            <span className="nav-name">โรงเรียนบางปลาม้า “สูงสุมารผดุงวิทย์”</span>
          </div>
          <div className="nav-links">
            <Link href="/" className="nav-link nav-link-active" id="nav-form">
              <span>📋</span> แบบนิเทศ
            </Link>
            <Link href="/observe" className="nav-link" id="nav-observe">
              <span>👁</span> แบบสังเกต
            </Link>
            <Link href="/dashboard" className="nav-link" id="nav-dashboard">
              <span>📊</span> แดชบอร์ด
            </Link>
          </div>
        </div>
      </nav>

      {/* Background decoration */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

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

        <form onSubmit={handleSubmit} className="card section-card" style={{ marginTop: "2rem" }}>
          <div className="section-header">
            <h2 className="section-title">ข้อมูลการจัดกิจกรรมการเรียนรู้</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group col-2">
              <label className="form-label" htmlFor="teacherName">ชื่อ-นามสกุล ครูผู้สอน <span className="required">*</span></label>
              <input type="text" id="teacherName" name="teacherName" className="form-input" placeholder="กรอกชื่อ-นามสกุล" required />
            </div>
            
            <div className="form-group col-1">
              <label className="form-label" htmlFor="department">กลุ่มสาระการเรียนรู้ <span className="required">*</span></label>
              <select id="department" name="department" className="form-input form-select" required>
                <option value="" disabled selected>-- เลือกกลุ่มสาระฯ --</option>
                <option value="วิทยาศาสตร์และเทคโนโลยี">วิทยาศาสตร์และเทคโนโลยี</option>
                <option value="คณิตศาสตร์">คณิตศาสตร์</option>
                <option value="ภาษาไทย">ภาษาไทย</option>
              </select>
            </div>
            {/* Other inputs will go here... */}
          </div>

          <div className="action-row" style={{ marginTop: "2rem" }}>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "กำลังบันทึก..." : "💾 บันทึกข้อมูลและส่งรายงาน"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
