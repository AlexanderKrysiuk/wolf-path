"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import getFileExtension from "@/lib/file";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";

const SettingsPage = () => {
    const [file, setFile] = useState<File>()
    const user = useCurrentUser()
    const { update } = useSession()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (!ALLOWED_TYPES.includes(file.type)) {
            console.error("Wybierz plik, który jest zdjęciem!");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            console.error("Zdjęcie jest za duże!");
            return;
        }

        if (!user) {
            return 
        }

        if (user.isOAuth) {
            return
        }

        if (!user.id) {
            return
        }


        try {
            const data = new FormData()
            data.set('file', file)
            data.set('user', JSON.stringify({
                id: user.id,
                isOAuth: user.isOAuth,
                image: user.image
            }))

            const res = await fetch (`/api/avatar`, {
                method: 'POST',
                body: data
            })
            //handle the error
            if (!res.ok) throw new Error(await res.text())

            const result = await res.json();
            console.log(result)
            if(result.success){
                update()
            }

        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <div>

        <Card className="max-w-[600px] mx-auto p-[2vw]">
            <CardContent className="p-[2vw]">
                <div className="gap-x-4 flex">

                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback>
                            <FaUser/>
                        </AvatarFallback>
                    </Avatar>
                    <Button>
                        Zmień Avatar
                    </Button>
                    <form onSubmit={onSubmit}>
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                        <input type="submit" value="upload"/>
                    </form>

                    {/*
                    <Dialog>
                        <DialogTrigger>                            
                                Zmień Avatar
                        </DialogTrigger>
                        <DialogContent>
                            <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                                <Card className="p-[4vw] max-w-[600px]">
                                <DialogTitle>
                                    <span className="flex items-center justify-between">
                                        
                                        Prześlij Plik
                                        <DialogClose>
                                            <RiCloseLargeFill/>
                                        </DialogClose>
                                    </span>
                                </DialogTitle>
                                Prześlij plik
                                
                                </Card>

                            </div>
                        </DialogContent>
                    </Dialog>
                    */}
                </div>
            </CardContent>
        </Card>
        </div>
    );
}
export default SettingsPage;