import Link from "next/link";
import { Sparkles, Users, Clock, TrendingUp, CheckCircle } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-surface-light/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold">HireMind AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-text-muted hover:text-white transition">
                            Login
                        </Link>
                        <Link href="/register" className="btn-gradient">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-surface px-4 py-2 rounded-full mb-8 ai-badge">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Recruitment</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Hire Smarter,
                        <br />
                        <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                            Not Harder
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Automate resume screening, rank candidates with AI, and reduce your time-to-hire by 70%.
                        Let HireMind find the perfect match.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="btn-gradient text-lg px-8 py-4">
                            Start Free Trial
                        </Link>
                        <Link href="#features" className="px-8 py-4 border border-surface-light rounded-lg hover:bg-surface transition">
                            See How It Works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-y border-surface-light/30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "70%", label: "Faster Hiring" },
                        { value: "10K+", label: "Resumes Analyzed" },
                        { value: "95%", label: "Accuracy Rate" },
                        { value: "24/7", label: "AI Available" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-4xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-slate-400 mt-2">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Everything You Need to Hire
                    </h2>
                    <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                        From resume parsing to candidate communication, HireMind handles it all.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "AI Resume Screening",
                                description: "Upload resumes and get instant AI-powered analysis with skill matching and experience evaluation."
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8" />,
                                title: "Smart Ranking",
                                description: "Candidates are automatically ranked by match score, so you focus on the best talent first."
                            },
                            {
                                icon: <Clock className="w-8 h-8" />,
                                title: "Automated Emails",
                                description: "Send personalized updates to candidates automatically based on their status."
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="glass-card p-8 hover:border-brand-blue/50 transition">
                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 flex items-center justify-center mb-6 text-brand-blue">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 px-6 bg-surface-dark/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-slate-400 text-center mb-16">
                        Start free and scale as you grow.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                period: "forever",
                                features: ["1 Job Post", "50 Resumes/month", "Basic AI Parsing", "Manual Emails"],
                                cta: "Get Started",
                                popular: false,
                            },
                            {
                                name: "Pro",
                                price: "$99",
                                period: "/month",
                                features: ["5 Active Jobs", "500 Resumes/month", "Advanced AI Ranking", "Automated Emails", "Custom Templates"],
                                cta: "Start Trial",
                                popular: true,
                            },
                            {
                                name: "Business",
                                price: "$299",
                                period: "/month",
                                features: ["20 Active Jobs", "Unlimited Resumes", "Team Access", "ATS Integration", "Priority Support"],
                                cta: "Contact Sales",
                                popular: false,
                            },
                        ].map((plan) => (
                            <div
                                key={plan.name}
                                className={`glass-card p-8 relative ${plan.popular ? "border-brand-blue ring-2 ring-brand-blue/20" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 ai-badge">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-slate-400">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-success" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className={`block text-center py-3 rounded-lg font-semibold transition ${plan.popular
                                            ? "btn-gradient"
                                            : "border border-surface-light hover:bg-surface"
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-surface-light/30">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">HireMind AI</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                        © 2024 RKO Labs. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
