import { z } from "zod";

export const AddProductSchema = z.object({
    title: z.string().min(1, {
        message: "Produkt musi mieć nazwę"
    }),
    ownerID: z.string().cuid({
        message: "Trzeba podać poprawne id właściciela"
    }),
    adminID: z.string().cuid({
        message: "Tylko admin może dodać produkt"
    })
})

export const EditProductSchema = z.object({
    id: z.string().uuid({
        message: "Trzeba podać poprawne id produktu"
    }),
    title: z.string().min(1, {
        message: "Produkt musi mieć nazwę"
    }),
    ownerID: z.string().cuid({
        message: "Trzeba podać poprawne id właściciela"
    }),
    adminID: z.string().cuid({
        message: "Tylko admin może dodać produkt"
    })
})

export const DeleteProductSchema = z.object({
    id: z.string().uuid({
        message: "Trzeba podać poprawne id produktu"
    }),
    adminID: z.string().cuid({
        message: "Tylko admin może dodać produkt"
    })
})