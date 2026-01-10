"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { jobsApi, candidatesApi } from "@/lib/api";
import {
    ArrowLeft,
    Upload,
    Users,
    Sparkles,
    CheckCircle,
    XCircle,
    Clock,
    MoreVertical,
    Trash2,
    RefreshCw,
} from "lucide-react";

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const jobId = params.id as string;

    const [uploadModal, setUploadModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadForm, setUploadForm] = useState({ name: "", email: "", phone: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { data: job, isLoading: jobLoading } = useQuery({
        queryKey: ["job", jobId],
        queryFn: () => jobsApi.getOne(jobId).then((res) => res.data),
    });

    const { data: candidates, isLoading: candidatesLoading } = useQuery({
        queryKey: ["candidates", jobId],
        queryFn: () => candidatesApi.getByJob(jobId).then((res) => res.data),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            candidatesApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidates", jobId] });
        },
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"], "application/msword": [".doc", ".docx"] },
        maxFiles: 1,
    });

    const handleUpload = async () => {
        if (!selectedFile || !uploadForm.name || !uploadForm.email) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("name", uploadForm.name);
            formData.append("email", uploadForm.email);
            if (uploadForm.phone) formData.append("phone", uploadForm.phone);

            await candidatesApi.upload(jobId, formData);
            queryClient.invalidateQueries({ queryKey: ["candidates", jobId] });
            setUploadModal(false);
            setUploadForm({ name: "", email: "", phone: "" });
            setSelectedFile(null);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 70) return "text-success";
        if (score >= 40) return "text-warning";
        return "text-error";
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            new: "bg-brand-blue/20 text-brand-blue",
            reviewing: "bg-warning/20 text-warning",
            shortlisted: "bg-success/20 text-success",
            rejected: "bg-error/20 text-error",
            hired: "bg-brand-purple/20 text-brand-purple",
        };
        return styles[status] || styles.new;
    };

    if (jobLoading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="animate-in">
            {/* Back Link */}
            <Link
                href="/dashboard/jobs"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Jobs
            </Link>

            {/* Job Header */}
            <div className="glass-card p-6 mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${job?.status === "active" ? "bg-success/20 text-success" : "bg-slate-600/20 text-slate-400"
                            }`}>
                            {job?.status}
                        </div>
                        <h1 className="text-2xl font-bold mb-2">{job?.title}</h1>
                        <p className="text-slate-400">
                            {job?.location || "Remote"} • {job?.job_type} {job?.salary_range && `• ${job.salary_range}`}
                        </p>
                    </div>
                    <button
                        onClick={() => setUploadModal(true)}
                        className="btn-gradient flex items-center gap-2"
                    >
                        <Upload className="w-5 h-5" />
                        Upload Resume
                    </button>
                </div>

                {job?.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.map((skill: string) => (
                            <span key={skill} className="px-3 py-1 bg-surface-light/50 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Candidates Section */}
            <div className="glass-card">
                <div className="p-6 border-b border-surface-light/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-brand-purple" />
                        <h2 className="text-xl font-semibold">Candidates</h2>
                        <span className="px-2 py-0.5 bg-surface-light rounded-full text-sm">
                            {candidates?.length || 0}
                        </span>
                    </div>
                </div>

                {candidatesLoading ? (
                    <div className="p-12 text-center text-slate-400">Loading candidates...</div>
                ) : candidates?.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No candidates yet</h3>
                        <p className="text-slate-400 mb-4">Upload resumes to start screening candidates with AI.</p>
                        <button onClick={() => setUploadModal(true)} className="btn-gradient inline-flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload First Resume
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-surface-light/30">
                        {candidates?.map((candidate: any) => (
                            <div key={candidate.id} className="p-4 hover:bg-surface-light/10 transition">
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-semibold">
                                        {candidate.name[0]}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{candidate.name}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(candidate.status)}`}>
                                                {candidate.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400">{candidate.email}</p>
                                        {candidate.ai_summary && (
                                            <p className="text-sm text-slate-300 mt-1 line-clamp-1">{candidate.ai_summary}</p>
                                        )}
                                    </div>

                                    {/* AI Score */}
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${getScoreColor(candidate.ai_score)}`}>
                                            {candidate.ai_score}
                                        </div>
                                        <div className="text-xs text-slate-400 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            AI Score
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateStatusMutation.mutate({ id: candidate.id, status: "shortlisted" })}
                                            className="p-2 hover:bg-success/20 rounded-lg text-success transition"
                                            title="Shortlist"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => updateStatusMutation.mutate({ id: candidate.id, status: "rejected" })}
                                            className="p-2 hover:bg-error/20 rounded-lg text-error transition"
                                            title="Reject"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Skills Matched */}
                                {candidate.skills_matched?.length > 0 && (
                                    <div className="mt-3 ml-16 flex flex-wrap gap-1">
                                        {candidate.skills_matched.map((skill: string) => (
                                            <span key={skill} className="px-2 py-0.5 bg-success/20 text-success rounded text-xs">
                                                ✓ {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {uploadModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="glass-card w-full max-w-lg p-6 animate-in">
                        <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Candidate Name *</label>
                                <input
                                    type="text"
                                    value={uploadForm.name}
                                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={uploadForm.email}
                                    onChange={(e) => setUploadForm({ ...uploadForm, email: e.target.value })}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <input
                                    type="text"
                                    value={uploadForm.phone}
                                    onChange={(e) => setUploadForm({ ...uploadForm, phone: e.target.value })}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Resume File *</label>
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragActive ? "border-brand-blue bg-brand-blue/10" : "border-surface-light hover:border-brand-blue/50"
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    {selectedFile ? (
                                        <div>
                                            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                                            <p className="font-medium">{selectedFile.name}</p>
                                            <p className="text-sm text-slate-400">Click to change file</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                            <p>Drag & drop a PDF or Word document</p>
                                            <p className="text-sm text-slate-400">or click to browse</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleUpload}
                                disabled={uploading || !selectedFile || !uploadForm.name || !uploadForm.email}
                                className="btn-gradient flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {uploading ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Upload & Analyze
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setUploadModal(false)}
                                className="px-6 py-3 border border-surface-light rounded-lg hover:bg-surface-light/20"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
