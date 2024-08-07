"use client";

import * as z from "zod";
import { useForm } from "react-hook-form" 
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";

import { SettingsSchema } from "@/schemas";
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card"
import { 
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

const SettingsPage = () => {

    const user = useCurrentUser();
    const { update } = useSession();

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
        }
    })
    
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }

                    if (data.success) {
                        update();
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <Card className="w-screen max-w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙️ Settings 
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form 
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="john.doe@example.com"
                                                type="email"
                                                disabled={isPending}
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                                disabled={isPending}
                                                />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                                disabled={isPending}
                                                />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </>
                            )}
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


//import { auth, signOut } from "@/auth";
{/*
const SettingsPage = async () => {
    const session = await auth();
    return ( 
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server";

                await signOut({redirectTo: "/auth/login"});
            }}>
                <button type="submit">
                    Sign out!
                </button>
            </form>
        </div> 
    );
}
*/}
 
export default SettingsPage;