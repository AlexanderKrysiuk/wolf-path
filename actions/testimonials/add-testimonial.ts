"use server"
import { getUserById } from "@/data/user";
import { AddTestimonialSchema } from "@/schemas/testimonials";
import * as z from 'zod'
import { GetProductByID } from "../products/get-product";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

const AddTestimonial = async (values: z.infer<typeof AddTestimonialSchema>) => {
    const validatedFields = AddTestimonialSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: "Podano nieprawidłowe pola!" };
    }

    const acceptTerms = validatedFields.data.acceptTerms

    if (!acceptTerms) {
        return { success: false, message: "Nie zaakceptowano warunków!"}
    }
    
    const ownerID = validatedFields.data.ownerID
    const owner = await getUserById(ownerID);

    if (!owner) {
        return { success: false, message: "Nie ma takiego użytkownika!"}
    }

    const productID = validatedFields.data.productID
    const product = await GetProductByID(productID)

    if (!product) {
        return { success: false, message: "Nie ma takiego produktu!" }
    }

    const title = validatedFields.data.title

    if (!title) {
        return { success: false, message: "Podano nieprawidłowy tytuł!"}
    }

    const description = validatedFields.data.description

    if (!description) {
        return { success: false, message: "Podano nieprawidłowy opis!"}
    }

    const ID = uuidv4()

    try {
        await db.testimonial.create({
            data: {
                ID: ID,
                title: title,
                description: description,
                acceptTerms: acceptTerms,
                owner: {
                    connect: { id: ownerID}
                },
                product: {
                    connect: { id: productID}
                }
            }
        })
    } catch (error) {
        console.error(error)
        return { success: false, message: "Nie udało się przesłać opinii"}
    }

    return { success: true, message: "Twoja opinia została przesłana!"}
}
 
export default AddTestimonial;
