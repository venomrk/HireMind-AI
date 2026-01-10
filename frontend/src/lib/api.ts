import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    register: (data: { email: string; password: string; full_name?: string; company_name?: string }) =>
        api.post("/auth/register", data),
    login: (data: { email: string; password: string }) =>
        api.post("/auth/login", data),
    me: () => api.get("/auth/me"),
};

// Jobs API
export const jobsApi = {
    getAll: (status?: string) =>
        api.get("/jobs", { params: { status_filter: status } }),
    getOne: (id: string) => api.get(`/jobs/${id}`),
    create: (data: any) => api.post("/jobs", data),
    update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
    delete: (id: string) => api.delete(`/jobs/${id}`),
    generateDescription: (id: string) =>
        api.post(`/jobs/${id}/generate-description`),
};

// Candidates API
export const candidatesApi = {
    getByJob: (jobId: string, status?: string, sortBy?: string) =>
        api.get(`/candidates/job/${jobId}`, {
            params: { status_filter: status, sort_by: sortBy },
        }),
    getOne: (id: string) => api.get(`/candidates/${id}`),
    upload: (jobId: string, formData: FormData) =>
        api.post(`/candidates/job/${jobId}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    updateStatus: (id: string, status: string) =>
        api.put(`/candidates/${id}/status`, { status }),
    reanalyze: (id: string) => api.post(`/candidates/${id}/reanalyze`),
    delete: (id: string) => api.delete(`/candidates/${id}`),
};

export default api;
