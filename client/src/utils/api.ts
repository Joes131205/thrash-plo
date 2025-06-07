import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Define TypeScript interfaces to match backend models
interface UserData {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    ktp: string;
    role?: "user" | "community" | "admin" | "DLH";
}

interface CommunityData {
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
}

interface ReportData {
    trashId: string;
    description: string;
    photo: string;
    location: {
        lat: number;
        long: number;
    };
    category: "liar" | "pantai" | "sungai";
    weightEstimation: number;
}

interface CleanupActionData {
    reportId: string;
    communityId: string;
    startDate: string | Date;
    endDate: string | Date;
    status: string;
    progressStage?:
        | "verification"
        | "scheduling"
        | "traveling"
        | "collection"
        | "sorting"
        | "shipping"
        | "completed";
    location: string;
    volunteers: number;
    max_volunteers: number;
    title: string;
}

interface SortingResultData {
    actionId: string;
    wasteType: "unorganic" | "organic";
    weight: number;
    status: "recyclable" | "residue";
}

interface ActionReportData {
    actionId: string;
    description: string;
    documentation: string;
}

interface RecyclingTransactionData {
    partnerId: string;
    sortingResultId: string;
    commission: number;
    status: "pending" | "completed" | "canceled";
}

const apiService = {
    auth: {
        login: (email: string, password: string) =>
            api.post("/api/auth/login", { email, password }),
        register: (userData: UserData) =>
            api.post("/api/auth/register", userData),
        getCurrent: () => api.get(`/api/auth/getMe`),
    },

    reports: {
        create: (reportData: ReportData) =>
            api.post("/api/reports", reportData),
        getAll: (filters?: {
            status?: "waiting" | "processing" | "done";
            category?: "liar" | "pantai" | "sungai";
            userId?: string;
        }) => api.get("/api/reports", { params: filters }),
        getById: (id: string) => api.get(`/api/reports/${id}`),
        getByUser: (userId: string) =>
            api.get("/api/reports", { params: { userId } }),
    },

    verifications: {
        getAll: (filters?: { reportId?: string; verifiedBy?: string }) =>
            api.get("/api/verifications", { params: filters }),
        verify: (id: string, result: "approved" | "rejected") =>
            api.post(`/api/verifications/${id}`, { result }),
    },

    cleanupActions: {
        getAll: () => api.get("/api/cleanup-actions"),
        getById: (id: string) => api.get(`/api/cleanup-actions/${id}`),
        create: (actionData: CleanupActionData) =>
            api.post("/api/cleanup-actions", actionData),
        updateProgressStage: (
            id: string,
            progressStage:
                | "verification"
                | "scheduling"
                | "traveling"
                | "collection"
                | "sorting"
                | "shipping"
                | "completed"
        ) =>
            api.patch(`/api/cleanup-actions/${id}/progress`, { progressStage }),
    },

    volunteers: {
        register: (actionId: string) =>
            api.post("/api/volunteers", { actionId }),
        getByAction: (actionId: string) =>
            api.get(`/api/volunteers/${actionId}`),
    },

    communities: {
        getAll: () => api.get("/api/communities"),
        getById: (id: string) => api.get(`/api/communities/${id}`),
        register: (communityData: CommunityData) =>
            api.post("/api/communities/register", communityData),
        update: (id: string, communityData: Partial<CommunityData>) =>
            api.put(`/api/communities/${id}`, communityData),
        delete: (id: string) => api.delete(`/api/communities/${id}`),
    },

    sorting: {
        getResult: (actionId: string) =>
            api.get(`/api/sorting/result/${actionId}`),
        createResult: (sortingResultData: SortingResultData) =>
            api.post("/api/sorting/result", sortingResultData),
        getReport: (actionId: string) =>
            api.get(`/api/sorting/report/${actionId}`),
        createReport: (sortingReportData: ActionReportData) =>
            api.post("/api/sorting/report", sortingReportData),
        verifySortingReport: (
            id: string,
            verificationData: { verificationStatus: boolean }
        ) => api.put(`/api/sorting/report/verify/${id}`, verificationData),
    },

    recycling: {
        getPartners: () => api.get("/api/recycling/partners"),
        createTransaction: (transactionData: RecyclingTransactionData) =>
            api.post("/api/recycling/transaction/create", transactionData),
        getTransactionHistory: (id: string, type?: string) =>
            api.get(`/api/recycling/transaction/history/${id}`, {
                params: { type },
            }),
    },

    actionReports: {
        getByAction: (actionId: string) =>
            api.get(`/api/cleanup-actions/${actionId}/reports`),
        create: (actionId: string, reportData: ActionReportData) =>
            api.post(`/api/cleanup-actions/${actionId}/reports`, reportData),
    },
};

export default apiService;
