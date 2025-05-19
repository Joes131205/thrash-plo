import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import {
    User,
    IUser,
    Report,
    IReport,
    Verification,
    IVerification,
    CleanupAction,
    ICleanupAction,
    Volunteer,
    IVolunteer,
    SortingResult,
    ISortingResult,
    ActionReport,
    IActionReport,
    RecyclingPartner,
    IRecyclingPartner,
    RecyclingTransaction,
    IRecyclingTransaction,
} from "../models";

dotenv.config();

async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI;
        console.log(mongoURI);
        if (!mongoURI) {
            console.log("NO URI");
            return;
        }
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

async function seedUsers(count = 10): Promise<IUser[]> {
    console.log("Seeding users...");
    const users: IUser[] = [];

    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
    });
    users.push(await admin.save());

    const communityPassword = await bcrypt.hash("community123", 10);
    const community = new User({
        name: "Community Organization",
        email: "community@example.com",
        password: communityPassword,
        role: "community",
    });
    users.push(await community.save());

    const dlhPassword = await bcrypt.hash("dlh123", 10);
    const dlh = new User({
        name: "DLH Official",
        email: "dlh@example.com",
        password: dlhPassword,
        role: "DLH",
    });
    users.push(await dlh.save());

    const partnerPassword = await bcrypt.hash("partner123", 10);
    const partner = new User({
        name: "Recycling Partner",
        email: "partner@example.com",
        password: partnerPassword,
        role: "partner",
    });
    users.push(await partner.save());

    for (let i = 0; i < count; i++) {
        const password = await bcrypt.hash("password123", 10);
        const user = new User({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: password,
            role: "user",
        });
        users.push(await user.save());
    }

    console.log(`${users.length} users created`);
    return users;
}

async function seedReports(users: IUser[], count = 20): Promise<IReport[]> {
    console.log("Seeding reports...");
    const reports: IReport[] = [];
    const categories = ["small", "large"];
    const statuses = ["waiting", "processing", "done"];

    for (let i = 0; i < count; i++) {
        const regularUsers = users.filter((user) => user.role === "user");
        const randomUser = faker.helpers.arrayElement(regularUsers);

        const report = new Report({
            trashId: faker.string.alphanumeric(8),
            userId: randomUser._id,
            description: faker.lorem.sentence(),
            photo: faker.image.url(),
            location: {
                lat: faker.location.latitude(),
                long: faker.location.longitude(),
            },
            status: faker.helpers.arrayElement(statuses),
            category: faker.helpers.arrayElement(categories),
            weightEstimation: faker.number.float({
                min: 0.5,
                max: 100,
                fractionDigits: 1,
            }),
        });

        reports.push(await report.save());
    }

    console.log(`${reports.length} reports created`);
    return reports;
}

async function seedVerifications(
    reports: IReport[],
    users: IUser[],
    count = 15
): Promise<IVerification[]> {
    console.log("Seeding verifications...");
    const verifications: IVerification[] = [];
    const dlhUsers = users.filter((user) => user.role === "DLH");

    if (dlhUsers.length === 0) {
        console.log("No DLH users available for verification");
        return [];
    }

    const reportsToVerify = faker.helpers.arrayElements(reports, count);

    for (const report of reportsToVerify) {
        const verification = new Verification({
            reportId: report._id,
            verifiedBy: faker.helpers.arrayElement(dlhUsers)._id,
            verificationTime: faker.date.recent({ days: 7 }),
            result: faker.helpers.arrayElement(["verified", "rejected"]),
        });

        verifications.push(await verification.save());
    }

    console.log(`${verifications.length} verifications created`);
    return verifications;
}

