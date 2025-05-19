import express, { Router } from "express";
import {
    createVolunteer,
    getVolunteerInAction,
} from "../controllers/volunteerControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/", protect, createVolunteer);
router.get("/:actionId", protect, getVolunteerInAction);

export default router;
