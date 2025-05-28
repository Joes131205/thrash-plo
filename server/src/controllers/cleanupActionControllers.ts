import { Request, Response } from "express";
import CleanupAction, { ICleanupAction } from "../models/CleanupAction";

// Valid progress stages
type ProgressStage =
    | "verification"
    | "scheduling"
    | "traveling"
    | "collection"
    | "sorting"
    | "shipping"
    | "completed";

export const createCleanupAction = async (req: Request, res: Response) => {
    try {
        const {
            reportId,
            communityId,
            startDate,
            endDate,
            status,
            progressStage,
        } = req.body;

        if (!reportId || !communityId || !startDate || !endDate || !status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const newCleanupAction = new CleanupAction({
            reportId,
            communityId,
            startDate,
            endDate,
            status,
            progressStage: progressStage || "verification", // Default to verification if not provided
        });

        const savedCleanupAction = await newCleanupAction.save();

        res.status(201).json({
            success: true,
            message: "Cleanup action created successfully",
            data: savedCleanupAction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const getCleanupAction = async (req: Request, res: Response) => {
    try {
        const cleanupActions = await CleanupAction.find()
            .populate("reportId", "trashId description location category")
            .populate("communityId", "name email");

        res.status(200).json({
            success: true,
            count: cleanupActions.length,
            data: cleanupActions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const getCleanupActionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const cleanupAction = await CleanupAction.findById(id)
            .populate("reportId", "trashId description location category")
            .populate("communityId", "name email");

        if (!cleanupAction) {
            return res.status(404).json({
                success: false,
                message: "Cleanup action not found",
            });
        }

        res.status(200).json({
            success: true,
            data: cleanupAction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const updateProgressStage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { progressStage } = req.body;

        // Check if the progress stage is valid
        const validProgressStages: ProgressStage[] = [
            "verification",
            "scheduling",
            "traveling",
            "collection",
            "sorting",
            "shipping",
            "completed",
        ];

        if (!validProgressStages.includes(progressStage)) {
            return res.status(400).json({
                success: false,
                message: "Invalid progress stage",
            });
        }

        const cleanupAction = await CleanupAction.findById(id);
        if (!cleanupAction) {
            return res.status(404).json({
                success: false,
                message: "Cleanup action not found",
            });
        }

        // Update the progress stage
        cleanupAction.progressStage = progressStage;

        // If the progress stage is completed, update the status as well
        if (progressStage === "completed") {
            cleanupAction.status = "done";
        }

        await cleanupAction.save();

        res.status(200).json({
            success: true,
            message: "Progress stage updated successfully",
            data: cleanupAction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
