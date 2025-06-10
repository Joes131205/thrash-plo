import { Request, Response } from "express";
import { Community, ICommunity } from "../models";
import bcryptjs from "bcryptjs";

export const registerCommunity = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            owner,
            phone_number,
            location,
            year_established,
            members,
            description,
            logo_url,
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !owner ||
            !phone_number ||
            !location ||
            !year_established ||
            !members ||
            !description ||
            !logo_url
        ) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields",
            });
        }

        const existingCommunity = await Community.findOne({ email });

        if (existingCommunity) {
            res.status(400).json({
                message: "Community already exists",
            });
            return;
        }

        const newCommunity = new Community({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
            owner,
            phone_number,
            location,
            year_established,
            members,
            description,
            logo_url,
        });

        await newCommunity.save();

        res.status(201).json({
            success: true,
            community: { ...newCommunity, password: undefined },
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

export const getAllCommunities = async (req: Request, res: Response) => {
    try {
        const communities = await Community.find().select("-password");

        res.status(200).json({
            success: true,
            count: communities.length,
            communities,
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

export const getCommunityById = async (req: Request, res: Response) => {
    try {
        const communityId = req.params.id;

        const community = await Community.findById(communityId).select(
            "-password"
        );

        if (!community) {
            return res.status(404).json({
                success: false,
                message: "Community not found",
            });
        }

        res.status(200).json({
            success: true,
            community,
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

export const updateCommunity = async (req: Request, res: Response) => {
    try {
        const communityId = req.params.id;

        const { password, ...updateData } = req.body;

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({
                success: false,
                message: "Community not found",
            });
        }

        const updatedCommunity = await Community.findByIdAndUpdate(
            communityId,
            { $set: updateData },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Community updated successfully",
            community: updatedCommunity,
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

export const deleteCommunity = async (req: Request, res: Response) => {
    try {
        const communityId = req.params.id;

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({
                success: false,
                message: "Community not found",
            });
        }

        await Community.findByIdAndDelete(communityId);

        res.status(200).json({
            success: true,
            message: "Community deleted successfully",
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
