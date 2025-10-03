import { prisma } from "@db/client";

export async function getLabRequests() {
  return prisma.labRequest.findMany({
    where: { status: "PENDING" },
    include: { patient: true, doctor: true },
  });
}

export async function addLabResult(requestId: number, result: string) {
  return prisma.labRequest.update({
    where: { id: requestId },
    data: { status: "DONE", result },
  });
}
