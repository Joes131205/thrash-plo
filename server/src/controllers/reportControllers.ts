import { Request, Response } from "express";
import { Report, IReport } from "../models";

export const createReport = async (req: Request, res: Response) => {
    try {
        const {
            trashId,
            description,
            photo,
            location,
            category,
            weightEstimation,
        } = req.body;
        const userId = req.userId;

        // Validate required fields
        if (
            !trashId ||
            !description ||
            !photo ||
            !location ||
            !category ||
            !weightEstimation
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Validate location data
        if (!location.lat || !location.long) {
            return res.status(400).json({
                success: false,
                message: "Location must include latitude and longitude",
            });
        }

        const newReport = new Report({
            trashId,
            userId,
            description,
            photo,
            location,
            status: "waiting",
            category,
            weightEstimation,
        });

        const savedReport = await newReport.save();

        res.status(201).json({
            success: true,
            message: "Report created successfully",
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

export const getReport = async (req: Request, res: Response) => {
    try {
        // Add filters based on query parameters
        const filter: any = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.userId) {
            filter.userId = req.query.userId;
        }
        const reports = await Report.find(filter).populate(
            "userId",
            "name email phone_number"
        );

        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports,
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

export const getReportById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const report = await Report.findById(id).populate(
            "userId",
            "name email phone_number"
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        res.status(200).json({
            success: true,
            data: report,
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

export const updateReport = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find report first to check if it exists
        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        // Check if user has permission to update (if they own the report or are admin)
        // This would require user role checking, for now we'll allow the update

        // Don't allow updating certain fields
        const { userId, trashId, ...allowedUpdates } = updates;
        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { $set: allowedUpdates },
            { new: true, runValidators: true }
        ).populate("userId", "name email phone_number");

        res.status(200).json({
            success: true,
            message: "Report updated successfully",
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