async function seedCleanupActions(
    reports: IReport[],
    users: IUser[],
    count = 10
): Promise<ICleanupAction[]> {
    console.log("Seeding cleanup actions...");
    const cleanupActions: ICleanupAction[] = [];
    const communityUsers = users.filter((user) => user.role === "community");

    if (communityUsers.length === 0) {
        console.log("No community users available for cleanup actions");
        return [];
    }

    const reportsForCleanup = faker.helpers.arrayElements(reports, count);

    for (const report of reportsForCleanup) {
        const startDate = faker.date.soon({ days: 7 });
        const endDate = new Date(startDate);
        endDate.setHours(
            endDate.getHours() + faker.number.int({ min: 2, max: 8 })
        );

        const cleanupAction = new CleanupAction({
            reportId: report._id,
            communityId: faker.helpers.arrayElement(communityUsers)._id,
            startDate,
            endDate,
            status: faker.helpers.arrayElement([
                "planned",
                "in-progress",
                "completed",
            ]),
        });

        cleanupActions.push(await cleanupAction.save());
    }

    console.log(`${cleanupActions.length} cleanup actions created`);
    return cleanupActions;
}

async function seedVolunteers(
    users: IUser[],
    cleanupActions: ICleanupAction[],
    count = 30
): Promise<IVolunteer[]> {
    console.log("Seeding volunteers...");
    const volunteers: IVolunteer[] = [];
    const regularUsers = users.filter((user) => user.role === "user");

    if (regularUsers.length === 0 || cleanupActions.length === 0) {
        console.log(
            "No regular users or cleanup actions available for volunteers"
        );
        return [];
    }
    for (let i = 0; i < count; i++) {
        const volunteer = new Volunteer({
            userId: faker.helpers.arrayElement(regularUsers)._id,
            actionId: faker.helpers.arrayElement(cleanupActions)._id,
            role: faker.helpers.arrayElement([
                "participant",
                "leader",
                "coordinator",
            ]),
            status: faker.helpers.arrayElement([
                "registered",
                "confirmed",
                "attended",
            ]),
        });

        volunteers.push(await volunteer.save());
    }

    console.log(`${volunteers.length} volunteers created`);
    return volunteers;
}

async function seedSortingResults(
    cleanupActions: ICleanupAction[],
    count = 10
): Promise<ISortingResult[]> {
    console.log("Seeding sorting results...");
    const sortingResults: ISortingResult[] = [];

    if (cleanupActions.length === 0) {
        console.log("No cleanup actions available for sorting results");
        return [];
    }

    const cleanupActionsCompleted = cleanupActions.filter(
        (action) => action.status === "completed"
    );
    const actionsForSorting =
        cleanupActionsCompleted.length > 0
            ? cleanupActionsCompleted
            : faker.helpers.arrayElements(
                  cleanupActions,
                  Math.min(count, cleanupActions.length)
              );

    const wasteTypes = [
        "plastic",
        "paper",
        "glass",
        "metal",
        "organic",
        "other",
    ];
    const statuses = ["recyclable", "residue"];

    for (const action of actionsForSorting) {
        for (const wasteType of wasteTypes) {
            if (Math.random() > 0.3) {
                const sortingResult = new SortingResult({
                    actionId: action._id,
                    wasteType: wasteType,
                    weight: faker.number.float({
                        min: 0.5,
                        max: 50,
                        fractionDigits: 1,
                    }),
                    status: faker.helpers.arrayElement(statuses),
                });

                sortingResults.push(await sortingResult.save());
            }
        }
    }

    console.log(`${sortingResults.length} sorting results created`);
    return sortingResults;
}

async function seedActionReports(
    cleanupActions: ICleanupAction[],
    count = 10
): Promise<IActionReport[]> {
    console.log("Seeding action reports...");
    const actionReports: IActionReport[] = [];

    if (cleanupActions.length === 0) {
        console.log("No cleanup actions available for action reports");
        return [];
    }

    const actionsForReporting = faker.helpers.arrayElements(
        cleanupActions,
        Math.min(count, cleanupActions.length)
    );
    for (const action of actionsForReporting) {
        const actionReport = new ActionReport({
            actionId: action._id,
            description: faker.lorem.paragraph(),
            documentation: faker.lorem.paragraphs(2),
        });

        actionReports.push(await actionReport.save());
    }

    console.log(`${actionReports.length} action reports created`);
    return actionReports;
}

