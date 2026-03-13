import { NextRequest, NextResponse } from "next/server";
import { insertContact } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, email, phone, company, role, message, ...rest } = body;

        // Basic validation
        if (!name || !email || !role) {
            return NextResponse.json(
                { error: "Name, email, and role are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Extract role-specific data
        const roleSpecificData: Record<string, string> = {};
        const roleFields: Record<string, string[]> = {
            founder: ["fundingStage", "teamSize", "industry"],
            investor: ["investmentRange", "investmentStage", "sectorsOfInterest"],
            enabler: ["organizationType", "programType", "supportServices"],
        };

        const fields = roleFields[role] || [];
        for (const field of fields) {
            if (rest[field]) {
                roleSpecificData[field] = rest[field];
            }
        }

        const contact = await insertContact({
            name,
            email,
            phone: phone || "",
            company: company || "",
            role,
            message: message || "",
            roleSpecificData,
        });

        return NextResponse.json(
            { message: "Message sent successfully!", contact },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving contact:", error);
        return NextResponse.json(
            { error: "Failed to save your message. Please try again." },
            { status: 500 }
        );
    }
}
