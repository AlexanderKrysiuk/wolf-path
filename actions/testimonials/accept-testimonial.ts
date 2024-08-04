"use server"
import { getUserById } from "@/data/user";
import { GetTestimonialByID } from "./get-testimonial";
import { db } from "@/lib/db";

const AcceptTestimonial = async (testimonialID: string, userID: string) => {
    const user = await getUserById(userID)
    if (!user) {
        return { success: false, message: "Nie można znaleźć użytkownika!"}
    }

    if (user.role !== "ADMIN") {
        return { success: false, message: "Brak uprawnień!"}
    }

    const testimonial = await GetTestimonialByID(testimonialID)
    
    if (!testimonial) {
        return { success: false, message: "Nie udało się pobrać opinii!"}
    }

    try {
        await db.testimonial.update({
            where: { ID: testimonialID },
            data: {
                status: "ACCEPTED"
            }
        })
        return ({ success: true, message:"Opinia zaakceptowana!" });
    } catch(error) {
        return { success: false, message: "Nie udało się zaakceptować opinii"}
    }
}
 
export default AcceptTestimonial;