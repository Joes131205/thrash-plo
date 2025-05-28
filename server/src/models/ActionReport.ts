import mongoose, { Schema, Document, Types } from "mongoose";

// For user
export interface IActionReport extends Document {
    userId: string;
    location: {
        lat: number;
        long: number;
    };
    category: "liar" | "pantai" | "sungai";
    weightEstimation: number;
    photo: {
        near: string;
        far: string;
    };
    description: string;
    documentation: {
        community: {
            photo1: string;
            photo2: string;
            note: string;
        };
        dlh: {
            photo1: string;
            photo2: string;
            note: string;
        };
    };
    verificationStatus: {
        status: boolean;
        communityId?: string;
    };
    createdAt: Date;
}

const ActionReportSchema: Schema = new Schema(
    {
        actionId: {
            type: Schema.Types.ObjectId,
            ref: "CleanupAction",
            required: true,
        },
        description: { type: String, required: true },
        documentation: { type: String, required: true },
        verificationStatus: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IActionReport>(
    "ActionReport",
    ActionReportSchema
);
