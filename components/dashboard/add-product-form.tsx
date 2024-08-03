import { useEffect, useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { AddProductSchema } from "@/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import AddProduct from "@/actions/products/add-product";
import { LuAlertTriangle, LuCheckCircle } from "react-icons/lu";

interface Admin {
    id: string;
    name?: string;
}

const AddProductForm = () => {
    const [admins, setAdmins] = useState<Admin[]>([])
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);

    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser()

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch('/api/admins')
                if(!response.ok) {
                    throw new Error("Błąd podczas ładowania listy adminów")
                }
                const data = await response.json()
                setAdmins(data)
            } catch (error) {
                throw new Error("Błąd podczas ładowania listy adminów")
            }
        }
        fetchAdmins();
    }, [])

    const form = useForm<z.infer<typeof AddProductSchema>>({
        resolver: zodResolver(AddProductSchema),
        defaultValues: {
            title: "",
            ownerID: "",
            adminID: user.id
        }
    })

    const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
        setResult(null)
        startTransition(() => {
            AddProduct(values)
                .then((data) => {
                    setResult({ success: data.success, message: data.message })
            })
        })
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[1vh]">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa Produktu</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="title"
                                            disabled={isPending}
                                            placeholder="Sesja Hipnozy"
                                            />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="ownerID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Właściciel</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger disabled={isPending}>
                                                <SelectValue placeholder="Wybierz właściciela produktu"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {admins.length > 0 ? (
                                                admins.map((admin) => (
                                                    <SelectItem key={admin.id} value={admin.id}>{admin.name}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="pusty" disabled>Brak osoby do wyświetlenia</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                <Button type="submit" disabled={isPending}>
                    Dodaj Produkt
                </Button>
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
            </form>
        </Form>
    );
}
 
export default AddProductForm;