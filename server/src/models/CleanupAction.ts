import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICleanupAction extends Document {
    reportId: Types.ObjectId;
    communityId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: string;
    createdAt: Date;
}

const CleanupActionSchema: Schema = new Schema(
    {
        reportId: {
            type: Schema.Types.ObjectId,
            ref: "Report",
            required: true,
        },
        communityId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ICleanupAction>(
    "CleanupAction",
    CleanupActionSchema
);
