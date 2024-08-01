"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import AvatarChange from "@/components/avatar-change";
import Avatar from "@/components/avatar";

const SettingsPage = () => {
    const user = useCurrentUser()
    return (
        <div>

        <Card className="max-w-[600px] mx-auto p-[2vw]">
            <CardContent className="p-[2vw]">
                <div className="gap-x-4 flex items-center">
                    <div className="w-[6vw] h-[6vw] min-h-[100px] min-w-[100px]">
                        <Avatar/>
                    </div>
                    <AvatarChange/>
                </div>
            </CardContent>
        </Card>
        </div>
    );
}
export default SettingsPage;