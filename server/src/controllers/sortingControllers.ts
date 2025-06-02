import { Request, Response } from "express";
import {
    SortingResult,
    ISortingResult,
    ActionReport,
    IActionReport,
    CleanupAction,
    ICleanupAction,
} from "../models";

export const createSortingResult = async (req: Request, res: Response) => {
    try {
        const { actionId, wasteType, weight, status } = req.body;

        // Validate required fields
        if (!actionId || !wasteType || !weight || !status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Validate status value
        if (!["recyclable", "residue"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be either 'recyclable' or 'residue'",
            });
        }

        const newSortingResult = new SortingResult({
            actionId,
            wasteType,
            weight,
            status,
        });

        const savedResult = await newSortingResult.save();

        res.status(201).json({
            success: true,
            message: "Sorting result created successfully",
            data: savedResult,
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

export const getSortingResultInAction = async (req: Request, res: Response) => {
    try {
        const { actionId } = req.params;

        // Validate if action exists
        const action = await CleanupAction.findById(actionId);

        if (!action) {
            return res.status(404).json({
                success: false,
                message: "Cleanup action not found",
            });
        }

        const sortingResults = await SortingResult.find({ actionId });

        res.status(200).json({
            success: true,
            count: sortingResults.length,
            data: sortingResults,
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

export const createSortingReport = async (req: Request, res: Response) => {
    try {
        const { actionId, description, documentation } = req.body;

        // Validate required fields
        if (!actionId || !description || !documentation) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const newSortingReport = new ActionReport({
            actionId,
            description,
            documentation,
            verificationStatus: false,
        });

        const savedReport = await newSortingReport.save();

        res.status(201).json({
            success: true,
            message: "Sorting report created successfully",
            data: savedReport,
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

export const getSortingReportInAction = async (req: Request, res: Response) => {
    try {
        const { actionId } = req.params;

        // Validate if action exists
        const action = await CleanupAction.findById(actionId);

        if (!action) {
            return res.status(404).json({
                success: false,
                message: "Cleanup action not found",
            });
        }

        const actionReports = await ActionReport.find({ actionId });

        res.status(200).json({
            success: true,
            count: actionReports.length,
            data: actionReports,
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

export const verifySortingReport = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { verificationStatus } = req.body;

        // Validate required fields
        if (verificationStatus === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please provide verification status",
            });
        }

        // Find the action report
        const report = await ActionReport.findById(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Sorting report not found",
            });
        }

        // Update verification status
        const updatedReport = await ActionReport.findByIdAndUpdate(
            id,
            { verificationStatus },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Sorting report verification updated successfully",
            data: updatedReport,
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
