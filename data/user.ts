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