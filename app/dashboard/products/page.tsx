"use client"
import AddProductForm from "@/components/dashboard/add-product-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddProductSchema } from "@/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLargeFill } from "react-icons/ri";
import * as z from 'zod';

interface Admin {
    id: string;
    name?: string;
}

interface Product {
    id: string;
    title: string;
    owner: Admin;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [addProductWindow, setAddProductWindow] = useState(true);
    

    return (
        <div>
            <Card className="max-w-[600px] mx-auto px-[5vw] py-[5vh]">
                <Button onClick={() => {setAddProductWindow(true)}}>
                    Nowy Produkt
                </Button>
                {addProductWindow && (
                    <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                        <Card className="bg-background w-full px-[10vw] py-[10vh] max-w-[600px]">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-end">
                                        <Button onClick={() => setAddProductWindow(false)} className="top right">
                                            <RiCloseLargeFill/>
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AddProductForm/>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default ProductsPage;
