import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";
import cleanupActionRoutes from "./routes/cleanupActionRoutes";
import communityRoutes from "./routes/communityRoutes";
import reportRoutes from "./routes/reportRoutes";
import verificationRoutes from "./routes/verificationRoutes";
import sortingRoutes from "./routes/sortingRoutes";
import recyclingRoutes from "./routes/recyclingRoutes";
import volunteerRoutes from "./routes/volunteerRoutes";

dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cleanup-actions", cleanupActionRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/verifications", verificationRoutes);
app.use("/api/sorting", sortingRoutes);
app.use("/api/recycling", recyclingRoutes);
app.use("/api/volunteers", volunteerRoutes);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
