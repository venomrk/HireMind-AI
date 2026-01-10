"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { jobsApi } from "@/lib/api";
import { ArrowLeft, Sparkles, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";

export default function NewJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [skillInput, setSkillInput] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        skills: [] as string[],
        location: "",
        salary_range: "",
        job_type: "full-time",
    });

    const createMutation = useMutation({
        mutationFn: (data: any) => jobsApi.create(data),
        onSuccess: (res) => {
            router.push(`/dashboard/jobs/${res.data.id}`);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createMutation.mutateAsync(formData);
        } catch (error) {
            console.error("Failed to create job:", error);
        } finally {
            setLoading(false);
        }
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
    };

    return (
        <div className="max-w-3xl mx-auto animate-in">
            {/* Back Link */}
            <Link
                href="/dashboard/jobs"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Jobs
            </Link>

            <div className="glass-card p-8">
                <h1 className="text-2xl font-bold mb-2">Create New Job</h1>
                <p className="text-slate-400 mb-8">
                    Fill in the details below to create a new job posting.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Job Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Senior React Developer"
                            required
                        />
                    </div>

                    {/* Location & Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g., Remote, New York"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Job Type</label>
                            <select
                                value={formData.job_type}
                                onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Salary Range</label>
                        <input
                            type="text"
                            value={formData.salary_range}
                            onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                            placeholder="e.g., $80,000 - $120,000"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Required Skills</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                placeholder="Type a skill and press Enter"
                                className="flex-1"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="px-4 py-2 bg-surface-light hover:bg-surface-light/80 rounded-lg"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        {formData.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-brand-blue/20 text-brand-blue rounded-full text-sm"
                                    >
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(skill)}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Job Description</label>
                            <button
                                type="button"
                                onClick={async () => {
                                    if (!formData.title) return;
                                    setGenerating(true);
                                    // AI generation would go here
                                    setTimeout(() => {
                                        setFormData({
                                            ...formData,
                                            description: `We are looking for a talented ${formData.title} to join our team. The ideal candidate will have experience with ${formData.skills.join(", ") || "relevant technologies"}.`,
                                        });
                                        setGenerating(false);
                                    }, 1000);
                                }}
                                disabled={!formData.title || generating}
                                className="inline-flex items-center gap-1 text-sm text-brand-purple hover:underline disabled:opacity-50"
                            >
                                <Sparkles className="w-4 h-4" />
                                {generating ? "Generating..." : "Generate with AI"}
                            </button>
                        </div>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the role, responsibilities, and what you're looking for..."
                            rows={6}
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Requirements</label>
                        <textarea
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            placeholder="List the requirements and qualifications..."
                            rows={4}
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading || !formData.title}
                            className="btn-gradient flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Job"
                            )}
                        </button>
                        <Link
                            href="/dashboard/jobs"
                            className="px-6 py-3 border border-surface-light rounded-lg hover:bg-surface-light/20"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
