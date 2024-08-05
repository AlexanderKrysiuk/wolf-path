import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTestimonialSchema } from "@/schemas/testimonials";
import { Input } from "@/components/ui/input";
import { GetProducts } from "@/actions/products/get-products";
import { useEffect, useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";
import AvatarChange from "@/components/avatar-change";
import AddTestimonialModal from "./add-testimonial-modal";
import AddTestimonial from "@/actions/testimonials/add-testimonial";
import { Checkbox } from "../ui/checkbox";
import { LuAlertTriangle, LuCheckCircle } from "react-icons/lu";

interface Product {
    id: string
    title: string
}

const AddTestimonialForm = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isPending, startTransition] = useTransition()
    const [titleCount, setTitleCount] = useState(0);
    const [descriptionCount, setDescriptionCount] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);
    const [modalOpen, setModalOpen] = useState(false); // Stan dla modalu
    const [formData, setFormData] = useState(null); // Stan dla danych formularza
    const TITLE_LIMIT = 120;
    const DESCRIPTION_LIMIT = 7000;
    const user = useCurrentUser()
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        form.setValue('title', value);
        setTitleCount(value.length);
        setIsSubmitDisabled(value.length > TITLE_LIMIT || descriptionCount > DESCRIPTION_LIMIT);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        form.setValue('description', value);
        setDescriptionCount(value.length);
        setIsSubmitDisabled(titleCount > TITLE_LIMIT || value.length > DESCRIPTION_LIMIT);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await GetProducts()
                setProducts(products)
            } catch(error) {
                console.error("Wystąpił błąd podczas pobierania produktów")
            }
        }
        fetchProducts()
    }, [])
    
    const form = useForm<z.infer<typeof AddTestimonialSchema>>({
        resolver: zodResolver(AddTestimonialSchema),
        defaultValues: {
            title: "",
            description: "",
            ownerID: user.id,
            productID: "",
        }
    })
    const onSubmit = (values: z.infer<typeof AddTestimonialSchema>) => {
        if (!user.image) {
            setResult({ success: false, message: "Nie możesz przesłać opinii bez ustawionego awatara." });
            return;
        }
        setFormData(values)
        setModalOpen(true)
    }
    const handleConfirm = () => {
        setResult(null)
        startTransition(()=>{
            AddTestimonial(formData)
                .then((data) => {
                    setResult({ success: data.success, message: data.message})
                    if (data.success) {
                        form.reset();
                        setTitleCount(0);
                        setDescriptionCount(0);
                        setIsSubmitDisabled(false);
                        setModalOpen(false);
                    }
                }
            )
        })
    }
    return (
        <div className="space-y-[1vh]">
            <div className="space-y-[1vh]">
                <h1 className="mjolnir">Informacje o Profilu</h1>
                <div className="flex items-center space-x-[1vw]">
                    <div className="max-w-[100px] max-h-[100px]">
                        <Avatar/>
                    </div>
                    <AvatarChange/>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[2vh]">
                    <FormField
                        control={form.control}
                        name="productID"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Dotyczy Produktu:</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger disabled={isPending}>
                                            <SelectValue placeholder="Wybierz produkt do wystawienia opinii"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <SelectItem key={product.id} value={product.id}>{product.title}</SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="pusty" disabled>Brak produktu do wyświetlenia</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <div className="flex justify-between">
                                    <FormLabel>Tytuł opinii</FormLabel>
                                    <small>{titleCount} / {TITLE_LIMIT}</small> {/* Wyświetlanie licznika znaków */}
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        disabled={isPending}
                                        placeholder="Rozwiązany temat z prokrastynacją!"
                                        onChange={handleTitleChange}
                                    />
                                </FormControl>
                                {titleCount > TITLE_LIMIT && (
                                    <div className="text-red-500">Przekroczono limit znaków dla tytułu</div>
                                )}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <div className="flex justify-between">
                                    <FormLabel>Opis</FormLabel>
                                    <small>{descriptionCount} / {DESCRIPTION_LIMIT}</small> {/* Wyświetlanie licznika znaków */}
                                </div>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        placeholder="Opis opinii"
                                        disabled={isPending}
                                        value={field.value}
                                        onChange={handleDescriptionChange}
                                        className="bg-background min-h-[7rem] border resize-none w-full shadow-sm px-3 py-1 placetext-muted-foreground rounded-lg focus:outline-none focus:border-black"
                                        style={{ overflow: 'auto' }} // Dodaj overflow, aby umożliwić przewijanie
                                        />
                                </FormControl>
                                {descriptionCount > DESCRIPTION_LIMIT && (
                                    <div className="text-red-500">Przekroczono limit znaków dla opisu</div>
                                )}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                            <FormItem className="items-center space-x-[1vh] flex">
                                <FormControl>
                                    <Checkbox
                                        disabled={isPending}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="max-w-[80vw]">
                                    Zgadzam się na przekazanie opinii i wyświetlenie jej na stronie wolf-path oraz mediach społecznościowych. Administratorem danych jest Alexander Krysiuk.
                                </FormLabel>                               
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitDisabled}>Prześlij Opinię</Button>
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
            <AddTestimonialModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onConfirm={handleConfirm} 
                user={user} 
                formData={formData} 
            />
        </div>
    );
}
export default AddTestimonialForm;