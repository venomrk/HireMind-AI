"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { Sparkles, Mail, Lock, User, Building, ArrowRight, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const { setAuth } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        full_name: "",
        company_name: "",
    });
    const [error, setError] = useState("");

    const registerMutation = useMutation({
        mutationFn: (data: typeof formData) => authApi.register(data),
        onSuccess: async () => {
            // Auto-login after registration
            const loginData = new URLSearchParams();
            loginData.append("username", formData.email);
            loginData.append("password", formData.password);

            const loginRes = await authApi.login(loginData);
            const token = loginRes.data.access_token;
            localStorage.setItem("token", token);

            const userRes = await authApi.me();
            setAuth(userRes.data, token);
            router.push("/dashboard");
        },
        onError: (err: any) => {
            setError(err.response?.data?.detail || "Registration failed. Please try again.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        registerMutation.mutate(formData);
    };

    const features = [
        "AI-powered resume screening",
        "Smart candidate ranking",
        "Automated email workflows",
        "Analytics dashboard",
    ];

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Background */}
            <div className="hero-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="grid-pattern"></div>
            </div>

            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative">
                <Link href="/" className="flex items-center gap-3 z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center glow">
                        <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold">HireMind <span className="text-brand-blue">AI</span></span>
                </Link>

                <div className="z-10">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Start hiring
                        <span className="gradient-text block">smarter today</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-md">
                        Join thousands of companies using AI to find the perfect candidates faster.
                    </p>

                    <div className="space-y-4">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-slate-500 text-sm z-10">
                    © 2024 RKO Labs. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link href="/" className="flex items-center gap-3 mb-12 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">HireMind AI</span>
                    </Link>

                    <div className="glass-card p-8 md:p-10">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Create account</h2>
                            <p className="text-slate-400">
                                Already have an account?{" "}
                                <Link href="/login" className="text-brand-blue hover:underline font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm animate-in">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            placeholder="John Doe"
                                            className="pl-12"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">Company</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                            placeholder="Acme Inc"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@company.com"
                                        className="pl-12"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Min 8 characters"
                                        className="pl-12 pr-12"
                                        minLength={8}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <input type="checkbox" className="w-4 h-4 mt-1 rounded border-slate-600 bg-slate-700" required />
                                <span className="text-sm text-slate-400">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-brand-blue hover:underline">Terms of Service</Link>
                                    {" "}and{" "}
                                    <Link href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="btn-gradient w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {registerMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <p className="text-center text-sm text-slate-400 mb-4">Or sign up with</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="btn-secondary py-3 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    Google
                                </button>
                                <button className="btn-secondary py-3 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
