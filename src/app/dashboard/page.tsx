"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      fetch("/api/records")
        .then(res => res.json())
        .then(data => {
          setRecords(data.supervisions || []);
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

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

  // Chart data
  const departments = records.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: 'จำนวนการนิเทศ (ครั้ง)',
        data: Object.values(departments),
        backgroundColor: '#3b82f6',
      }
    ]
  };

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
            <button className="btn btn-secondary" onClick={() => setIsAuthenticated(false)}>
              ออกจากระบบ
            </button>
          </div>
        </header>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>กำลังโหลดข้อมูล...</div>
        ) : (
          <div className="dashboard-grid" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
            
            <div className="card stat-card" style={{ padding: "2rem", textAlign: "center" }}>
              <h3>จำนวนการนิเทศทั้งหมด</h3>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#3b82f6" }}>{records.length}</div>
              <p>ครั้ง</p>
            </div>

            <div className="card chart-card" style={{ padding: "2rem", gridColumn: "span 2" }}>
              <h3>จำนวนการนิเทศแบ่งตามกลุ่มสาระฯ</h3>
              <div style={{ height: "300px" }}>
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="card table-card" style={{ padding: "2rem", gridColumn: "span 2" }}>
              <h3>รายการล่าสุด</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                      <th style={{ padding: "1rem" }}>วันที่</th>
                      <th>ผู้สอน</th>
                      <th>กลุ่มสาระฯ</th>
                      <th>คะแนน</th>
                      <th>ระดับ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.slice(0, 10).map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "1rem" }}>{r.date}</td>
                        <td>{r.teacherName}</td>
                        <td>{r.department}</td>
                        <td>{r.totalPercent}%</td>
                        <td>
                          <span style={{ 
                            padding: "0.2rem 0.5rem", 
                            borderRadius: "1rem", 
                            background: r.totalPercent >= 80 ? "#dcfce3" : "#fee2e2",
                            color: r.totalPercent >= 80 ? "#166534" : "#991b1b"
                          }}>
                            {r.qualityLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {records.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                          ยังไม่มีข้อมูลการประเมิน
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </>
  );
}
