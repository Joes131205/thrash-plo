import express, { Router } from "express";
import { register, login, getMe } from "../controllers/authControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getMe/:id", protect, getMe);

export default router;
