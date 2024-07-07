import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";

export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({ user, account }){
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;
            if (user.id){
                const existingUser = await getUserById(user.id);
                if (!existingUser?.emailVerified) return false;
            }
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            if (token.name && session.user) {
                session.user.name = token.name
            }
            if (token.email && session.user) {
                session.user.email = token.email
            }
            if (session.user) {
                session.user.isOAuth = token.isOAuth as boolean;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount;
            token.role = existingUser.role;
            token.name = existingUser.name;
            token.email = existingUser.email;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});