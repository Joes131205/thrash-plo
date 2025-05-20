import { Request, Response } from "express";
import Verification, { IVerification } from "../models/Verification";
import Report, { IReport } from "../models/Report";

export const verifyReport = async (req: Request, res: Response) => {
    try {
        const reportId = req.params.id;
        const { result } = req.body;
        const verifiedBy = req.userId;

        // Validate required fields
        if (!reportId || !result) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Check if report exists
        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        const newVerification = new Verification({
            reportId,
            verifiedBy,
            verificationTime: new Date(),
            result,
        });

        const savedVerification = await newVerification.save();

        // Update report status if needed based on verification result
        if (result === "verified") {
            await Report.findByIdAndUpdate(reportId, { status: "processing" });
        }

        res.status(201).json({
            success: true,
            message: "Report verification created successfully",
            data: savedVerification,
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

export const getVerification = async (req: Request, res: Response) => {
    try {
        // We can filter by report ID or verifiedBy if provided
        const filter: any = {};

        if (req.query.reportId) {
            filter.reportId = req.query.reportId;
        }

        if (req.query.verifiedBy) {
            filter.verifiedBy = req.query.verifiedBy;
        }

        const verifications = await Verification.find(filter)
            .populate("reportId", "trashId description photo")
            .populate("verifiedBy", "name email");

        res.status(200).json({
            success: true,
            count: verifications.length,
            data: verifications,
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
