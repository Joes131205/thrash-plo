import mongoose, { Schema, Document, Types } from "mongoose";

export interface IActionReport extends Document {
    actionId: Types.ObjectId;
    description: string;
    documentation: string;
    verificationStatus: boolean;
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
