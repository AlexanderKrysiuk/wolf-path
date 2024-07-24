"use server";

import * as z from "zod";
import { ProductSchema } from "@/schemas/products";
import { db } from '@/lib/db';
import { getUserById } from "@/data/user";

export const CreateProduct = async (values: z.infer<typeof ProductSchema>) => {
    // Walidacja danych
    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Podano nieprawidłowe pola!" };
    }

    const { owner: ownerID, title } = validatedFields.data;

    if (!ownerID) {
        return { error: "Podano nieprawidłowe ID właściciela produktu" };
    }

    const existingOwner = await getUserById(ownerID);
    if (!existingOwner) {
        return { error: "Użytkownik, do którego próbujesz przypisać produkt, nie istnieje" };
    }

    try {
        await db.product.create({
            data: {
                title,
                owner: {
                    connect: { id: ownerID }
                },
            },
        });
        return { success: "Produkt został pomyślnie dodany!" };
    } catch (error) {
        return { error: `Wystąpił błąd podczas dodawania produktu` };
    }
}