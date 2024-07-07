"use server";

import * as z from "zod";

import { db } from "@/lib/db"
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import brcypt from "bcryptjs"

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unautorized" }
    }

    if (!user.id) {
        return { error: "User does not exist"}
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
    }

    if (values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id){
            return { error: "Email already in use! "}
        }

        const verificationToken = await generateVerificationToken(
            values.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Verification email sent!"}
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await brcypt.compare(
            values.password,
            dbUser.password,
        )

        if (!passwordMatch) {
            return { error: "Incorrect password!"}
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

    return { success: "Settings Updated!"}
}