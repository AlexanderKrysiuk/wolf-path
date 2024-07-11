import Link from "next/link";
import { Button } from "@/components/ui/button";

const BookSessionButtons = () => {
    return (  
        <div className="w-full px-auto justify-center xs:flex gap-x-4 md:grid md:justify-start">
            <div className="pt-4">
                <Link href="https://calendly.com/alexander-krysiuk/bezplatna-konsultacja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white p-4 
                    md:text-2xl md:p-6">
                        Umów bezpłatną konsultację
                    </Button>
                </Link>
            </div>
            <div className="pt-4">
                <Link href="https://calendly.com/alexander-krysiuk/sesja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white p-4 
                    md:text-2xl md:p-6">
                        Umów indywidualną sesję
                    </Button>
                </Link>
            </div>
        </div>
    );
}
 
export default BookSessionButtons