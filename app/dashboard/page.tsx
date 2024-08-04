"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";

const DashBoard = () => {
    const user = useCurrentUser()

    return ( 
        <div>
            <Card>
                <Button>
                    Dodaj nową opinię
                </Button>
            </Card>
        </div>
    );
}
export default DashBoard;