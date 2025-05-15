import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn:
            parseInt(process.env.JWT_EXPIRES_IN as string, 10) * 7 * 24 * 24,
    });
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                message: "User already exists",
            });
            return;
        }
        const newUser = new User({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser.id);
        res.status(201).json({
            success: true,
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
            token,
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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credential",
            });
        }
        const token = generateToken(user.id);
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
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

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
