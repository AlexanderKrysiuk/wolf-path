import Link from "next/link";
import LINKS from "@/utils/links";
import { Button } from "@/components/ui/button";

const LetsStart = () => {
    return(
        <div>
            <span className="font-mjolnir flex">
                TO CO,
                <span className="text-green-500">
                    ZACZYNAMY?
                </span>
            </span>
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-8">
                <Link href={LINKS.freeConsultation} passHref>
                    <Button className="p-[5vh] bg-green-500 text-white w-full my-4 hover:bg-green-700">
                        <span>
                            Umów Bezpłatną Konsultację
                        </span>
                    </Button>
                </Link>

                <Link href={LINKS.fullSession} passHref>
                    <Button className="p-[5vh] bg-green-500 text-white w-full my-4 hover:bg-green-700">
                        <span>
                            Odkryj Potęgę Hipnozy
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    )    
}
export default LetsStart;
