import { Request, Response } from "express";
import RecyclingPartner, {
    IRecyclingPartner,
} from "../models/RecyclingPartner";
import RecyclingTransaction, {
    IRecyclingTransaction,
} from "../models/RecyclingTransaction";

export const getRecyclingPartner = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ success: true, message: "Success" });
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
        res.status(200).json({ success: true, message: "Success" });
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
        res.status(200).json({ success: true, message: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
