"use server";

import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    
    const email = validatedFields.data.email.toLowerCase();
    const password = validatedFields.data.password;

    try {
        await signIn("credentials", {
            email, 
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
            success: "Login verified!",
            error: ""
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: "", error: "Invalid Credentials!" }
                default:
                    return { success: "", error: "Something went wrong!"}
            }
        }
        throw error;
    }
    return {success: "", error: "Something went wrong"};
}