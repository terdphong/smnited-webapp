"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { saveSupervisionForm } from "@/app/actions";

const QUESTIONS_DATA = [
  { section: '1. การเตรียมความพร้อมก่อนสอน' },
  { id: 1,  text: '1.1 วิเคราะห์มาตรฐานการเรียนรู้ ตัวชี้วัดตามหลักสูตรแกนกลาง 51' },
  { id: 2,  text: '1.2 มีการจัดเตรียมวัสดุอุปกรณ์การเรียนการสอนล่วงหน้า' },
  { id: 3,  text: '1.3 จัดทำแผนการเรียนรู้ที่มีองค์ประกอบถูกต้องครบถ้วน' },
  { id: 4,  text: '1.4 มีการเชื่อมโยงประสบการณ์เดิมของผู้เรียนกับความรู้ใหม่' },

  { section: '2. การจัดกิจกรรมการเรียนรู้' },
  { id: 5,  text: '2.1 จัดกิจกรรมการเรียนรู้สอดคล้องกับมาตรฐานการเรียนรู้และตัวชี้วัด' },
  { id: 6,  text: '2.2 จัดกิจกรรมให้นักเรียนแสวงหาองค์ความรู้ได้ด้วยตนเอง' },
  { id: 7,  text: '2.3 จัดกิจกรรมตามความถนัดและความสนใจของนักเรียน' },
  { id: 8,  text: '2.4 จัดกิจกรรมให้ผู้เรียนมีทักษะกระบวนการคิดและการแก้ปัญหา' },
  { id: 9,  text: '2.5 จัดกิจกรรมการเรียนรู้พัฒนาทักษะชีวิตเชื่อมโยงกับชีวิตจริง' },
  { id: 10, text: '2.6 จัดกิจกรรมให้ผู้เรียนมีทักษะในการใช้เทคโนโลยีสารสนเทศฯ' },
  { id: 11, text: '2.7 การสอดแทรกความรู้ทั่วไปและคุณธรรม จริยธรรม' },
  { id: 12, text: '2.8 การใช้วิธีการสอนที่หลากหลาย' },
  { id: 13, text: '2.9 การเปิดโอกาสให้ผู้เรียนซักถามหรือแสดงความคิดเห็น' },
  { id: 14, text: '2.10 มีการตั้งคำถามที่กระตุ้นผู้เรียนใช้กระบวนการคิดฯ' },

  { section: '3. การใช้สื่อเทคโนโลยีและแหล่งเรียนรู้' },
  { id: 15, text: '3.1 ใช้สื่อและเทคโนโลยีสารสนเทศที่สอดคล้องกับจุดประสงค์ฯ' },
  { id: 16, text: '3.2 ให้ผู้เรียนได้เรียนรู้จากแหล่งเรียนรู้ที่หลากหลาย' },
  { id: 17, text: '3.3 จัดสถานที่และบรรยากาศที่เอื้อต่อการเรียนรู้' },

  { section: '4. การประเมินผล' },
  { id: 18, text: '4.1 การวัดและประเมินผลการเรียนรู้สอดคล้องกับมาตรฐานฯ' },
  { id: 19, text: '4.2 ใช้วิธีการและเครื่องมือวัดและประเมินผลที่หลากหลาย' },
  { id: 20, text: '4.3 การประเมินผลทักษะของผู้เรียนใช้เทคนิคการประเมินตามสภาพจริง' },
  { id: 21, text: '4.4 นำผลการประเมินการเรียนรู้มาใช้ในการปรับปรุงคุณภาพฯ' },

  { section: '5. บุคลิกภาพ' },
  { id: 22, text: '5.1 การแต่งกายสุภาพ เหมาะสม' },
  { id: 23, text: '5.2 การใช้น้ำเสียง มีความชัดเจน' },
  { id: 24, text: '5.3 ความเชื่อมั่นใจตนเอง' },
  { id: 25, text: '5.4 การใช้ภาษาสื่อสารและสร้างบรรยากาศการเรียนรู้' },
];

const TOTAL_MAX = 125;

