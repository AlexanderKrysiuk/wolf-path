"use client"; 

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from "@/components/ui/form"
import Link from "next/link";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "E -mail już używany z innym dostawcą" : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    return (
        <div>
            <CardWrapper
                headerLabel = "Witaj z powrotem!"
                backButtonLabel="Nie masz konta?"
                backButtonHref="/auth/register"
                showSocial
                >
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="john.doe@example.com"
                                                type="email"
                                                />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hasło</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="********"
                                                type="password"
                                                />
                                        </FormControl>
                                        <Button 
                                            size="sm"
                                            variant="link"
                                            asChild
                                            className="px-0 font-normal"
                                            >
                                            <Link href="/auth/reset">
                                                Nie pamiętasz hasła?
                                            </Link>
                                        </Button>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error || urlError}/>
                        <FormSuccess message={success}/>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Zaloguj sie
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
}