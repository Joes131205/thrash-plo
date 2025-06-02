import express, { Router } from "express";
import { registerUser, login, getMe } from "../controllers/authControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/getMe/:id", protect, getMe);

export default router;
