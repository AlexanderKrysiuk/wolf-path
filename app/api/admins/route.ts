import { NextResponse } from "next/server"
import { db } from "@/lib/db";

export async function GET() {
    try {
        const admins = await db.user.findMany({
            where: {
                role: "ADMIN",
            },
            select: {
                id: true,
                name: true,
            }
        });
        return NextResponse.json(admins)
    } catch(error) {
        return NextResponse.json({ message: "Błąd poczas ładowania listy adminów", error: error })
    }
}