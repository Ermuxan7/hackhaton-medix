import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import doctorRoutes from "./modules/doctor/doctor.controller";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
