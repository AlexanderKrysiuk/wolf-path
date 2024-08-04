"use server"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
export const GetPendingTestimonials = async ( userID: string ) => {
    const user = await getUserById(userID)
    if (!user) {
        console.error("Błąd podczas pobierania użytkownika!")
        return
    }
    if (!user.role) {
        console.error("Błąd podczas ustalania uprawnień użytkownika")
    }
    if (user.role !== "ADMIN"){
        console.error("Użytkownik nie ma uprawnień")
    }
    try {
        const testimonials = await db.testimonial.findMany({
            where: { status: "PENDING" },
            select: {
                ID: true,
                title: true,
                description: true,
                status: true,
                ownerID: true,
                productID: true,
                product: {
                    select: {
                        title: true,
                    }
                },
                owner: {
                    select: {
                        image: true,
                        name: true,
                    }
                }
            }
        })
        return testimonials
    } catch(error) {
        console.error("Błąd podczas pobierania danych:", error);
        throw error; // Przekaż błąd dalej
    }
}