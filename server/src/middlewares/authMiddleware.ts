import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
                id: string;
            };

            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            req.userId = decoded.id;
            next();
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(401).json({
                success: false,
                message: "Not authorized, token failed",
            });
        }
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Not authorized, token failed" });
    }
};
