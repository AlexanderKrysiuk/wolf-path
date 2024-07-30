"use client"
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuAlertTriangle, LuCheckCircle } from "react-icons/lu";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, type Crop } from 'react-image-crop'

import "react-image-crop/dist/ReactCrop.css"

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 100;

const AvatarChange = () => {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [modal, setModal] = useState<boolean>(false)
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const [crop, setCrop] = useState<Crop>()
    const [avatarURL, setAvatarURL] = useState('')

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
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e: Event)=>{
                const img = e.currentTarget as HTMLImageElement;

                const {naturalWidth, naturalHeight} = img
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION ) {
                    setResult({ success: false, message: "Obraz jest za mały"})
                    setModal(false)
                    return
                }
            })

            setImgSrc(imageUrl)
        })
        reader.readAsDataURL(selectedFile)
        setModal(true)
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const {width, height, naturalWidth, naturalHeight} = e.currentTarget
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        
        const initialCrop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent
            }, 
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(initialCrop, width, height)
        setCrop(centeredCrop);
    }

    const setCanvasPreview = (
        image, // HTMLImageElement
        canvas, // HTMLCanvasElement
        crop // PixelCrop
    ) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error ("Nie ma kontekstu")
        }

        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = "high"
        ctx.save()

        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY

        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        )

        ctx.restore();
    }

    function convertDataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const saveAvatarToDatabase = async (avatarURL) => {
        try {
            const newAvatar = convertDataURLtoFile(avatarURL, 'obraz')
            const formData = new FormData();
            formData.set('image', newAvatar)
            formData.set('userID', JSON.stringify(user.id))
            const response = await fetch('/api/avatar', {
                method: 'POST',
                body: formData
            })

            if(response.ok) {
                setResult({ success: true, message: "Avatar zmieniony!"})
            } else {
                setResult({ success: false, message: "Wystąpił błąd podczas zapisywania avatara." })
            }
        }  catch (error) {
            setResult({ success: false, message: "Wystąpił błąd podczas zapisywania avatara." });
        }
    }

    return (
        <div>
            {!user.isOAuth && 
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
                            <Card className="bg-background p-[4vw] max-w-[1200px] max-h-[90vh] overflow-auto"> {/* ZMIANA: max-h-[90vh] */}
                                <CardHeader>
                                    <CardTitle className="flex justify-between gap-x-4">
                                    <Button onClick={handleButtonClick}>Wybierz Inny Obraz</Button>
                                        <Button onClick={() => setModal(false)}>
                                            <RiCloseLargeFill/>
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center h-full w-full"> {/* ZMIANA: h-full */}
                                    {imgSrc && 
                                        <div className="flex flex-col items-center justify-center h-full w-full"> {/* ZMIANA: h-full */}
                                            <ReactCrop
                                                crop={crop}
                                                circularCrop
                                                keepSelection
                                                aspect={ASPECT_RATIO}
                                                minWidth={MIN_DIMENSION}   
                                                onChange={
                                                    (pixelCrop, percentCrop) => setCrop(percentCrop)
                                                }
                                            >
                                                <img 
                                                    ref={imgRef} 
                                                    src={imgSrc} 
                                                    alt=""
                                                    style={{maxHeight:"40vh"}}
                                                    onLoad={onImageLoad}
                                                    />
                                            </ReactCrop>
                                            <Button 
                                                className="mt-[1vh]"
                                                onClick={() => {
                                                    setCanvasPreview(
                                                        imgRef.current,
                                                        previewCanvasRef.current,
                                                        convertToPixelCrop(
                                                            crop,
                                                            imgRef.current.width,
                                                            imgRef.current.height
                                                        )
                                                    )
                                                    const dataURL = previewCanvasRef.current.toDataURL()
                                                    setAvatarURL(dataURL)
                                                }}
                                                >
                                                Przytnij Zdjęcie
                                            </Button>
                                        </div>
                                    }
                                    {crop &&
                                        <canvas 
                                        ref={previewCanvasRef}
                                        className="mt-[1vh] mx-auto"
                                        style={{
                                            border: "1px solid black",
                                            objectFit: "contain",
                                            width: 100,
                                            height: 100
                                        }}
                                        /> 
                                    }
                                    <div className="mt-[1vh] flex mx-auto justify-center">
                                    {avatarURL && 
                                        <Button
                                        onClick={async () => {
                                            await saveAvatarToDatabase(avatarURL)
                                        }}>
                                            Prześlij Zdjęcie
                                        </Button>
                                    }
                                    </div>
                                    <div className="mt-[1vh]">
                                        {result && (
                                            <div className={`${result.success ? 'text-emerald-500' : 'text-red-500'} flex items-center gap-x-[1vw]`}>
                                                {result.success ? <LuCheckCircle/> : <LuAlertTriangle/>}
                                                {result.message}
                                            </div>
                                        )}
                                    </div>                                
                                </CardContent>
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
            }
        </div>
    );
}
 
export default AvatarChange;