import * as z from 'zod';

const nameTemplate = z.string()
    .min(3, { message: "Imię i nazwisko musi mieć conajmniej 3 litery"
})

const emailTemplate = z.string().email({ message: "Email wymagany!"})

const passwordTemplate = z.string()
    .min(1, { message: "Podaj hasło do zmiany"})

const newPasswordTemplate = z.string()
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
    .regex(/[a-z]/, { message: "Hasło musi zawierać co najmniej jedną małą literę" })
    .regex(/[A-Z]/, { message: "Hasło musi zawierać co najmniej jedną wielką literę" })
    .regex(/[0-9]/, { message: "Hasło musi zawierać co najmniej jedną cyfrę" })
    .regex(/[\W_]/, { message: "Hasło musi zawierać co najmniej jeden znak specjalny" });

export const SettingsSchema = z.object({
    name: z.optional(nameTemplate),
    email: z.optional(emailTemplate),
    password: z.optional(passwordTemplate),
    newPassword: z.optional(newPasswordTemplate)
})
    .refine((data) => {
        if(data.password && !data.newPassword) {
            return false;
        }
        return true;
    }, {
        message: "Nowe hasło jest wymagane!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if(!data.password && data.newPassword){
            return false
        }
        return true;
    }, {
        message: "Poprzednie hasło jest wymagane!",
        path: ["password"]
    })

export const LoginSchema = z.object({
    email: emailTemplate,
    password: passwordTemplate
});

export const RegisterSchema = z.object({
    name: nameTemplate,
    email: emailTemplate,
    password: newPasswordTemplate
});

export const ResetSchema = z.object({
    email: emailTemplate
});

export const NewPasswordSchema = z.object({
    password: newPasswordTemplate
});