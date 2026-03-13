import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllContacts, markAsRead, getStats } from "@/lib/db";

export async function GET() {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const contacts = await getAllContacts();
        const stats = await getStats();
        return NextResponse.json({ contacts, stats }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Message ID is required" },
                { status: 400 }
            );
        }

        const updated = await markAsRead(id);
        if (!updated) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Marked as read" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json(
            { error: "Failed to update message" },
            { status: 500 }
        );
    }
}
