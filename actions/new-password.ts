"use server"

import * as z from "zod";

import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if (!token) {
        return { error: "Brakuje Tokenu" }
    }

    const validattedField = NewPasswordSchema.safeParse(values);

    if (!validattedField.success) {
        return { error: "Podano nieprawidłowe pola!" };
    }

    const { password } = validattedField.data;

    const exisitngToken = await getPasswordResetTokenByToken(token)

    if (!exisitngToken) {
        return { error: "Nieprawidłowy Token!" };
    }

    const hasExpired = new Date(exisitngToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token stracił ważność!" };
    }

    const existingUser = await getUserByEmail(exisitngToken.email);
    
    if (!existingUser) {
        return { error: "Podany email nie istnieje!" }
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword},
    });

    await db.passwordResetToken.delete({
        where: { id: exisitngToken.id }
    })

    return { success: "Hasło zaktualizowane!" }
}