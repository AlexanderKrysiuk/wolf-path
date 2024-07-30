import { getUserById, isUserOAuth, updateUserImage } from "@/data/user";
import getFileExtension from "@/lib/file";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
    const data = await request.formData()
    //const userImageURL = JSON.parse(data.get('image') as File)
    
    const file: File | null = data.get('image') as unknown as File
    const userID = JSON.parse(data.get('userID') as string)

    if (!file) {
        return NextResponse.json({ success: false, message: "Nie udało się odczytać avatara!"})
    }

    {/*
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ success: false, message: "Wybierz plik, który jest zdjęciem!" });
    }
    
    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, message: "Zdjęcie jest za duże!"})
    }
    */}

    const user = await getUserById(userID)
    if (!user) {
        return NextResponse.json({ success: false, message: "Nie znaleziono użytkownika!"})
    }
    if (!user.id) {
        return NextResponse.json({ success: false, message: "Użytkownik nie ma ID!"})
    }

    const userOAuth = await isUserOAuth(user.id)
    if (userOAuth) {
        return NextResponse.json({ success: false, message: "Użytkownik loguje się przez zewnętrznego providera!"})
    }


    //todo: extension image name and path to server
    // const fileExtension = getFileExtension(file.name);
    let FilePath: string | null = null;
    let DataPath: string | null = null;

    if (!user.image) {
        const randomFileName = `${randomUUID()}`;
        FilePath = join(process.cwd(), 'public', 'Images', 'Avatars', randomFileName)
        DataPath = join('/', 'Images', 'Avatars', randomFileName)
    } else {
        FilePath = join(process.cwd(), 'public', user.image)
        DataPath = user.image
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(FilePath, buffer)
    await updateUserImage(user.id, DataPath)

    await updateUserImage(user.id, DataPath)
    return NextResponse.json({ success: true, message: "Avatar zmieniony!" })
}
