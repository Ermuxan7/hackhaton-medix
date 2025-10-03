import { Router } from "express";
import { authMiddleware, roleGuard, AuthRequest } from "@utils/middlewares";
import {
  createPatient,
  createLabRequest,
  getDoctorRequests,
} from "./doctor.service";

const router = Router();

router.post(
  "/patients",
  authMiddleware,
  roleGuard(["DOCTOR"]),
  async (req: AuthRequest, res) => {
    const patient = await createPatient(req.user!.id, req.body);
    res.json(patient);
  }
);

router.post(
  "/requests",
  authMiddleware,
  roleGuard(["DOCTOR"]),
  async (req: AuthRequest, res) => {
    const request = await createLabRequest(req.user!.id, req.body);
    res.json(request);
  }
);

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
