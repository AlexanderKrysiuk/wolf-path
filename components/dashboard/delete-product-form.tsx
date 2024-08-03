import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DeleteProductSchema } from "@/schemas/products";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LuAlertTriangle, LuCheckCircle } from "react-icons/lu";
import DeleteProduct from "@/actions/products/delete-product";

interface Admin {
    id: string;
    name?: string;
}

interface Product {
    id: string;
    title: string;
    ownerID: string;
    owner: Admin;
}

interface ProductProps {
    product: Product | null
}

const DeleteProductForm: React.FC<ProductProps> = ({ product }) => {
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser()

    const form = useForm<z.infer<typeof DeleteProductSchema>>({
        resolver: zodResolver(DeleteProductSchema),
        defaultValues: {
            id: product.id,
            adminID: user.id
        }
    })

    const onSubmit = (values: z.infer<typeof DeleteProductSchema>) => {
        setResult(null)
        startTransition(() => {
            DeleteProduct(values)
                .then((data) => {
                    setResult({ success: data.success, message: data.message })
            })
        })
    }
    
    return (
        <div>
            <p>
                Czy na pewno chcesz usunąć produkt: {product.title}, który należy do {product.owner.name}? 
            </p>
            <div className="flex justify-center">
                <Button variant="destructive" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                    Tak            
                </Button>
            </div>
            <div className="flex mx-auto justify-center">
                {result && (
                    <div className={`${result.success ? 'text-emerald-500' : 'text-red-500'}`}>
                        <p className="flex items-center gap-x-[1vw]">
                            {result.success ? <LuCheckCircle/> : <LuAlertTriangle/>}
                            {result.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default DeleteProductForm;