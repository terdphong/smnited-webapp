"use client";

import Head from "next/head";
import { useState } from "react";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin1234") {
      setIsAuthenticated(true);
    } else {
      alert("รหัสผ่านไม่ถูกต้อง");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-overlay" style={{ display: "flex", position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.8)" }}>
        <div className="login-card" style={{ margin: "auto", background: "white", padding: "2rem", borderRadius: "1rem" }}>
          <h2>เข้าสู่ระบบแดชบอร์ด</h2>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="รหัสผ่าน" 
            className="form-input"
            style={{ marginTop: "1rem", marginBottom: "1rem", width: "100%" }}
          />
          <button onClick={handleLogin} className="btn btn-primary" style={{ width: "100%" }}>
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>แดชบอร์ด | โรงเรียนบางปลาม้า "สูงสุมารผดุงวิทย์"</title>
      </Head>
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <header className="card header-card" style={{ marginBottom: "2rem" }}>
          <div className="header-inner">
            <div className="header-text">
              <h1 className="header-title">แดชบอร์ดสรุปผลการนิเทศ</h1>
              <p className="header-school">โรงเรียนบางปลาม้า "สูงสุมารผดุงวิทย์"</p>
            </div>
          </div>
        </header>

        <div className="card section-card">
          <h2>สรุปผล (กำลังอยู่ระหว่างพัฒนา)</h2>
          <p>กราฟและข้อมูลสถิติจะถูกย้ายมาแสดงที่นี่ในไม่ช้า...</p>
        </div>
      </div>
    </>
  );
}
