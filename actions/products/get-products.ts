import { db } from "@/lib/db"

export const getProducts = async () => {
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
    return products;
}