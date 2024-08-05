"use client"
import AcceptTestimonial from "@/actions/testimonials/accept-testimonial";
import { GetPendingTestimonials } from "@/actions/testimonials/get-testimonials";
import AcceptTestimonialModal from "@/components/dashboard/accept-testimonial-modal";
import AddTestimonialForm from "@/components/dashboard/add-testimonial-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import React, { startTransition } from "react";
import { useEffect, useState } from "react";
import { LuAlertTriangle, LuCheckCircle } from "react-icons/lu";

interface testimonialToAccept {
    ID: string;
    title: string;
    description: string;
    owner: {
        name: string;
        image: string;
    };
}

const UserTestimonialsPage = () => {
    const [testimonialWindow, setTestimonialWindow] = useState<boolean>(false)
    const [pendingTestimonials, setPendingTestimonials] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [expandedTestimonialId, setExpandedTestimonialId] = useState<string | null>(null);
    const [testimonialToAccept, setTestimonialToAccept] = useState<testimonialToAccept | null>(null)
    const [acceptTestimonialModal, setAcceptTestimonialModal] = useState<boolean>(false)
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);

    const user = useCurrentUser()

    const toggleDescription = (id: string) => {
        console.log("Current Expanded ID: ", expandedTestimonialId);
        console.log("Toggling ID: ", id);
        setExpandedTestimonialId(expandedTestimonialId === id ? null : id);
    };

    const handleOpenAcceptModal = (testimonial: testimonialToAccept) => {
        setTestimonialToAccept(testimonial);
        setAcceptTestimonialModal(true);
    };

    const handleConfirm = () => {
        setResult(null)
        startTransition(()=>{
            AcceptTestimonial(testimonialToAccept.ID, user.id)
            .then((data) => {
                setResult({ success: data.success, message: data.message })
            })
        })
    }

    useEffect(() => {
        const fetchPendingTestimonials = async () => {
            setLoading(true)
            try {
                const result = await GetPendingTestimonials(user.id);
                setPendingTestimonials(result)
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };
        fetchPendingTestimonials()
    },[])

    return (
        <div className="px-[10vw]">
            <div className="space-y-[2vh]">
                {user.role === "ADMIN" && (
                    <Card className="py-[2vh] px-[2vw]">
                        <Table>
                            <TableCaption>Lista Opinii oczekujących na weryfikację</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tytuł</TableHead>
                                    <TableHead>Avatar</TableHead>
                                    <TableHead>Użytkownik</TableHead>
                                    <TableHead>Produkt</TableHead>
                                    <TableHead>Akceptuj</TableHead>
                                    <TableHead>Edytuj</TableHead>
                                    <TableHead>Usuń</TableHead>
                                    <TableHead>Rozwiń</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/*
                                {pendingTestimonials.map((pendingtestimonial) => (
                                    <React.Fragment key={pendingtestimonial.ID}>
                                        <TableRow>
                                            <TableCell>{pendingtestimonial.title}</TableCell>
                                            <TableCell>
                                                <img src={pendingtestimonial.owner.image} alt={pendingtestimonial.owner.name} className="w-10 h-10 rounded-full" />
                                            </TableCell>
                                            <TableCell>{pendingtestimonial.owner.name}</TableCell>
                                            <TableCell>{pendingtestimonial.product.title}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleOpenAcceptModal(pendingtestimonial)}>
                                                    Akceptuj
                                                </Button>                                            
                                            </TableCell>
                                            <TableCell>
                                                <Button>Edytuj</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>Usuń</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => toggleDescription(pendingtestimonial.ID)}>
                                                    {expandedTestimonialId === pendingtestimonial.ID ? "Zwiń" : "Rozwiń"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {expandedTestimonialId === pendingtestimonial.ID && (
                                            <TableRow>
                                                <TableCell colSpan={8} className="p-4">
                                                    <div>{pendingtestimonial.description}</div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            */}
                            </TableBody>
                        </Table>
                        <div className="flex mx-auto justify-center">
                            {result && (
                                <div className={`${result.success ? 'text-emerald-500' : 'text-red-500'}`}>
                                    <p className="flex items-center gap-x-[1vw]">
                                    {result.success ? <LuCheckCircle/> : <LuAlertTriangle/>}
                                    {result.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
                <AcceptTestimonialModal 
                    isOpen={acceptTestimonialModal} 
                    onClose={() => setAcceptTestimonialModal(false)} 
                    onConfirm={()=>{handleConfirm}}
                    testimonial={testimonialToAccept}
                />  
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