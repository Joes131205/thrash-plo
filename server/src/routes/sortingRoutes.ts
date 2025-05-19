import express, { Router } from "express";
import {
    createSortingResult,
    getSortingResultInAction,
    createSortingReport,
    getSortingReportInAction,
    verifySortingReport,
} from "../controllers/sortingControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/result", protect, createSortingResult);
router.get("/result/:actionId", protect, getSortingResultInAction);
router.post("/report", protect, createSortingReport);
router.get("/report/:actionId", protect, getSortingReportInAction);
router.put("/report/verify/:id", protect, verifySortingReport);

export default router;
