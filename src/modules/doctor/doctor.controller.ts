import { Router } from "express";
import { authMiddleware, roleGuard, AuthRequest } from "@utils/middlewares";
import {
  createPatient,
  createLabRequest,
  getDoctorRequests,
  getAllPatients,
} from "./doctor.service";

const router = Router();

// 🟢 Bemor yaratish
router.post(
  "/patients",
  authMiddleware,
  roleGuard(["DOCTOR"]),
  async (req: AuthRequest, res) => {
    const patient = await createPatient(req.user!.id, req.body);
    res.json(patient);
  }
);

// 🟢 Barcha bemorlarni olish
router.get(
  "/patients",
  authMiddleware,
  roleGuard(["DOCTOR"]),
  async (req: AuthRequest, res) => {
    const patients = await getAllPatients(req.user!.id);
    res.json(patients);
  }
);

// 🟢 Yangi resept yaratish
router.post(
  "/requests",
  authMiddleware,
  roleGuard(["DOCTOR"]),
  async (req: AuthRequest, res) => {
    const request = await createLabRequest(req.user!.id, req.body);
    res.json(request);
  }
);

// 🟢 Barcha reseptlarni olish
router.get(
  "/requests",
  authMiddleware,
  roleGuard(["DOCTOR"]),
  async (req: AuthRequest, res) => {
    const requests = await getDoctorRequests(req.user!.id);
    res.json(requests);
  }
);

export default router;
