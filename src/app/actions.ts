"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveSupervisionForm(formData: FormData) {
  try {
    const data = {
      teacherName: formData.get("teacherName") as string,
      department: formData.get("department") as string,
      subject: formData.get("subject") as string,
      gradeLevel: formData.get("gradeLevel") as string,
      date: formData.get("evalDate") as string,
      time: formData.get("evalTime") as string,
      topic: formData.get("topic") as string,
      
      q1_1: Number(formData.get("q1_1") || 0),
      q2_1: Number(formData.get("q2_1") || 0),
      q3_1: Number(formData.get("q3_1") || 0),
      q4_1: Number(formData.get("q4_1") || 0),
      q5_1: Number(formData.get("q5_1") || 0),
      
      totalScore: Number(formData.get("totalScore") || 0),
      totalPercent: Number(formData.get("percentScore") || 0),
      qualityLevel: formData.get("evalResult") as string || "-",
      
      strength: formData.get("strength") as string,
      suggestion: formData.get("suggestion") as string,
    };

    const record = await prisma.supervision.create({
      data,
    });
    
    return { success: true, id: record.id };
  } catch (error) {
    console.error("Error saving supervision:", error);
    return { success: false, error: "Failed to save data." };
  }
}
