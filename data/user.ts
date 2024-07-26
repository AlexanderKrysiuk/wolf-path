import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch {
        return null;
    }
}

export const getAdmins = async () => {
    try {
        const admins = await db.user.findMany({
            where: { role: "ADMIN" },
            select: { id: true, email: true },
        });
        return admins
    } catch {
        return null;
    }
}

export const isUserOAuth = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: {id}, select: {accounts: true}});
        if (user && user.accounts.length>0) {
            return true
        } else {
            return false
        }
    } catch(error) {
        throw new Error("Nie mogłem sprawdzić konta użytkownika");
    }
}

export async function updateUserImage(userId: string, newPath: string) {
    try {
        await db.user.update({
            where: { id: userId },
            data: { image: newPath },
        });
    } catch (error) {
        throw new Error("Nie mogłem zaktualizować obrazka");
    }
}