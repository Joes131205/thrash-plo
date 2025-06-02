import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRecyclingTransaction extends Document {
    partnerId: Types.ObjectId;
    sortingResultId: Types.ObjectId;
    commission: number;
    status: "pending" | "completed" | "canceled";
    transactionDate: Date;
    createdAt: Date;
}

const RecyclingTransactionSchema: Schema = new Schema(
    {
        partnerId: {
            type: Schema.Types.ObjectId,
            ref: "RecyclingPartner",
            required: true,
        },
        sortingResultId: {
            type: Schema.Types.ObjectId,
            ref: "SortingResult",
            required: true,
        },
        commission: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "completed", "canceled"],
            required: true,
        },
        transactionDate: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRecyclingTransaction>(
    "RecyclingTransaction",
    RecyclingTransactionSchema
);
