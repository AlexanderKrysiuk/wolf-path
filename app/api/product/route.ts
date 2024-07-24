import { auth } from "@/auth"
import { getUserById } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const { title, ownerId } = await req.json();
        const product = await db.product.create({
            data: {
                title,
                ownerId,
            }
        });
        
        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT]", error)
        return new NextResponse("Wewnętrzny Błąd", { status: 500 })
    }
}