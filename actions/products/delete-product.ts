"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { DeleteProductSchema } from "@/schemas/products";
import * as z from 'zod';
import { GetProductByID } from "./get-product";

const DeleteProduct = async (values: z.infer<typeof DeleteProductSchema>) => {
    const validatedFields = DeleteProductSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: "Podano nieprawidłowe pola!" };
    }

    const productID = validatedFields.data.id
    const product = await GetProductByID(productID)

    if (!product) {
        return { success: false, message: "Nie ma takiego produktu!"}
    }

    const adminID = validatedFields.data.adminID
    const admin = await getUserById(adminID);

    if (!admin) {
        return { success: false, message: "Nie ma takiego admina!"}
    }

    if (admin.role !== "ADMIN") {
        return { success: false, message: "Nie masz uprawnień do usunięcia produktu!"}
    }

    try {
        await db.product.delete({
            where: { id: productID }
        })
        return { success: true, message: "Usunięto Produkt!"}
    } catch(error) {
        console.error(error)
        return { success: false, message: "Nie udało się usunąć produktu!"}
    }
}
export default DeleteProduct;