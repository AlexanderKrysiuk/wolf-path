import { getUserById, isUserOAuth, updateUserImage } from "@/data/user";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const userData = JSON.parse(data.get('user') as string)

    if (!file) {
        return NextResponse.json({ success: false})
    }

    const user = await getUserById(userData.id)
    if (!user) {
        return NextResponse.json({ result: false, message: "nie znaleziono użytkownika"})
    }

    const userOAuth = await isUserOAuth(user.id)
    if (userOAuth) {
        return NextResponse.json({ result: false, message: "Użytkownik loguje się przez providera"})
    }

    //todo: extension image name and path to server
    let path: string | null = null;
    if (!user.image) {
        const randomFileName = `${randomUUID}_${file.name}`;
        path = join('/', 'tmp', randomFileName)
    } else {
        path = user.image 
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(path, buffer)

    await updateUserImage(user.id, path)

    return NextResponse.json({ success: true })
}