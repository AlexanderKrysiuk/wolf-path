import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductsPage = () => {
    return (
        <div>
            <Link href="/dashboard/products/create">
                <Button>
                    Dodaj Produkt
                </Button>
            </Link>
        </div>
    );
}
 
export default ProductsPage