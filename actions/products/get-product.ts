"use server"
import { db } from "@/lib/db"

export const GetProductByID = async (id: string) => {
    try {
        const product = await db.product.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,      // Wybierz id właściciela
                        name: true     // Wybierz name właściciela
                    }
                }
            },
        });
        return product;
    } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
        throw error; // Przekaż błąd dalej
    }
};