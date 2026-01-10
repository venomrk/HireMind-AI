"use client";

import { useAuthStore } from "@/lib/store";
import { Crown, Mail, Building, User } from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuthStore();

    return (
        <div className="max-w-3xl animate-in">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-slate-400 mb-8">Manage your account and subscription.</p>

            {/* Profile Section */}
            <div className="glass-card p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Profile</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-2xl font-bold text-white">
                            {user?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{user?.full_name || "User"}</h3>
                            <p className="text-slate-400">{user?.company_name || "No company"}</p>
                        </div>
                    </div>

                    <div className="grid gap-4 pt-4">
                        <div className="flex items-center gap-3 p-4 bg-surface-light/30 rounded-lg">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <div>
                                <div className="text-sm text-slate-400">Email</div>
                                <div>{user?.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-surface-light/30 rounded-lg">
                            <Building className="w-5 h-5 text-slate-400" />
                            <div>
                                <div className="text-sm text-slate-400">Company</div>
                                <div>{user?.company_name || "Not set"}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-surface-light/30 rounded-lg">
                            <User className="w-5 h-5 text-slate-400" />
                            <div>
                                <div className="text-sm text-slate-400">Role</div>
                                <div className="capitalize">{user?.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Subscription</h2>
                <div className="p-6 rounded-lg bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-purple/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Crown className="w-6 h-6 text-brand-purple" />
                        <span className="text-xl font-semibold capitalize">{user?.subscription_tier || "Free"} Plan</span>
                    </div>

                    {user?.subscription_tier === "free" ? (
                        <>
                            <p className="text-slate-400 mb-4">
                                You're on the free plan. Upgrade to unlock more features.
                            </p>
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-warning">•</span> 1 Job Post
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-warning">•</span> 50 Resumes/month
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-warning">•</span> Basic AI Parsing
                                </div>
                            </div>
                            <button className="btn-gradient">Upgrade to Pro</button>
                        </>
                    ) : (
                        <>
                            <p className="text-slate-400 mb-4">
                                You have full access to all features.
                            </p>
                            <button className="px-4 py-2 border border-surface-light rounded-lg hover:bg-surface-light/20">
                                Manage Subscription
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
