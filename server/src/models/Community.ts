import mongoose, { Schema, Document } from "mongoose";

export interface ICommunity extends Document {
    name: string;
    email: string;
    password: string;
    owner: string;
    phone_number: string;
    location: string;
    year_established: number;
    members: number;
    description: string;
    logo_url: string;
    reports: string[];
    createdAt: Date;
}

const CommunitySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        owner: { type: String, required: true },
        phone_number: { type: String, required: true },
        location: { type: String, required: true },
        year_established: { type: Number, required: true },
        members: { type: Number, required: true },
        description: { type: String, required: true },
        logo_url: { type: String, required: true },
        reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ICommunity>("Community", CommunitySchema);
