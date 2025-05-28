import express, { Router } from "express";
import {
    createCleanupAction,
    getCleanupAction,
    getCleanupActionById,
    updateProgressStage,
} from "../controllers/cleanupActionControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/", protect, createCleanupAction);
router.get("/", protect, getCleanupAction);
router.get("/:id", protect, getCleanupActionById);
router.patch("/:id/progress", protect, updateProgressStage);

export default router;
