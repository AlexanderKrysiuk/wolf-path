"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";

const DashBoard = () => {
    const user = useCurrentUser()

    return ( 
        <div className="p-[2vw] max-w-[1600px] mx-auto">
            <Card className="p-[2vw]">
                <CardHeader>
                    <CardTitle className="border-4 border-red-500 flex items-center justify-between">
                        <span>
                            {user?.name}
                        </span>
                        <Avatar>
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback>
                                <FaUser/>
                            </AvatarFallback>
                        </Avatar>
                    </CardTitle>
                </CardHeader>
            123
            </Card> 
        </div>
    );
}
export default DashBoard;