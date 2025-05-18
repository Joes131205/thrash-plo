import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReport extends Document {
    trashId: string;
    userId: Types.ObjectId;
    description: string;
    photo: string;
    location: {
        lat: number;
        long: number;
    };
    status: "waiting" | "processing" | "done";
    category: string;
    weightEstimation: number;
    createdAt: Date;
}

const ReportSchema: Schema = new Schema(
    {
        trashId: { type: String, required: true },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: { type: String, required: true },
        photo: { type: String, required: true },
        location: {
            lat: {
                type: Number,
                required: true,
            },
            long: {
                type: Number,
                required: true,
            },
        },
        status: {
            type: String,
            enum: ["waiting", "processing", "done"],
            required: true,
        },
        category: {
            type: String,
            enum: ["small", "large"],
            required: true,
        },
        weightEstimation: {
            type: Number,
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IReport>("Report", ReportSchema);
