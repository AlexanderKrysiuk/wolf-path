"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { BsBox2 } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOutButton } from "@/components/auth/logout-button";
import Link from "next/link";

export const UserButton = () => {
    const user = useCurrentUser();
    const isAdmin = user?.role.includes("ADMIN")


    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                        <FaUser/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                {isAdmin && (<DropdownMenuItem>
                    <BsBox2  className="h-4 w-4 mr-2"/>
                    <Link href="/dashboard/products/">
                        Produkty     
                    </Link>
                </DropdownMenuItem> )}
                <DropdownMenuItem>
                    <CiSettings className="h-4 w-4 mr-2"/>
                    <Link href="/dashboard/settings/">
                        Ustawienia
                    </Link>
                </DropdownMenuItem>
                <LogOutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="h-4 w-4 mr-2"/>
                        Wyloguj
                    </DropdownMenuItem>
                </LogOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}