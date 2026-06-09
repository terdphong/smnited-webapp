"use client";

import Head from "next/head";
import { FormEvent, useState } from "react";

export default function ObservePage() {
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

        <form onSubmit={handleSubmit} className="card section-card" style={{ marginTop: "2rem" }}>
          <div className="section-header">
            <div className="section-icon">📌</div>
            <div>
              <h2 className="section-title">ข้อมูลการสังเกตการสอน</h2>
              <p className="section-desc">กรอกรายละเอียดก่อนทำการสังเกตการสอน</p>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-group col-2">
              <label className="form-label" htmlFor="obs_teacherName">ชื่อ-นามสกุล ครูผู้สอน <span className="required">*</span></label>
              <input type="text" id="obs_teacherName" name="obs_teacherName" className="form-input" placeholder="กรอกชื่อ-นามสกุล" required />
            </div>
            
            <div className="form-group col-1">
              <label className="form-label" htmlFor="obs_subject">วิชา <span className="required">*</span></label>
              <input type="text" id="obs_subject" name="obs_subject" className="form-input" placeholder="ชื่อวิชา" required />
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
