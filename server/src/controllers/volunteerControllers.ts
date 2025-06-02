import { Request, Response } from "express";
import {
    Volunteer,
    IVolunteer,
    CleanupAction,
    ICleanupAction,
} from "../models";

export const createVolunteer = async (req: Request, res: Response) => {
    try {
        const { actionId } = req.body;
        const userId = req.userId;

        // Validate required fields
        if (!actionId) {
            return res.status(400).json({
                success: false,
                message: "Please provide action ID",
            });
        }

        // Check if action exists
        const action = await CleanupAction.findById(actionId);

        if (!action) {
            return res.status(404).json({
                success: false,
                message: "Cleanup action not found",
            });
        }

        // Check if user already volunteered for this action
        const existingVolunteer = await Volunteer.findOne({
            userId,
            actionId,
        });

        if (existingVolunteer) {
            return res.status(400).json({
                success: false,
                message: "You have already volunteered for this action",
            });
        }

        const newVolunteer = new Volunteer({
            userId,
            actionId,
        });

        const savedVolunteer = await newVolunteer.save();

        res.status(201).json({
            success: true,
            message: "Volunteer registration successful",
            data: savedVolunteer,
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

export const getVolunteerInAction = async (req: Request, res: Response) => {
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
        const volunteers = await Volunteer.find({ actionId }).populate(
            "userId",
            "name email phone_number"
        );

        res.status(200).json({
            success: true,
            count: volunteers.length,
            data: volunteers,
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
