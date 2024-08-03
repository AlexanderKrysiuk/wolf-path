import Link from "next/link";
import LINKS from "@/utils/links";
import { Button } from "@/components/ui/button";

const LetsStart = () => {
    return(
        <div>
            <h1 className="font-mjolnir flex gap-x-[1vw]">
                TO CO,
                <div className="text-green-500">
                    ZACZYNAMY?
                </div>
            </h1>
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-8">
                <Link href={LINKS.freeConsultation} passHref>
                    <Button className="p-[5vh] bg-green-500 text-white w-full my-4 hover:bg-green-700">
                        <h1>
                            Umów Bezpłatną Konsultację
                        </h1>
                    </Button>
                </Link>

                <Link href={LINKS.fullSession} passHref>
                    <Button className="p-[5vh] bg-green-500 text-white w-full my-4 hover:bg-green-700">
                        <h1>
                            Odkryj Potęgę Hipnozy
                        </h1>
                    </Button>
                </Link>
            </div>
        </div>
    )    
}
export default LetsStart;
