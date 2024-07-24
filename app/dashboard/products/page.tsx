"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
    id: string;
    name?: string;
}

interface Product {
    id: string;
    title: string;
    owner: User;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products", {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseText = await response.text();

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const products: Product[] = JSON.parse(responseText);
                setProducts(products);
            } catch (error) {
                console.error("Błąd podczas pobierania produktów:", error);
                setError("Wystąpił błąd podczas pobierania produktów.");
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Link href="/dashboard/products/create">
                <Button>
                    Dodaj Produkt
                </Button>
            </Link>
            <div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                    {product.title} (Właściciel: {product.owner.name || "Nieznany"})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Brak produktów do wyświetlenia.</p>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;
