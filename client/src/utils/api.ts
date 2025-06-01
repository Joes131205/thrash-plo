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
const apiService = {
    // Auth services
    auth: {
        login: (email: string, password: string) =>
            api.post("/api/auth/login", { email, password }),
        register: (userData: any) => api.post("/api/auth/register", userData),
        getCurrent: () => api.get("/api/auth/getMe"),
    },

    reports: {
        create: (reportData: any) => api.post("/api/reports", reportData),
        getAll: (filters?: {
            status?: string;
            category?: string;
            userId?: string;
        }) => api.get("/api/reports", { params: filters }),
        getById: (id: string) => api.get(`/api/reports/${id}`),
        getByUser: (userId: string) =>
            api.get("/api/reports", { params: { userId } }),
    },

    verifications: {
        getAll: (filters?: { reportId?: string; verifiedBy?: string }) =>
            api.get("/api/verifications", { params: filters }),
        verify: (id: string, result: string) =>
            api.post(`/api/verifications/${id}`, { result }),
    },

    cleanupActions: {
        getAll: () => api.get("/api/cleanup-actions"),
        getById: (id: string) => api.get(`/api/cleanup-actions/${id}`),
        create: (actionData: any) =>
            api.post("/api/cleanup-actions", actionData),
        updateProgressStage: (id: string, progressStage: string) =>
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
        register: (communityData: Record<string, unknown>) =>
            api.post("/api/communities/register", communityData),
        update: (id: string, communityData: Record<string, unknown>) =>
            api.put(`/api/communities/${id}`, communityData),
        delete: (id: string) => api.delete(`/api/communities/${id}`),
    },

    sorting: {
        getResult: (actionId: string) =>
            api.get(`/api/sorting/result/${actionId}`),
        createResult: (sortingResultData: Record<string, unknown>) =>
            api.post("/api/sorting/result", sortingResultData),
        getReport: (actionId: string) =>
            api.get(`/api/sorting/report/${actionId}`),
        createReport: (sortingReportData: Record<string, unknown>) =>
            api.post("/api/sorting/report", sortingReportData),
        verifySortingReport: (
            id: string,
            verificationData: Record<string, unknown>
        ) => api.put(`/api/sorting/report/verify/${id}`, verificationData),
    },

    recycling: {
        getPartners: () => api.get("/api/recycling/partners"),
        createTransaction: (transactionData: Record<string, unknown>) =>
            api.post("/api/recycling/transaction/create", transactionData),
        getTransactionHistory: (id: string, type?: string) =>
            api.get(`/api/recycling/transaction/history/${id}`, {
                params: { type },
            }),
    },

    actionReports: {
        getByAction: (actionId: string) =>
            api.get(`/api/cleanup-actions/${actionId}/reports`),
        create: (actionId: string, reportData: Record<string, unknown>) =>
            api.post(`/api/cleanup-actions/${actionId}/reports`, reportData),
    },
};

export default apiService;
