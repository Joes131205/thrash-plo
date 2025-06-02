import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISortingResult extends Document {
    actionId: Types.ObjectId;
    wasteType: "unorganic" | "organic";
    weight: number;
    status: "recyclable" | "residue";
    createdAt: Date;
}

const SortingResultSchema: Schema = new Schema(
    {
        actionId: {
            type: Schema.Types.ObjectId,
            ref: "CleanupAction",
            required: true,
        },
        wasteType: { type: String, required: true },
        weight: { type: Number, required: true },
        status: {
            type: String,
            enum: ["recyclable", "residue"],
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ISortingResult>(
    "SortingResult",
    SortingResultSchema
);
