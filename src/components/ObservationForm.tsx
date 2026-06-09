"use client";

import { useState, useRef, FormEvent } from "react";
import SignatureCanvas from "react-signature-canvas";
import { saveObservationForm } from "@/app/actions";

export default function ObservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const padObserverRef = useRef<SignatureCanvas>(null);
  const padReceiverRef = useRef<SignatureCanvas>(null);
  const padHeadRef = useRef<SignatureCanvas>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    if (padObserverRef.current && !padObserverRef.current.isEmpty()) {
      formData.append("sigObserverData", padObserverRef.current.toDataURL());
    }
    if (padReceiverRef.current && !padReceiverRef.current.isEmpty()) {
      formData.append("sigReceiverData", padReceiverRef.current.toDataURL());
    }
    if (padHeadRef.current && !padHeadRef.current.isEmpty()) {
      formData.append("sigHeadData", padHeadRef.current.toDataURL());
    }

    const res = await saveObservationForm(formData);

    setIsSubmitting(false);
    if (res.success) {
      alert("✅ บันทึกแบบสังเกตเรียบร้อย!");
      window.scrollTo(0, 0);
      e.currentTarget.reset();
      padObserverRef.current?.clear();
      padReceiverRef.current?.clear();
      padHeadRef.current?.clear();
    } else {
      alert("❌ เกิดข้อผิดพลาดในการบันทึก: " + res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* ข้อมูลทั่วไป */}
      <section className="card section-card">
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
          <div className="form-group col-1">
            <label className="form-label" htmlFor="obs_gradeLevel">ชั้น/ห้อง <span className="required">*</span></label>
            <input type="text" id="obs_gradeLevel" name="obs_gradeLevel" className="form-input" placeholder="เช่น ม.3/2" required />
          </div>
          <div className="form-group col-1">
            <label className="form-label" htmlFor="obs_term">ภาคเรียนที่ <span className="required">*</span></label>
            <input type="text" id="obs_term" name="obs_term" className="form-input" placeholder="เช่น 1" required />
          </div>
          <div className="form-group col-1">
            <label className="form-label" htmlFor="obs_academicYear">ปีการศึกษา <span className="required">*</span></label>
            <input type="text" id="obs_academicYear" name="obs_academicYear" className="form-input" defaultValue="2569" required />
          </div>
          <div className="form-group col-1">
            <label className="form-label" htmlFor="obs_date">วันที่ <span className="required">*</span></label>
            <input type="date" id="obs_date" name="obs_date" className="form-input" required />
          </div>
          <div className="form-group col-1">
            <label className="form-label" htmlFor="obs_time">ช่วงเวลา <span className="required">*</span></label>
            <input type="text" id="obs_time" name="obs_time" className="form-input" placeholder="เช่น 09:00-10:00 น." required />
          </div>
          <div className="form-group col-3">
            <label className="form-label" htmlFor="obs_topic">เรื่องที่สอน <span className="required">*</span></label>
            <input type="text" id="obs_topic" name="obs_topic" className="form-input" placeholder="ระบุหัวข้อ/เรื่องที่ทำการสอน" required />
          </div>
        </div>
      </section>

      {/* ตอนที่ 1 */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">📝</div>
          <div>
            <h2 className="section-title">ตอนที่ 1 — แผนการจัดการเรียนรู้</h2>
            <p className="section-desc">ทำเครื่องหมาย ✓ ลงในวงกลมตามข้อมูลที่ตรงตามความเป็นจริง</p>
          </div>
        </div>

        {/* ข้อ 1 */}
        <div className="obs-item" style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px dashed #e2e8f0" }}>
          <div className="obs-item-title" style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            <span className="obs-num">1.</span> องค์ประกอบของแผนการจัดการเรียนรู้
          </div>
          <div className="obs-choices" style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q1" value="ครบถ้วน/ถูกต้อง/สมบูรณ์" required />
              <span>มีองค์ประกอบครบถ้วน / ถูกต้อง / สมบูรณ์</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q1" value="ไม่ครบถ้วน" required />
              <span>มีองค์ประกอบไม่ครบถ้วน</span>
            </label>
          </div>
          <div className="obs-note-row" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label className="obs-note-label">ควรเพิ่มเติมหรือแก้ไขโดย:</label>
            <input type="text" name="obs_q1_note" className="form-input" placeholder="ระบุรายละเอียด..." style={{ flex: 1 }} />
          </div>
        </div>

        {/* ข้อ 2 */}
        <div className="obs-item" style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px dashed #e2e8f0" }}>
          <div className="obs-item-title" style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            <span className="obs-num">2.</span> กิจกรรมการเรียนการสอน
          </div>
          <div className="obs-choices" style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q2" value="สอดคล้อง" required />
              <span>สอดคล้องกับมาตรฐานและตัวชี้วัด</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q2" value="ไม่สอดคล้อง" required />
              <span>ไม่สอดคล้องกับมาตรฐานและตัวชี้วัด</span>
            </label>
          </div>
          <div className="obs-note-row" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label className="obs-note-label">ควรเพิ่มเติมหรือแก้ไขโดย:</label>
            <input type="text" name="obs_q2_note" className="form-input" placeholder="ระบุรายละเอียด..." style={{ flex: 1 }} />
          </div>
        </div>

        {/* ข้อ 3 */}
        <div className="obs-item" style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px dashed #e2e8f0" }}>
          <div className="obs-item-title" style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            <span className="obs-num">3.</span> สื่อประกอบกิจกรรมการเรียนรู้
          </div>
          <div className="obs-choices" style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q3" value="สอดคล้อง-ส่งเสริม" required />
              <span>สอดคล้องและส่งเสริมการเรียนรู้</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q3" value="ไม่สอดคล้อง-ไม่ส่งเสริม" required />
              <span>ไม่สอดคล้องและไม่ส่งเสริมการเรียนรู้</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q3" value="ไม่มีสื่อ" required />
              <span>ไม่มีสื่อประกอบการสอน</span>
            </label>
          </div>
          <div className="obs-note-row" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label className="obs-note-label">ควรเพิ่มเติมหรือแก้ไขโดย:</label>
            <input type="text" name="obs_q3_note" className="form-input" placeholder="ระบุรายละเอียด..." style={{ flex: 1 }} />
          </div>
        </div>

        {/* ข้อ 4 */}
        <div className="obs-item">
          <div className="obs-item-title" style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            <span className="obs-num">4.</span> การวัดและประเมินผล
          </div>
          <div className="obs-choices" style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", flexWrap: "wrap", flexDirection: "column" }}>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q4" value="หลากหลาย-สอดคล้อง" required />
              <span>หลากหลาย และสอดคล้องกับตัวชี้วัด</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q4" value="หลากหลาย-ไม่สอดคล้อง" required />
              <span>หลากหลาย แต่ไม่สอดคล้องกับตัวชี้วัด</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q4" value="ไม่หลากหลาย-สอดคล้อง" required />
              <span>ไม่หลากหลาย แต่สอดคล้องกับตัวชี้วัด</span>
            </label>
            <label className="obs-choice" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="radio" name="obs_q4" value="ไม่หลากหลาย-ไม่สอดคล้อง" required />
              <span>ไม่หลากหลาย และไม่สอดคล้องกับตัวชี้วัด</span>
            </label>
          </div>
          <div className="obs-note-row" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label className="obs-note-label">ควรเพิ่มเติมหรือแก้ไขโดย:</label>
            <input type="text" name="obs_q4_note" className="form-input" placeholder="ระบุรายละเอียด..." style={{ flex: 1 }} />
          </div>
        </div>
      </section>

      {/* ตอนที่ 2 */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">💡</div>
          <div>
            <h2 className="section-title">ตอนที่ 2 — สรุปประเด็นจากการสังเกตการสอน</h2>
          </div>
        </div>
        <div className="feedback-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="obs_strength">
              <span className="feedback-icon strength">✨</span> 2.1 จุดเด่น
            </label>
            <textarea id="obs_strength" name="obs_strength" rows={3} className="form-input form-textarea" placeholder="ระบุจุดเด่น..."></textarea>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="obs_success">
              <span className="feedback-icon" style={{ background: "#dbeafe" }}>🏆</span> 2.2 สิ่งที่ประสบความสำเร็จ
            </label>
            <textarea id="obs_success" name="obs_success" rows={3} className="form-input form-textarea" placeholder="ระบุสิ่งที่ประสบความสำเร็จ..."></textarea>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="obs_suggestion">
              <span className="feedback-icon suggestion">💬</span> 2.3 ข้อเสนอแนะในการพัฒนา
            </label>
            <textarea id="obs_suggestion" name="obs_suggestion" rows={3} className="form-input form-textarea" placeholder="ระบุข้อเสนอแนะ..."></textarea>
          </div>
        </div>
      </section>

      {/* ลายเซ็น 3 ฝ่าย */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">✍️</div>
          <div>
            <h2 className="section-title">ลงลายเซ็น</h2>
          </div>
        </div>

        <div className="sig-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          
          <div className="sig-card">
            <label className="sig-role-label form-label">👁 ผู้สังเกตการสอน</label>
            <input type="text" name="obs_observerName" placeholder="ชื่อ-นามสกุล" className="form-input" style={{ marginBottom: "0.5rem" }} />
            <input type="text" name="obs_observerPosition" placeholder="ตำแหน่ง" className="form-input" />
            <div className="canvas-wrap" style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc", marginTop: "1rem" }}>
              <SignatureCanvas ref={padObserverRef} canvasProps={{ width: 300, height: 130, className: 'sig-pad' }} />
            </div>
            <button type="button" className="btn-clear-sig" onClick={() => padObserverRef.current?.clear()} style={{ marginTop: "0.5rem", color: "red" }}>🗑 ล้างลายเซ็น</button>
          </div>

          <div className="sig-card">
            <label className="sig-role-label form-label">👨‍🏫 ผู้รับการสังเกตการสอน</label>
            <input type="text" name="obs_receiverName" placeholder="ชื่อ-นามสกุล" className="form-input" style={{ marginBottom: "0.5rem" }} />
            <textarea name="obs_receiverNote" rows={2} className="form-input form-textarea" placeholder="บันทึก..." style={{ marginBottom: "0.5rem" }}></textarea>
            <div className="canvas-wrap" style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc" }}>
              <SignatureCanvas ref={padReceiverRef} canvasProps={{ width: 300, height: 130, className: 'sig-pad' }} />
            </div>
            <button type="button" className="btn-clear-sig" onClick={() => padReceiverRef.current?.clear()} style={{ marginTop: "0.5rem", color: "red" }}>🗑 ล้างลายเซ็น</button>
          </div>

          <div className="sig-card">
            <label className="sig-role-label form-label">🏫 หัวหน้ากลุ่มสาระฯ</label>
            <input type="text" name="obs_headName" placeholder="ชื่อ-นามสกุล" className="form-input" style={{ marginBottom: "0.5rem" }} />
            <textarea name="obs_headNote" rows={2} className="form-input form-textarea" placeholder="บันทึก..." style={{ marginBottom: "0.5rem" }}></textarea>
            <div className="canvas-wrap" style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc" }}>
              <SignatureCanvas ref={padHeadRef} canvasProps={{ width: 300, height: 130, className: 'sig-pad' }} />
            </div>
            <button type="button" className="btn-clear-sig" onClick={() => padHeadRef.current?.clear()} style={{ marginTop: "0.5rem", color: "red" }}>🗑 ล้างลายเซ็น</button>
          </div>

        </div>
      </section>

      {/* Action buttons */}
      <div className="action-row" style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ fontSize: "1.2rem", padding: "1rem 2rem" }}>
          {isSubmitting ? "⏳ กำลังบันทึก..." : "💾 บันทึกข้อมูลและส่งรายงาน"}
        </button>
      </div>
    </form>
  );
}
