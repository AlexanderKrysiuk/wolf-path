"use client";

import { useTransition, useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductSchema } from "@/schemas/products";
import { CreateProduct } from "@/actions/products/createproduct";
import { getAdmins } from "@/data/user";
import { Select, SelectItem } from "@/components/ui/select";

export const CreateProductForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const admins = getAdmins();
    console.log(admins)

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: "",
            owner: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            CreateProduct(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }

    return (
        <div>
            123
        </div>
    );
        {/*
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nazwa Produktu</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Sesja"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                        <FormItem>

                            <FormLabel>ID ownera</FormLabel>
                            <FormControl>
                                
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            <Button
                type="submit"
                disabled={isPending}
            >
                Dodaj Produkt
            </Button>            
            </form>
        </Form>
                */}
};