"use client"
import AddTestimonialForm from "@/components/dashboard/add-testimonial-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

const UserTestimonialsPage = () => {
    const [testimonialWindow, setTestimonialWindow] = useState<boolean>(false)

    return (
        <div className="px-[10vw]">
            <div className="space-y-[2vh]">

            <Card className="py-[2vh] px-[2vw]">
                <Button onClick={()=>{setTestimonialWindow(true)}}>
                    Dodaj Opinie
                </Button>
            </Card>
            {testimonialWindow && (
                <Card className="py-[2vh] px-[2vw]">
                    <AddTestimonialForm/>
                </Card>
            )}
            </div>
        </div>

    );
}
 
export default UserTestimonialsPage;