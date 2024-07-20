import Link from "next/link";
import LINKS from "@/utils/links";
import { Button } from "@/components/ui/button";

const BookSessionButtons = () => {
    return (  
        <div className="text-center px-auto gap-x-4 md:grid md:text-start lg:grid-cols-2">
            <div className="w-full">
                <Link href={LINKS.freeConsultation}>
                    <Button className="p-4 bg-green-500 hover:bg-green-600 text-white">
                        <span>
                            Umów Bezpłatną Konsultację
                        </span>
                    </Button>
                </Link>
            </div>
            <div className="p-4 pb-8">
                <Link href={LINKS.fullSession}>
                    <Button className="p-4 bg-green-500 hover:bg-green-600 text-white">
                        <span>
                            Odkryj Potęgę Hipnozy
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
 
export default BookSessionButtons