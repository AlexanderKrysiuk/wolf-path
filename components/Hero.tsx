import { Container } from "postcss";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return ( <div className="">
        <div className="grid grid-cols-4 gap-4">
            {/* First Column */}
            <div>
                
            </div>
            {/* Second Column */}
            <div>
                <div className="text-4xl flex gap-4">
                    CZEŚĆ! JESTEM 
                    <div className="text-green-500">
                        ALEX    
                    </div>
                </div>
                <div className="mt-4 mb-4 text-xl">
                    Jestem certyfikowanym hipnoterapeutą, absolwentem Akademii Hipnoterapii. Moja marka, WOLFPATH (Wilcza Ścieżka), symbolizuje drogę do samopoznania, wewnętrznej siły i harmonii. W swojej praktyce wykorzystuję techniki hipnozy, aby pomóc Ci odkryć głębokie pokłady potencjału i przezwyciężyć wewnętrzne blokady. Zapraszam do wspólnej podróży ku lepszemu samopoczuciu i pełni życia.
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <Link href="https://calendly.com/alexander-krysiuk/bezplatna-konsultacja-hipnozy">
                            <Button className="bg-green-500 text-white">
                                Bezpłatna Konsultacja
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link href="https://calendly.com/alexander-krysiuk/sesja-hipnozy">
                            <Button className="bg-green-500 text-white">
                                Indywidualna Sesja
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* 3 Column */}
            <div>
                <Image
                    className="rounded-full"
                    src="/Images/Alex.png"
                    alt=""
                    width={500}
                    height={500}
                />
            </div>
        </div>
    </div> );
}
 
export default Hero;