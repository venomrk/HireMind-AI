"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Sparkles,
    Users,
    Clock,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Zap,
    Shield,
    BarChart3,
    Mail,
    Star,
    Play
} from "lucide-react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [end, duration]);

    return count;
}

// Stats component with counters
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const count = useCounter(value, 2500);
    return (
        <div className="text-center group">
            <div className="text-5xl md:text-6xl font-bold stat-value mb-2 group-hover:scale-110 transition-transform duration-300">
                {count}{suffix}
            </div>
            <div className="text-slate-400 text-sm uppercase tracking-wider">{label}</div>
        </div>
    );
}

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen relative">
            {/* Animated Background */}
            <div className="hero-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <div className="grid-pattern"></div>
            </div>

            {/* Cursor Glow Effect */}
            <div
                className="cursor-glow hidden md:block"
                style={{ left: mousePos.x, top: mousePos.y }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold">HireMind <span className="text-brand-blue">AI</span></span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-slate-400 hover:text-white transition-colors duration-300">Features</Link>
                        <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors duration-300">Pricing</Link>
                        <Link href="#testimonials" className="text-slate-400 hover:text-white transition-colors duration-300">Testimonials</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-slate-300 hover:text-white transition-colors duration-300 hidden sm:block">
                            Login
                        </Link>
                        <Link href="/register" className="btn-gradient">
                            <span className="flex items-center gap-2">
                                Get Started <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-32 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center stagger-children">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-8">
                            <span className="ai-badge">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered Recruitment Platform
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">
                            <span className="block">Hire Smarter,</span>
                            <span className="gradient-text">Not Harder</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Automate resume screening, rank candidates with AI, and
                            <span className="text-white font-medium"> reduce your time-to-hire by 70%</span>.
                            Let HireMind find the perfect match for every role.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/register" className="btn-gradient text-lg px-10 py-4 w-full sm:w-auto">
                                <span className="flex items-center justify-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    Start Free Trial
                                </span>
                            </Link>
                            <Link
                                href="#demo"
                                className="btn-secondary flex items-center gap-2 px-8 py-4 w-full sm:w-auto justify-center"
                            >
                                <Play className="w-5 h-5" />
                                Watch Demo
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                SOC 2 Compliant
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5" />
                                4.9/5 Rating
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                2,000+ Companies
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 relative">
                <div className="section-divider mb-24"></div>
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
                    <StatCounter value={70} suffix="%" label="Faster Hiring" />
                    <StatCounter value={10} suffix="K+" label="Resumes Analyzed" />
                    <StatCounter value={95} suffix="%" label="Accuracy Rate" />
                    <StatCounter value={24} suffix="/7" label="AI Available" />
                </div>
                <div className="section-divider mt-24"></div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="ai-badge mb-4">
                            <Sparkles className="w-4 h-4" />
                            Powerful Features
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Everything You Need to
                            <span className="gradient-text"> Hire Better</span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            From resume parsing to candidate communication, HireMind handles it all with AI precision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 stagger-children">
                        {[
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "AI Resume Screening",
                                description: "Upload resumes and get instant AI-powered analysis with skill matching, experience evaluation, and cultural fit scoring.",
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8" />,
                                title: "Smart Ranking",
                                description: "Candidates are automatically ranked by match score. Focus on the best talent first with our intelligent scoring algorithm.",
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                icon: <Mail className="w-8 h-8" />,
                                title: "Automated Emails",
                                description: "Send personalized updates to candidates automatically based on their status. Keep everyone in the loop effortlessly.",
                                color: "from-orange-500 to-red-500"
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8" />,
                                title: "Analytics Dashboard",
                                description: "Track your hiring funnel, time-to-hire metrics, and source effectiveness with beautiful, actionable charts.",
                                color: "from-green-500 to-emerald-500"
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: "Bias Detection",
                                description: "Our AI is trained to identify and reduce unconscious bias in candidate evaluation, promoting fair hiring practices.",
                                color: "from-indigo-500 to-violet-500"
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "One-Click Scheduling",
                                description: "Integrate with your calendar and let candidates pick available slots. No more back-and-forth emails.",
                                color: "from-amber-500 to-yellow-500"
                            },
                        ].map((feature, idx) => (
                            <div
                                key={feature.title}
                                className="glass-card feature-card p-8 group"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4 group-hover:text-brand-blue transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden glow">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Ready to Transform Your Hiring?
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of companies using HireMind AI to find the perfect candidates faster.
                            </p>
                            <Link href="/register" className="btn-gradient text-lg px-10 py-4 inline-flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Start Free - No Credit Card Required
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="ai-badge mb-4">
                            <Sparkles className="w-4 h-4" />
                            Pricing
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Simple, <span className="gradient-text">Transparent</span> Pricing
                        </h2>
                        <p className="text-slate-400 text-xl">
                            Start free and scale as you grow. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                period: "forever",
                                features: ["1 Job Post", "50 Resumes/month", "Basic AI Parsing", "Email Support"],
                                cta: "Get Started",
                                popular: false,
                            },
                            {
                                name: "Pro",
                                price: "$99",
                                period: "/month",
                                features: ["5 Active Jobs", "500 Resumes/month", "Advanced AI Ranking", "Automated Emails", "Custom Templates", "Priority Support"],
                                cta: "Start Free Trial",
                                popular: true,
                            },
                            {
                                name: "Business",
                                price: "$299",
                                period: "/month",
                                features: ["20 Active Jobs", "Unlimited Resumes", "Team Access (5 seats)", "ATS Integration", "API Access", "Dedicated Manager"],
                                cta: "Contact Sales",
                                popular: false,
                            },
                        ].map((plan, idx) => (
                            <div
                                key={plan.name}
                                className={`glass-card p-8 relative ${plan.popular ? "pricing-highlight md:scale-105" : ""}`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="ai-badge">
                                            <Star className="w-3 h-3" />
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                    <span className="text-slate-400 text-lg">{plan.period}</span>
                                </div>
                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className={`block text-center py-4 rounded-xl font-semibold transition-all duration-300 ${plan.popular
                                            ? "btn-gradient"
                                            : "btn-secondary"
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="ai-badge mb-4">
                            <Star className="w-4 h-4" />
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Loved by <span className="gradient-text">HR Teams</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 stagger-children">
                        {[
                            {
                                quote: "HireMind AI cut our screening time by 80%. We now focus on interviewing, not sorting resumes.",
                                author: "Sarah Johnson",
                                role: "Head of Talent, TechCorp",
                                avatar: "S"
                            },
                            {
                                quote: "The AI ranking is incredibly accurate. It surfaces candidates we would have missed manually.",
                                author: "Michael Chen",
                                role: "HR Director, StartupXYZ",
                                avatar: "M"
                            },
                            {
                                quote: "Finally, a recruitment tool that actually uses AI properly. Not just a buzzword.",
                                author: "Emily Rodriguez",
                                role: "Recruiter, Enterprise Inc",
                                avatar: "E"
                            },
                        ].map((testimonial, idx) => (
                            <div
                                key={testimonial.author}
                                className="glass-card p-8"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.author}</div>
                                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Start Hiring <span className="gradient-text">Smarter</span> Today
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        Join 2,000+ companies that trust HireMind AI to find their next great hire.
                    </p>
                    <Link href="/register" className="btn-gradient text-xl px-12 py-5 inline-flex items-center gap-3">
                        <Sparkles className="w-6 h-6" />
                        Get Started Free
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">HireMind AI</span>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                AI-powered recruitment platform that helps you hire smarter, not harder.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                                <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Integrations</Link></li>
                                <li><Link href="#" className="hover:text-white transition">API</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Security</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-divider mb-8"></div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
                        <p>© 2024 RKO Labs. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-white transition">Twitter</Link>
                            <Link href="#" className="hover:text-white transition">LinkedIn</Link>
                            <Link href="#" className="hover:text-white transition">GitHub</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
