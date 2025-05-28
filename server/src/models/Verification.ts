import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVerification extends Document {
    reportId: Types.ObjectId;
    verifiedBy: Types.ObjectId;
    verificationTime: Date;
    result: "rejected" | "approved";
    createdAt: Date;
}

const VerificationSchema: Schema = new Schema(
    {
        reportId: {
            type: Schema.Types.ObjectId,
            ref: "Report",
            required: true,
        },
        verifiedBy: {
            type: Schema.Types.ObjectId,
            ref: "Community",
            required: true,
        },
        verificationTime: { type: Date, required: true },
        result: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IVerification>(
    "Verification",
    VerificationSchema
);
