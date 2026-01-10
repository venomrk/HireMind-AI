"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { jobsApi } from "@/lib/api";
import { Plus, Briefcase, Users, MapPin, Clock } from "lucide-react";

export default function JobsPage() {
    const { data: jobs, isLoading } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => jobsApi.getAll().then((res) => res.data),
    });

    return (
        <div className="animate-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Jobs</h1>
                    <p className="text-slate-400">Manage your job postings and candidates.</p>
                </div>
                <Link href="/dashboard/jobs/new" className="btn-gradient flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    New Job
                </Link>
            </div>

            {/* Jobs Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="glass-card p-6 animate-pulse">
                            <div className="h-6 bg-surface-light rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-surface-light rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-surface-light rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : jobs?.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No jobs created yet</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                        Create your first job posting to start receiving and screening candidates with AI.
                    </p>
                    <Link href="/dashboard/jobs/new" className="btn-gradient inline-flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Create Your First Job
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs?.map((job: any) => (
                        <Link
                            key={job.id}
                            href={`/dashboard/jobs/${job.id}`}
                            className="glass-card p-6 hover:border-brand-blue/50 transition group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === "active"
                                            ? "bg-success/20 text-success"
                                            : job.status === "paused"
                                                ? "bg-warning/20 text-warning"
                                                : "bg-slate-600/20 text-slate-400"
                                        }`}
                                >
                                    {job.status}
                                </div>
                                <div className="flex items-center gap-1 text-brand-purple">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{job.candidate_count || 0}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-blue transition">
                                {job.title}
                            </h3>

                            <div className="space-y-2 text-sm text-slate-400">
                                {job.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {job.location}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {job.job_type}
                                </div>
                            </div>

                            {job.skills?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {job.skills.slice(0, 3).map((skill: string) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-1 bg-surface-light/50 rounded text-xs text-slate-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {job.skills.length > 3 && (
                                        <span className="px-2 py-1 text-xs text-slate-400">
                                            +{job.skills.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
