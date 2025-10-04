import { prisma } from "@db/client";
import { Status } from "@prisma/client";

// 🟢 Yangi bemor yaratish
export async function createPatient(
  doctorId: number,
  data: {
    fullName: string;
    phone: string;
    age: number;
    address: string;
    medicHistory: string;
    content: string;
  }
) {
  return prisma.patient.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      age: data.age,
      address: data.address,
      medicHistory: data.medicHistory,
      content: data.content,
      doctorId,
    },
  });
}

// 🟢 Doktorga tegishli barcha bemorlar
export async function getAllPatients(doctorId: number) {
  return prisma.patient.findMany({
    where: { doctorId },
    include: {
      labRequests: true, // har bir bemorning reseptlari ham kelsin
    },
    orderBy: { id: "desc" },
  });
}

// 🟢 Yangi resept (lab request) yaratish
export async function createLabRequest(
  doctorId: number,
  data: {
    patientId: number;
    drugName: string;
    dose: string;
    receptionFrequency: string;
    continuity: string;
    addition?: string;
  }
) {
  return prisma.labRequest.create({
    data: {
      doctorId,
      patientId: data.patientId,
      drugName: data.drugName,
      dose: data.dose,
      receptionFrequency: data.receptionFrequency,
      continuity: data.continuity,
      addition: data.addition ?? null,
      status: Status.PENDING,
    },
  });
}

// 🟢 Doktorga tegishli barcha reseptlar (lab requests)
export async function getDoctorRequests(doctorId: number) {
  return prisma.labRequest.findMany({
    where: { doctorId },
    include: {
      patient: true,
    },
    orderBy: { id: "desc" },
  });
}
