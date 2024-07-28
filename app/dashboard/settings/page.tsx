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
import { LuCheckCircle, LuAlertTriangle} from "react-icons/lu";
import { Input } from "@/components/ui/input";
import AvatarChange from "@/components/avatar-change";



const SettingsPage = () => {
    const [file, setFile] = useState<File>()
    const [result, setResult] = useState<{ success: Boolean, message: String } | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const user = useCurrentUser()
    const { update } = useSession()

    const onChange = async (e: React.FormEvent<HTMLFormElement>) => {

    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) {
            return setResult({ success: false, message: "Nie znaleziono pliku!"});
        }
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (!ALLOWED_TYPES.includes(file.type)) {
            return setResult({ success: false, message: "Wybierz plik, który jest zdjęciem!" });;
        }

        if (file.size > MAX_FILE_SIZE) {
            return setResult({ success: false, message: "Zdjęcie jest za duże!"})

        }

        if (!user) {
            return setResult({ success: false, message: "Nie znaleźiono użytkownika!"})
        }

        if (user.isOAuth) {
            return setResult({ success: false, message: "Użytkownik loguje się przez zewnętrznego providera!"})
            
        }

        if (!user.id) {
            return setResult({ success: false, message: "Użytkownik nie ma ID!"})
        }

        <Dialog>
            <DialogContent>
                <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                    <Card className="bg-background p-[4vw] max-w-[1200px]">
                        <DialogHeader>
                            <DialogTitle className="flex justify-between gap-x-4">
                                <DialogClose/>
                            </DialogTitle>
                        </DialogHeader>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>

        {/*
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
            if(result.success){
                update()
                setResult({ success: result.success, message: result.message })
            }

        } catch (e: any) {
            console.error(e)
        }
        */}
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
                    {/*
                            <Input
                                placeholder="Zmień Avatar"
                                type="file"
                                onClick={() => setModal(true)}
                            />
                    */}
                    <AvatarChange/>
                    

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
            </CardContent>
        </Card>
        </div>
    );
}
export default SettingsPage;