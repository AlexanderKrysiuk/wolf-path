"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuAlertTriangle, LuCheckCircle } from "react-icons/lu";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'

import "react-image-crop/dist/ReactCrop.css"

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 50;

const AvatarChange = () => {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [modal, setModal] = useState<boolean>(false)
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const [crop, setCrop] = useState<Crop>()

    const user = useCurrentUser()


    const handleButtonClick = () => {
        document.getElementById('fileInput')?.click();
      };

    const validate = (selectedFile: File | undefined) => {
        if (!selectedFile) {
            setResult({ success: false, message: "Nie znaleziono pliku!"});
            return false
        }
        //console.log(file)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
        
        if (!ALLOWED_TYPES.includes(selectedFile.type)) {
            setResult({ success: false, message: "Wybierz plik, który jest zdjęciem!" });
            return false
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setResult({ success: false, message: "Zdjęcie jest za duże!"})
            return false  
        }

        if (!user) {
            setResult({ success: false, message: "Nie znaleźiono użytkownika!"})
            return false  
        }

        if (user.isOAuth) {
            setResult({ success: false, message: "Użytkownik loguje się przez zewnętrznego providera!"})
            return false
        }
        if (!user.id) {
            setResult({ success: false, message: "Użytkownik nie ma ID!"})
            return false 
        }
        return true
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) {
            return
        }
        setResult(null)
        const isValid = validate(selectedFile)
        if (!isValid) {
            setModal(false)
            return
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            console.log(imageUrl)
            setImgSrc(imageUrl)
        })
        reader.readAsDataURL(selectedFile)
        setModal(true)
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const {width, height} = e.currentTarget
        const initialCrop = makeAspectCrop(
            {
                unit: "px",
                width: MIN_DIMENSION
            }, 
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(initialCrop, width, height)
        setCrop(centeredCrop);
    }


    return (
        <div>
            <input 
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Button onClick={handleButtonClick}>Zmień Avatara</Button>
            {modal && (
                <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                    <Card className="bg-background p-[4vw] max-w-[1200px]">
                        <CardHeader>
                            <CardTitle className="flex justify-between gap-x-4">
                            <Button onClick={handleButtonClick}>Zmień Avatara</Button>
                                <Button onClick={() => setModal(false)}>
                                    <RiCloseLargeFill/>
                                </Button>
                            </CardTitle>
                            <CardContent>
                                {imgSrc && 
                                    <div className="flex flex-col items-center">
                                        <ReactCrop
                                            crop={crop}
                                            circularCrop
                                            keepSelection
                                            aspect={ASPECT_RATIO}
                                            minWidth={MIN_DIMENSION}   
                                            onChange={c => setCrop(c)} 
                                        >
                                            <img src={imgSrc} alt=""
                                                style={{maxHeight:"70vh"}}
                                                onLoad={onImageLoad}
                                            />

                                        </ReactCrop>
                                    </div>
                                }
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
            )}
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
 
export default AvatarChange;