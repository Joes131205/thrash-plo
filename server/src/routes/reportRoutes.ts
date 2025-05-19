import express, { Router } from "express";
import {
    createReport,
    getReport,
    getReportById,
    updateReport,
} from "../controllers/reportControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getReport);
router.get("/:id", protect, getReportById);
router.put("/:id", protect, updateReport);

export default router;
