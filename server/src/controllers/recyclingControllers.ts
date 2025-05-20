import { Request, Response } from "express";
import RecyclingPartner, {
    IRecyclingPartner,
} from "../models/RecyclingPartner";
import RecyclingTransaction, {
    IRecyclingTransaction,
} from "../models/RecyclingTransaction";

export const getRecyclingPartner = async (req: Request, res: Response) => {
    try {
        const partners = await RecyclingPartner.find();

        res.status(200).json({
            success: true,
            count: partners.length,
            data: partners,
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

export const createRecyclingTransaction = async (
    req: Request,
    res: Response
) => {
    try {
        const { partnerId, sortingResultId, commission, status } = req.body;

        // Validate required fields
        if (!partnerId || !sortingResultId || !commission || !status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Validate if partner exists
        const partner = await RecyclingPartner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({
                success: false,
                message: "Recycling partner not found",
            });
        }

        const newTransaction = new RecyclingTransaction({
            partnerId,
            sortingResultId,
            commission,
            status,
        });

        const savedTransaction = await newTransaction.save();

        res.status(201).json({
            success: true,
            message: "Recycling transaction created successfully",
            data: savedTransaction,
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

export const getRecyclingTransactionHistory = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        // Check if this is a partner ID or sorting result ID
        let transactions;

        if (req.query.type === "partner") {
            transactions = await RecyclingTransaction.find({ partnerId: id })
                .populate("partnerId", "name acceptedWasteTypes")
                .populate("sortingResultId", "wasteType weight status");
        } else {
            transactions = await RecyclingTransaction.find({
                sortingResultId: id,
            })
                .populate("partnerId", "name acceptedWasteTypes")
                .populate("sortingResultId", "wasteType weight status");
        }

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
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
