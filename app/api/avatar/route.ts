import { getUserById, isUserOAuth, updateUserImage } from "@/data/user";
import getFileExtension from "@/lib/file";
import { v4 as uuidv4 } from 'uuid';
import { writeFile, mkdir} from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import { unlink } from "fs/promises";
import { env } from "process";

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
    // Development
    // let FilePath: string | null = null;
    // let DataPath: string | null = null;
    // Production
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    //const fileServer = process.env.FILE_SERVER_URL;
    const fileServer = 'http://maestro.atthost24.pl'
    const FileName = uuidv4()
    const FullFileName = `${FileName}.png`;
        // Development
        // FilePath = join(process.cwd(), 'public', 'Images', 'Avatars', randomFileName)
        // DataPath = join('/', 'Images', 'Avatars', randomFileName)
        // Production
        // path = join(process.cwd(), 'Images', 'Avatars', randomFileName)
        //path = join(`www.wolf-path.pl/Images/Avatars/${randomFileName}`)
    //} else {
        

    //    const FullFileName = `${FileName}.png`
        // Development
        // FilePath = join(process.cwd(), 'public', user.image)
        // DataPath = user.image
        //path = user.image 
    //}
    //console.log(path)
    //console.log(path)
    
    
    const dirPath = join('images', 'avatars');
    const DataPathURL = new URL('/wolfpath/images/avatars/' + FullFileName, fileServer);
    const DataPath = DataPathURL.toString()
    console.log(user)
    console.log("DATAPATH: ", DataPath)
    
    const client = new ftp.Client();
    client.ftp.verbose = true;
    await client.access({
        //host: env.FTP_HOST,
        host: "maestro.atthost24.pl",
        
        //user: process.env.FTP_USER,
        user: "maestro_wolfpath_FTP",

        //password: process.env.FTP_PASS,
        password: "Md1!00M5VJ*71",

        secure: false,
    });
    
    const arrayBuffer = await file.arrayBuffer();
    const fileStream = Readable.from(Buffer.from(arrayBuffer));
    
    await client.ensureDir(dirPath)
    await client.uploadFrom(fileStream, FullFileName);
    if (user.image) {
        const existingAvatarName = user.image.split('/').pop();
        const oldFileName = existingAvatarName.split('.')[0];
        const fullOldFileName = `${oldFileName}.png`
        await client.remove(fullOldFileName);
    }
    await updateUserImage(user.id, DataPath)
    client.close()
    
    // await mkdir(dirPath, { recursive: true }); // Używamy { recursive: true }, aby utworzyć foldery w razie potrzeby
    // await writeFile(FilePath, fileStream);
    //await updateUserImage(user.id, DataPath)
    
    // const bytes = await file.arrayBuffer()
    // const buffer = Buffer.from(bytes)
    // console.log(`FILEPATH: ${FilePath}`)
    // console.log(`DATAPATH: ${DataPath}`)

    // Development
    // await writeFile(FilePath, buffer)
    // await updateUserImage(user.id, DataPath)
    // Production
     //await writeFile(path, buffer)
    return NextResponse.json({ success: true, message: "Avatar zmieniony!" })
}
