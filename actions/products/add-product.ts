"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { AddProductSchema } from "@/schemas/products";
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = async (values: z.infer<typeof AddProductSchema>) => {
    const validatedFields = AddProductSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: "Podano nieprawidłowe pola!" };
    }

    const adminID = validatedFields.data.adminID
    const admin = await getUserById(adminID);

    if (!admin) {
        return { success: false, message: "Nie ma takiego admina!"}
    }

    if (admin.role !== "ADMIN") {
        return { success: false, message: "Nie masz uprawnień do dodania produktu!"}
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

    const productID = uuidv4()

    try {
        await db.product.create({
            data: {
                id: productID,
                title: title,
                owner: {
                    connect: { id: ownerID }
                },
            }
        })
        return { success: true, message: "Dodano Produkt!"}
    } catch(error) {
        console.error(error)
        return { success: false, message: "Nie udało się dodać produktu!"}
    }
}
export default AddProduct;