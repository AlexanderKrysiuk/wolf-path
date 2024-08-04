"use server"
import { db } from "@/lib/db"

export const GetProductsWithOwner = async () => {
    try {
        const products = await db.product.findMany({
            include: {
                owner: {
                    select: {
                        id: true,      // Wybierz id właściciela
                        name: true     // Wybierz name właściciela
                    }
                }
            },
        });
        return products;
    } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
        throw error; // Przekaż błąd dalej
    }
};

export const GetProducts = async () => {
    try {
        const products = await db.product.findMany({
            select: {
                id: true,
                title: true
            }
        })
        return products
    } catch(error) {
        console.error("Błąd podczas pobierania produktów:", error);
        throw error; // Przekaż błąd dalej
    }
}