async function seedRecyclingPartners(
    users: IUser[],
    count = 5
): Promise<IRecyclingPartner[]> {
    console.log("Seeding recycling partners...");
    const recyclingPartners: IRecyclingPartner[] = [];
    const partnerUsers = users.filter((user) => user.role === "partner");

    if (partnerUsers.length === 0) {
        console.log("No partner users available for recycling partners");
        return [];
    }

    for (const partnerUser of partnerUsers) {
        const recyclingPartner = new RecyclingPartner({
            name: faker.company.name(),
            acceptedWasteTypes: faker.helpers.arrayElements(
                ["plastic", "paper", "glass", "metal"],
                faker.number.int({ min: 1, max: 4 })
            ),
            contact: faker.phone.number(),
        });

        recyclingPartners.push(await recyclingPartner.save());
    }

    for (let i = recyclingPartners.length; i < count; i++) {
        const recyclingPartner = new RecyclingPartner({
            name: faker.company.name(),
            acceptedWasteTypes: faker.helpers.arrayElements(
                ["plastic", "paper", "glass", "metal"],
                faker.number.int({ min: 1, max: 4 })
            ),
            contact: faker.phone.number(),
        });

        recyclingPartners.push(await recyclingPartner.save());
    }

    console.log(`${recyclingPartners.length} recycling partners created`);
    return recyclingPartners;
}

async function seedRecyclingTransactions(
    sortingResults: ISortingResult[],
    recyclingPartners: IRecyclingPartner[],
    count = 15
): Promise<IRecyclingTransaction[]> {
    console.log("Seeding recycling transactions...");
    const recyclingTransactions: IRecyclingTransaction[] = [];

    if (sortingResults.length === 0 || recyclingPartners.length === 0) {
        console.log(
            "No sorting results or recycling partners available for transactions"
        );
        return [];
    }

    const sortingForTransactions = faker.helpers.arrayElements(
        sortingResults,
        Math.min(count, sortingResults.length)
    );

    for (const sorting of sortingForTransactions) {
        const partner = faker.helpers.arrayElement(recyclingPartners);
        if (partner.acceptedWasteTypes.includes(sorting.wasteType)) {
            const transaction = new RecyclingTransaction({
                sortingResultId: sorting._id,
                partnerId: partner._id,
                commission: faker.number.float({
                    min: 0.05,
                    max: 0.3,
                    fractionDigits: 2,
                }),
                status: faker.helpers.arrayElement([
                    "pending",
                    "completed",
                    "cancelled",
                ]),
            });

            recyclingTransactions.push(await transaction.save());
        }
    }

    console.log(
        `${recyclingTransactions.length} recycling transactions created`
    );
    return recyclingTransactions;
}

async function seedDatabase() {
    try {
        await connectDB();

        await Promise.all([
            User.deleteMany({}),
            Report.deleteMany({}),
            Verification.deleteMany({}),
            CleanupAction.deleteMany({}),
            Volunteer.deleteMany({}),
            SortingResult.deleteMany({}),
            ActionReport.deleteMany({}),
            RecyclingPartner.deleteMany({}),
            RecyclingTransaction.deleteMany({}),
        ]);

        console.log("Database cleared");

        const users = await seedUsers(20);
        const reports = await seedReports(users, 50);
        const verifications = await seedVerifications(reports, users, 30);
        const cleanupActions = await seedCleanupActions(reports, users, 25);
        const volunteers = await seedVolunteers(users, cleanupActions, 60);
        const sortingResults = await seedSortingResults(cleanupActions, 20);
        const actionReports = await seedActionReports(cleanupActions, 20);
        const recyclingPartners = await seedRecyclingPartners(users, 8);
        const recyclingTransactions = await seedRecyclingTransactions(
            sortingResults,
            recyclingPartners,
            30
        );

        console.log("Database seeded successfully");

        console.log("\n====== Seeding Summary ======");
        console.log(`Users: ${users.length}`);
        console.log(`Reports: ${reports.length}`);
        console.log(`Verifications: ${verifications.length}`);
        console.log(`Cleanup Actions: ${cleanupActions.length}`);
        console.log(`Volunteers: ${volunteers.length}`);
        console.log(`Sorting Results: ${sortingResults.length}`);
        console.log(`Action Reports: ${actionReports.length}`);
        console.log(`Recycling Partners: ${recyclingPartners.length}`);
        console.log(`Recycling Transactions: ${recyclingTransactions.length}`);
        console.log("============================\n");

        await mongoose.disconnect();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
