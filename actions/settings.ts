"use server";

import * as z from "zod";

import { db } from "@/lib/db"
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/nodemailer";
import brcypt from "bcryptjs"

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Nieautoryzowany" }
    }

    if (!user.id) {
        return { error: "Użytkownik nie istnieje!"}
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Nieautoryzowany" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
    }

    if (values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id){
            return { error: "Email jest już w użyciu!"}
        }

        const verificationToken = await generateVerificationToken(
            values.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Wysłano email weryfikacyjny!"}
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await brcypt.compare(
            values.password,
            dbUser.password,
        )

        if (!passwordMatch) {
            return { error: "Podano nieprawidłowe hasło!"}
        }

        const hashedPassword = await brcypt.hash(
            values.newPassword, 11
        );
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    })

    return { success: "Zaktualizowano ustawienia!"}
}