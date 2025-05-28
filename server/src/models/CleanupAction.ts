import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICleanupAction extends Document {
    reportId: Types.ObjectId;
    communityId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: string;
    progressStage:
        | "verification"
        | "scheduling"
        | "traveling"
        | "collection"
        | "sorting"
        | "shipping"
        | "completed";
    location: string;
    volunteers: number;
    max_volunteers: number;
    title: string;
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
            ref: "Community",
            required: true,
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, required: true },
        progressStage: {
            type: String,
            enum: [
                "verification",
                "scheduling",
                "traveling",
                "collection",
                "sorting",
                "shipping",
                "completed",
            ],
            default: "verification",
        },
        location: { type: String, required: true },
        volunteers: { type: Number, required: true },
        max_volunteers: { type: Number, required: true },
        title: { type: String, required: true },
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
