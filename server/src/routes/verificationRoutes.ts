import express, { Router } from "express";
import {
    verifyReport,
    getVerification,
} from "../controllers/verificationControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/:id", protect, verifyReport);
router.get("/", protect, getVerification);

export default router;
