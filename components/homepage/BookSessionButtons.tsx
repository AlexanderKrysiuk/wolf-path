import Link from "next/link";
import { Button } from "@/components/ui/button";

const BookSessionButtons = () => {
    return (  
        <div className="text-center flex items-center w-full px-auto justify-center">
            <div className="p-4">
                <Link href="https://calendly.com/alexander-krysiuk/bezplatna-konsultacja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white text-xl p-4 xl:text-3xl xl:p-8">
                        Umów bezpłatną konsultację
                    </Button>
                </Link>
            </div>
            <div className="p-4">
                <Link href="https://calendly.com/alexander-krysiuk/sesja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white text-xl p-4 xl:text-3xl xl:p-8">
                        Umów indywidualną sesję
                    </Button>
                </Link>
            </div>
        </div>
    );
}
 
export default BookSessionButtons