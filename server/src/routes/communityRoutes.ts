import express, { Router } from "express";
import {
    registerCommunity,
    getAllCommunities,
    getCommunityById,
    updateCommunity,
    deleteCommunity,
} from "../controllers/communityControllers";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

// Register a new community
router.post("/register", registerCommunity);

// Get all communities
router.get("/", getAllCommunities);

// Get a single community by ID
router.get("/:id", getCommunityById);

// Update a community (protected route)
router.put("/:id", protect, updateCommunity);

// Delete a community (protected route)
router.delete("/:id", protect, deleteCommunity);

export default router;
