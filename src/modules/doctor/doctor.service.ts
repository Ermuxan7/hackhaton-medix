import { prisma } from "@db/client";

export async function createPatient(
  doctorId: number,
  data: { name: string; phone: string }
) {
  return prisma.patient.create({
    data: { ...data, doctorId },
  });
}

export async function createLabRequest(
  doctorId: number,
  data: { patientId: number }
) {
  return prisma.labRequest.create({
    data: { patientId: data.patientId, doctorId },
  });
}

export async function getDoctorRequests(doctorId: number) {
  return prisma.labRequest.findMany({
    where: { doctorId },
    include: { patient: true },
  });
}
