import mongoose, { Schema, Document } from "mongoose";

export interface IRecyclingPartner extends Document {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    acceptedMaterials: string[];
    commissionRate: number;
    createdAt: Date;
}

const RecyclingPartnerSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        contactPerson: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        acceptedMaterials: { type: [String], required: true },
        commissionRate: { type: Number, required: true },
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
