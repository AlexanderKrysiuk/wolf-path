import { Container } from "postcss";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return ( 
    <div className="md:grid md:grid-cols-2 lg:max-w-[80%] mx-auto">
        <div className="md:order-1">
            <Image
                className="rounded-full px-4 w-full"
                src="/Images/Alex.png"
                alt=""
                width={500}
                height={500}
                />
        </div>
        <div className="md:grid md:grid-cols-1">

        <div className="text-2xl flex gap-2 mx-auto pt-4 px-16 lg:text-4xl lg:gap-4">
            CZEŚĆ! JESTEM 
            <div className="text-green-500">
                ALEX    
            </div>
        </div>
        <div className="
        text-lg text-center px-4 lg:text-2xl">
            <p className="py-4 md:text-left md:py-1">
                Jestem certyfikowanym hipnoterapeutą, absolwentem Akademii Hipnoterapii.     
            </p>
            <p className="py-4 md:text-left md:py-1">
                WOLFPATH (Wilcza Ścieżka), symbolizuje drogę do samopoznania, wewnętrznej siły i harmonii. 
            </p>
            <p className="py-4 md:text-left md:py-1">
                W swojej praktyce wykorzystuję techniki hipnozy, aby pomóc Ci odkryć głębokie pokłady potencjału i przezwyciężyć wewnętrzne blokady.
            </p>
            <p className="py-4 md:text-left md:py-1">
                Zapraszam do wspólnej podróży ku lepszemu samopoczuciu i pełni życia.
            </p>
        </div>
        <div className="grid grid-cols-1 px-2 text-center md:grid-cols-2">
            <div className="pb-4">
                <Link href="https://calendly.com/alexander-krysiuk/bezplatna-konsultacja-hipnozy-clone">
                    <Button className="bg-green-500 hover:bg-green-600 text-white md:text-normal lg:text-xl">
                        Bezpłatna Konsultacja
                    </Button>
                </Link>
            </div>
            <div className="pb-4">
                <Link href="https://calendly.com/alexander-krysiuk/sesja-hipnozy">
                    <Button className="bg-green-500 hover:bg-green-600 text-white md:text-normal lg:text-xl">
                        Indywidualna Sesja
                    </Button>
                </Link>
            </div>
        </div>
        </div>
    </div>
    );
}
 
export default Hero;