"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { EditProductSchema } from "@/schemas/products";
import * as z from 'zod';
import { GetProductByID } from "./get-product";

const EditProduct = async (values: z.infer<typeof EditProductSchema>) => {
    const validatedFields = EditProductSchema.safeParse(values);

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
        return { success: false, message: "Nie masz uprawnień do edytowania produktu!"}
    }

    const ownerID = validatedFields.data.ownerID
    const owner = await getUserById(ownerID)

    if (!owner) {
        return { success: false, message: "Nie ma takiego właściciela!"}
    }

    if (owner.role !== "ADMIN") {
        return { success: false, message: "Tylko admin może posiadać produkt!"}
    }

    const title = validatedFields.data.title

    if (!title) {
        return { success: false, message: "Produkt musi mieć poprawny tytuł!"}
    }

    try {
        await db.product.update({
            where: { id: productID },
            data: {
                title: title,
                owner: {
                    connect: { id: ownerID }
                },
            }
        })
        return { success: true, message: "Zaktualizowano Produkt!"}
    } catch(error) {
        console.error(error)
        return { success: false, message: "Nie udało się zaktualizować produktu!"}
    }
}
export default EditProduct;