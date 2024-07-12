import Link from "next/link";
import { Button } from "@/components/ui/button";

const BookSessionButtons = () => {
    return (  
        <div className="w-full text-center px-auto gap-x-4 md:grid md:text-start lg:grid-cols-2">
            <div className="p-4 ">
                <Link href="https://calendly.com/alexander-krysiuk/bezplatna-konsultacja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white p-4
                    xs:text-2xl xs:p-8">
                        Umów bezpłatną konsultację
                    </Button>
                </Link>
            </div>
            <div className="p-4 pb-8">
                <Link href="https://calendly.com/alexander-krysiuk/sesja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white p-4
                    xs:text-2xl xs:p-8">
                        Umów indywidualną sesję
                    </Button>
                </Link>
            </div>
        </div>
    );
}
 
export default BookSessionButtons