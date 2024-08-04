"use server"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
export const GetTestimonialByID = async ( testimonialID: string ) => {
    try {
        const testimonial = await db.testimonial.findUnique({
            where: { ID: testimonialID },
            select: {
                ID: true,
                title: true,
                description: true,
                status: true,
                ownerID: true,
                productID: true,
            }
        })
        return testimonial
    } catch(error) {
        console.error("Błąd podczas pobierania danych:", error);
        throw error; // Przekaż błąd dalej
    }
}