"use server"
import { db } from "@/lib/db"

export const GetUserSocials = async (id: string) => {
    try {
        const socials = await db.user.findUnique({
            where: { id },
            select: {
                profession: true,
                website: true,
                facebook: true,
                instagram: true,
                linkedIn: true,
                youtube: true,
                tiktok: true
            },
        });
        return socials;
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        throw error; // Przekaż błąd dalej
    }
};