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


const SettingsPage = () => {
    const [file, setFile] = useState<File>()
    const [result, setResult] = useState<{ success: Boolean, message: String } | null>(null)
    const user = useCurrentUser()
    const { update } = useSession()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) {
            setResult({ success: false, message: "Nie znaleziono pliku!"})
            return
        }
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (!ALLOWED_TYPES.includes(file.type)) {
            setResult({ success: false, message: "Wybierz plik, który jest zdjęciem!" });
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setResult({ success: false, message: "Zdjęcie jest za duże!"})
            return;
        }

        if (!user) {
            setResult({ success: false, message: "Nie znaleźiono użytkownika!"})
            return 
        }

        if (user.isOAuth) {
            setResult({ success: false, message: "Użytkownik loguje się przez zewnętrznego providera!"})
            return
        }

        if (!user.id) {
            setResult({ success: false, message: "Użytkownik nie ma ID!"})
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
            if(result.success){
                update()
                setResult({ success: result.success, message: result.message })
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