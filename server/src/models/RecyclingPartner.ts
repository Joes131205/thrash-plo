import mongoose, { Schema, Document } from "mongoose";

export interface IRecyclingPartner extends Document {
    name: string;
    acceptedWasteTypes: string[];
    contact: string;
    createdAt: Date;
}

const RecyclingPartnerSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        acceptedWasteTypes: { type: [String], required: true },
        contact: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRecyclingPartner>(
    "RecyclingPartner",
    RecyclingPartnerSchema
);
