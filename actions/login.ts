"use server";

import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/nodemailer';

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Podano nieprawidłowe pola!" };
    }
    
    const email = validatedFields.data.email.toLowerCase();
    const password = validatedFields.data.password;
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Podany Email nie istnieje!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success: "Wysłano e-mail veryfikacyjny!"};
    }

    try {
        await signIn("credentials", {
            email, 
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: "", error: "Nieprawidłowe dane!" }
                default:
                    return { success: "", error: "Coś poszło nie tak!"}
            }
        }
        throw error;
    }
    return {success: "", error: "Coś poszło nie tak!"};
}