export default function SupervisionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scores, setScores] = useState<Record<number, number>>({});
  
  const padHeadRef = useRef<SignatureCanvas>(null);
  const padAdminRef = useRef<SignatureCanvas>(null);

  const calculateScore = () => {
    const total = Object.values(scores).reduce((acc, val) => acc + val, 0);
    const percent = (total / TOTAL_MAX) * 100;
    
    let result = '';
    if (percent >= 91) result = 'ระดับดีมาก';
    else if (percent >= 81) result = 'ระดับดี';
    else if (percent >= 71) result = 'ระดับพอใช้';
    else if (percent >= 61) result = 'ระดับควรปรับปรุง';
    else if (percent > 0) result = 'ระดับไม่ผ่าน';

    return { total, percent: percent.toFixed(2), result };
  };

  const { total, percent, result } = calculateScore();

  const handleScoreChange = (qId: number, val: number) => {
    setScores(prev => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("totalScore", total.toString());
    formData.append("percentScore", percent);
    formData.append("evalResult", result);
    
    if (padHeadRef.current && !padHeadRef.current.isEmpty()) {
      formData.append("sigHeadData", padHeadRef.current.toDataURL());
    }
    if (padAdminRef.current && !padAdminRef.current.isEmpty()) {
      formData.append("sigAdminData", padAdminRef.current.toDataURL());
    }

    const res = await saveSupervisionForm(formData);
    
    setIsSubmitting(false);
    if (res.success) {
      alert("✅ บันทึกข้อมูลเรียบร้อย!");
      window.scrollTo(0, 0);
      e.currentTarget.reset();
      setScores({});
      padHeadRef.current?.clear();
      padAdminRef.current?.clear();
    } else {
      alert("❌ เกิดข้อผิดพลาดในการบันทึก: " + res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Section 1: ข้อมูลทั่วไป */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">📌</div>
          <div>
            <h2 className="section-title">ตอนที่ 1 — ข้อมูลการจัดกิจกรรมการเรียนรู้</h2>
            <p className="section-desc">กรอกรายละเอียดการจัดการเรียนการสอน</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group col-2">
            <label className="form-label" htmlFor="teacherName">ชื่อ-นามสกุล ครูผู้สอน <span className="required">*</span></label>
            <input type="text" id="teacherName" name="teacherName" className="form-input" placeholder="กรอกชื่อ-นามสกุล" required />
          </div>

          <div className="form-group col-1">
            <label className="form-label" htmlFor="department">กลุ่มสาระการเรียนรู้ <span className="required">*</span></label>
            <select id="department" name="department" className="form-input form-select" required defaultValue="">
              <option value="" disabled>-- เลือกกลุ่มสาระฯ --</option>
              <option value="วิทยาศาสตร์และเทคโนโลยี">วิทยาศาสตร์และเทคโนโลยี</option>
              <option value="คณิตศาสตร์">คณิตศาสตร์</option>
              <option value="ภาษาไทย">ภาษาไทย</option>
              <option value="ภาษาต่างประเทศ">ภาษาต่างประเทศ</option>
              <option value="สังคมศึกษา ศาสนา และวัฒนธรรม">สังคมศึกษา ศาสนา และวัฒนธรรม</option>
              <option value="สุขศึกษาและพลศึกษา">สุขศึกษาและพลศึกษา</option>
              <option value="ศิลปะ">ศิลปะ</option>
              <option value="การงานอาชีพ">การงานอาชีพ</option>
            </select>
          </div>

          <div className="form-group col-1">
            <label className="form-label" htmlFor="subject">วิชาที่สอน <span className="required">*</span></label>
            <input type="text" id="subject" name="subject" className="form-input" placeholder="ชื่อวิชา" required />
          </div>

          <div className="form-group col-1">
            <label className="form-label" htmlFor="gradeLevel">ชั้น/ห้อง <span className="required">*</span></label>
            <input type="text" id="gradeLevel" name="gradeLevel" className="form-input" placeholder="เช่น ม.3/2" required />
          </div>

          <div className="form-group col-1">
            <label className="form-label" htmlFor="evalDate">วันที่ประเมิน <span className="required">*</span></label>
            <input type="date" id="evalDate" name="evalDate" className="form-input" required />
          </div>

          <div className="form-group col-1">
            <label className="form-label" htmlFor="evalTime">ช่วงเวลา <span className="required">*</span></label>
            <input type="text" id="evalTime" name="evalTime" className="form-input" placeholder="เช่น 09:00-10:00 น." required />
          </div>

          <div className="form-group col-3">
            <label className="form-label" htmlFor="topic">เรื่องที่สอน <span className="required">*</span></label>
            <input type="text" id="topic" name="topic" className="form-input" placeholder="ระบุหัวข้อ/เรื่องที่ทำการสอน" required />
          </div>
        </div>
      </section>

      {/* Section 2: แบบประเมิน */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">📊</div>
          <div>
            <h2 className="section-title">ตอนที่ 1 (ต่อ) — แบบประเมินการสอน</h2>
            <p className="section-desc">เลือกคะแนนที่ตรงกับการปฏิบัติจริง | 5 = ดีมาก  4 = ดี  3 = พอใช้  2 = ควรปรับปรุง  1 = ไม่ผ่าน</p>
          </div>
        </div>

        <div id="questionsContainer">
          {QUESTIONS_DATA.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="questions-section">
                  <div className="questions-section-title">
                    <span>{item.section}</span>
                  </div>
                  <div className="question-header">
                    <span className="question-header-label">รายการประเมิน</span>
                    <div className="score-header-labels">
                      <span className="score-header-label">5</span>
                      <span className="score-header-label">4</span>
                      <span className="score-header-label">3</span>
                      <span className="score-header-label">2</span>
                      <span className="score-header-label">1</span>
                    </div>
                  </div>
                </div>
              );
            } else if (item.id) {
              return (
                <div key={item.id} className={`question-row ${scores[item.id] ? 'answered' : ''}`}>
                  <span className="question-text">{item.text}</span>
                  <div className="radio-group">
                    {[5, 4, 3, 2, 1].map(v => (
                      <div key={v} className="radio-item">
                        <input
                          type="radio"
                          id={`q${item.id}_v${v}`}
                          name={`q${item.id}`}
                          value={v}
                          className="score-radio"
                          required
                          onChange={() => handleScoreChange(item.id, v)}
                        />
                        <label htmlFor={`q${item.id}_v${v}`} className="radio-label" title={`ระดับ ${v}`}>{v}</label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Score summary */}
        <div className="score-summary" style={{ marginTop: "2rem" }}>
          <div className="score-box">
            <p className="score-label">คะแนนรวม</p>
            <div className="score-value">{total}</div>
            <p className="score-max">จาก 125</p>
          </div>
          <div className="score-box">
            <p className="score-label">คิดเป็นเปอร์เซ็นต์</p>
            <div className="score-value">{percent}</div>
            <p className="score-max">เปอร์เซ็นต์</p>
          </div>
          <div className="score-box score-box-result">
            <p className="score-label">ระดับคุณภาพ</p>
            <div className="score-value result-text">{result || '—'}</div>
          </div>
        </div>
      </section>

      {/* Section 3: สรุปผล */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">💡</div>
          <div>
            <h2 className="section-title">ตอนที่ 2 — สรุปประเด็น ข้อเสนอแนะ</h2>
          </div>
        </div>
        <div className="feedback-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="strength">
              <span className="feedback-icon strength">✨</span> 2.1 จุดเด่น
            </label>
            <textarea id="strength" name="strength" rows={3} className="form-input form-textarea" placeholder="ระบุจุดเด่น..."></textarea>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="suggestion">
              <span className="feedback-icon suggestion">💬</span> 2.2 ข้อเสนอแนะ
            </label>
            <textarea id="suggestion" name="suggestion" rows={3} className="form-input form-textarea" placeholder="ระบุข้อเสนอแนะ..."></textarea>
          </div>
        </div>
      </section>

      {/* Section 4: ลายเซ็น */}
      <section className="card section-card">
        <div className="section-header">
          <div className="section-icon">✍️</div>
          <div>
            <h2 className="section-title">ลงลายเซ็น</h2>
          </div>
        </div>
        <div className="sig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="sig-card">
            <label className="form-label sig-role-label">1. หัวหน้ากลุ่มสาระฯ</label>
            <div className="canvas-wrap" style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc", marginTop: "1rem" }}>
              <SignatureCanvas ref={padHeadRef} canvasProps={{ width: 400, height: 160, className: 'sig-pad' }} />
            </div>
            <button type="button" className="btn-clear-sig" onClick={() => padHeadRef.current?.clear()} style={{ marginTop: "0.5rem", color: "red" }}>🗑 ล้างลายเซ็น</button>
          </div>

          <div className="sig-card">
            <label className="form-label sig-role-label">2. ผู้บริหารโรงเรียน</label>
            <div className="canvas-wrap" style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc", marginTop: "1rem" }}>
              <SignatureCanvas ref={padAdminRef} canvasProps={{ width: 400, height: 160, className: 'sig-pad' }} />
            </div>
            <button type="button" className="btn-clear-sig" onClick={() => padAdminRef.current?.clear()} style={{ marginTop: "0.5rem", color: "red" }}>🗑 ล้างลายเซ็น</button>
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
