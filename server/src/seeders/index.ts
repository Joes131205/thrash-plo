import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function seedDatabase() {
    try {
        console.log("NOT IMPLEMENTED");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}
seedDatabase();
