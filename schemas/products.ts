import { z } from "zod";

export const ProductSchema = z.object({
    title: z.string().min(1, {
        message: "Produkt musi mieć nazwę"
    }),
    owner: z.string().cuid({
        message: "Trzeba podać poprawne id właściciela"
    })
})