import { z } from "zod";

export const AddTestimonialSchema = z.object({
    title: z.string().min(1, {
        message: "Opinia musi mieć nazwę"
    }),
    description: z.string().min(1, {
        message: "Opinia musi mieć opis"
    }),
    ownerID: z.string().cuid({
        message: "Trzeba podać poprawne id właściciela opinii"
    }),
    productID: z.string().uuid({
        message: "Trzeba podać poprawne id produktu"
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "Musisz zaakceptować regulamin."
    })
})