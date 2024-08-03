"use client"
import { GetProducts } from "@/actions/products/get-products";
import AddProductForm from "@/components/dashboard/add-product-form";
import DeleteProductForm from "@/components/dashboard/delete-product-form";
import EditProductForm from "@/components/dashboard/edit-product-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    ownerID: string;
    owner: Admin;
}

const ProductsPage = () => {
    const [addProductWindow, setAddProductWindow] = useState(false);
    const [editProductWindow, setEditProductWindow] = useState(false);
    const [deleteProductWindow, setDeleteProductWindow] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        try {
            const products = await GetProducts()
            setProducts(products)
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania produktów")
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <Card className="max-w-[600px] mx-auto px-[5vw] py-[5vh] space-y-[1vh]">
                <Table>
                    <TableCaption>Lista wszystkich produktów i ich właścicieli</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nazwa</TableHead>
                            <TableHead>Właściciel</TableHead>
                            <TableHead>Edycja</TableHead>
                            <TableHead>Usunięcie</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.owner.name}</TableCell>
                                <TableCell>
                                    <Button variant="blue" onClick={() => {
                                        setCurrentProduct(product)
                                        setEditProductWindow(true)
                                    }}>
                                        Edytuj
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="destructive" onClick={() => {
                                        setCurrentProduct(product)
                                        setDeleteProductWindow(true)
                                    }}>
                                        Usuń
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                {editProductWindow && (
                    <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                        <Card className="bg-background w-full px-[10vw] py-[10vh] max-w-[600px]">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-end">
                                        <Button 
                                            onClick={() => {
                                            setCurrentProduct(null);
                                            setEditProductWindow(false)
                                            fetchProducts()
                                            }}
                                            className="top right">
                                            <RiCloseLargeFill/>
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <EditProductForm product={currentProduct}/>
                            </CardContent>
                        </Card>
                    </div>
                )}
                {deleteProductWindow && (
                    <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                        <Card className="bg-background w-full px-[10vw] py-[10vh] max-w-[600px]">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-end">
                                        <Button 
                                            onClick={() => {
                                            setCurrentProduct(null);
                                            setDeleteProductWindow(false)
                                            fetchProducts()
                                            }}
                                            className="top right">
                                            <RiCloseLargeFill/>
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DeleteProductForm product={currentProduct}/>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default ProductsPage;
