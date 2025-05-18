import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVolunteer extends Document {
    userId: Types.ObjectId;
    actionId: Types.ObjectId;
    createdAt: Date;
}

const VolunteerSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        actionId: {
            type: Schema.Types.ObjectId,
            ref: "CleanupAction",
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);
