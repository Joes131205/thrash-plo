import express, { Router } from "express";
import {
    getRecyclingPartner,
    createRecyclingTransaction,
    getRecyclingTransactionHistory,
} from "../controllers/recyclingControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/partners", protect, getRecyclingPartner);
router.post("/transaction/create", protect, createRecyclingTransaction);
router.get("/transaction/history/:id", protect, getRecyclingTransactionHistory);

export default router;
