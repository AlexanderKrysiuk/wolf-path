import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const products = await db.product.findMany({
            include: {
                owner: {
                    select: {
                        id: true, // Wybiera tylko ID użytkownika
                        name: true // Wybiera tylko nazwę użytkownika
                    }
                }
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("[PRODUCTS ERROR]", error);
        return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
    }
}