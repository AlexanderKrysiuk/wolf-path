"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ProductSchema = z.object({
    title: z.string().min(1, {
        message: "Podaj nazwę produktu"
    }),
    ownerId: z.string().cuid({
        message: "Trzeba podać poprawne id właściciela"
    })
})

import { CreateProductForm } from "../components/create-product-form";
import { toast } from "sonner";

const CreateProductPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: "",
            ownerId: ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        try {
            const response = await axios.post("/api/product", values);
            toast.success("Dodano Produkt!")
        } catch {
            toast.error("Coś poszło nie tak!")
        }
    }

    return (
        <div className="max-w-[400px] mx-auto">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nazwa Produktu
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="Sesja trenerska"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ownerId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Podaj Właściciela Produktu
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="ID właściciela"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                    >
                        Dodaj Produkt
                    </Button>
                </form>
            </Form>
        </div>
    );
}
 
export default CreateProductPage;