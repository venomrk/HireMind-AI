"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { jobsApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import {
    Briefcase,
    Users,
    TrendingUp,
    Clock,
    Plus,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuthStore();

    const { data: jobs, isLoading } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => jobsApi.getAll().then((res) => res.data),
    });

    const stats = {
        totalJobs: jobs?.length || 0,
        activeJobs: jobs?.filter((j: any) => j.status === "active").length || 0,
        totalCandidates: jobs?.reduce((sum: number, j: any) => sum + (j.candidate_count || 0), 0) || 0,
        avgScore: 0,
    };

    return (
        <div className="animate-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.full_name?.split(" ")[0] || "there"}! 👋
                </h1>
                <p className="text-slate-400">
                    Here's what's happening with your hiring pipeline.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { icon: Briefcase, label: "Total Jobs", value: stats.totalJobs, color: "brand-blue" },
                    { icon: TrendingUp, label: "Active Jobs", value: stats.activeJobs, color: "success" },
                    { icon: Users, label: "Total Candidates", value: stats.totalCandidates, color: "brand-purple" },
                    { icon: Clock, label: "Avg. Time to Hire", value: "5 days", color: "warning" },
                ].map((stat) => (
                    <div key={stat.label} className="glass-card p-6">
                        <div className={`w-12 h-12 rounded-lg bg-${stat.color}/20 flex items-center justify-center mb-4`}>
                            <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                        <div className="text-slate-400 text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Create Job CTA */}
                <Link
                    href="/dashboard/jobs/new"
                    className="glass-card p-6 hover:border-brand-blue/50 transition group"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="ai-badge">
                                    <Sparkles className="w-3 h-3" />
                                    AI-Powered
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Post a New Job</h3>
                            <p className="text-slate-400">
                                Create a job posting and let AI help you find the best candidates.
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center group-hover:bg-brand-blue transition">
                            <Plus className="w-6 h-6 text-brand-blue group-hover:text-white transition" />
                        </div>
                    </div>
                </Link>

                {/* Upload Resume CTA */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-2">Quick Stats</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Shortlisted Today</span>
                            <span className="font-semibold">0</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Pending Review</span>
                            <span className="font-semibold">{stats.totalCandidates}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">This Week's Hires</span>
                            <span className="font-semibold">0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Jobs */}
            <div className="glass-card">
                <div className="p-6 border-b border-surface-light/30 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Jobs</h2>
                    <Link
                        href="/dashboard/jobs"
                        className="text-brand-blue hover:underline flex items-center gap-1 text-sm"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center text-slate-400">Loading...</div>
                ) : jobs?.length === 0 ? (
                    <div className="p-12 text-center">
                        <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No jobs yet</h3>
                        <p className="text-slate-400 mb-4">
                            Create your first job posting to start receiving candidates.
                        </p>
                        <Link href="/dashboard/jobs/new" className="btn-gradient inline-flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Create Job
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-surface-light/30">
                        {jobs?.slice(0, 5).map((job: any) => (
                            <Link
                                key={job.id}
                                href={`/dashboard/jobs/${job.id}`}
                                className="flex items-center justify-between p-4 hover:bg-surface-light/20 transition"
                            >
                                <div>
                                    <h3 className="font-medium">{job.title}</h3>
                                    <p className="text-sm text-slate-400">
                                        {job.location || "Remote"} • {job.job_type}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="font-semibold">{job.candidate_count || 0}</div>
                                        <div className="text-xs text-slate-400">Candidates</div>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === "active"
                                                ? "bg-success/20 text-success"
                                                : "bg-slate-600/20 text-slate-400"
                                            }`}
                                    >
                                        {job.status}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
