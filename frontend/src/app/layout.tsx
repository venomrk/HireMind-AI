import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "HireMind AI - AI-Powered Recruitment Platform",
    description: "Automate your hiring process with AI. Screen resumes, rank candidates, and hire faster.",
    keywords: "AI recruitment, resume screening, hiring automation, HR tech",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
