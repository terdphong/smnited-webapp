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

export async function saveObservationForm(formData: FormData) {
  try {
    const data = {
      teacherName: formData.get("obs_teacherName") as string,
      subject: formData.get("obs_subject") as string,
      gradeLevel: formData.get("obs_gradeLevel") as string,
      term: formData.get("obs_term") as string,
      academicYear: formData.get("obs_academicYear") as string,
      date: formData.get("obs_date") as string,
      time: formData.get("obs_time") as string,
      topic: formData.get("obs_topic") as string,
      
      q1: formData.get("obs_q1") as string,
      q1_note: formData.get("obs_q1_note") as string,
      q2: formData.get("obs_q2") as string,
      q2_note: formData.get("obs_q2_note") as string,
      q3: formData.get("obs_q3") as string,
      q3_note: formData.get("obs_q3_note") as string,
      q4: formData.get("obs_q4") as string,
      q4_note: formData.get("obs_q4_note") as string,
      
      strength: formData.get("obs_strength") as string,
      success: formData.get("obs_success") as string,
      suggestion: formData.get("obs_suggestion") as string,
      
      observerName: formData.get("obs_observerName") as string,
      observerPosition: formData.get("obs_observerPosition") as string,
      receiverName: formData.get("obs_receiverName") as string,
      receiverNote: formData.get("obs_receiverNote") as string,
      headName: formData.get("obs_headName") as string,
      headNote: formData.get("obs_headNote") as string,
    };

    const record = await prisma.observation.create({
      data,
    });
    
    return { success: true, id: record.id };
  } catch (error) {
    console.error("Error saving observation:", error);
    return { success: false, error: "Failed to save data." };
  }
}
