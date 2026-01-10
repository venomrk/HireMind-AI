"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import {
    Sparkles,
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    LogOut,
    Crown,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        // Check auth on client side
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass-card border-r border-surface-light/30 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-surface-light/30">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold">HireMind</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                        ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/30"
                                        : "text-slate-400 hover:bg-surface-light/50 hover:text-white"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-surface-light/30">
                    {/* Plan Badge */}
                    <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-purple/20">
                        <div className="flex items-center gap-2 text-sm">
                            <Crown className="w-4 h-4 text-brand-purple" />
                            <span className="font-medium capitalize">{user?.subscription_tier || "Free"} Plan</span>
                        </div>
                        {user?.subscription_tier === "free" && (
                            <Link
                                href="/dashboard/upgrade"
                                className="text-xs text-brand-blue hover:underline mt-1 block"
                            >
                                Upgrade for more features →
                            </Link>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-semibold">
                            {user?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{user?.full_name || "User"}</div>
                            <div className="text-xs text-slate-400 truncate">{user?.email}</div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-slate-400 hover:text-error hover:bg-error/10 rounded-lg transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
