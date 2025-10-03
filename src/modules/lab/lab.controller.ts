import { Router } from "express";
import { authMiddleware, roleGuard, AuthRequest } from "@utils/middlewares";
import { getLabRequests, addLabResult } from "./lab.service";

const router = Router();

router.get(
  "/requests",
  authMiddleware,
  roleGuard(["LAB"]),
  async (req, res) => {
    const requests = await getLabRequests();
    res.json(requests);
  }
);

router.post(
  "/requests/:id/result",
  authMiddleware,
  roleGuard(["LAB"]),
  async (req, res) => {
    const result = await addLabResult(Number(req.params.id), req.body.result);
    res.json(result);
  }
);

export default router;
