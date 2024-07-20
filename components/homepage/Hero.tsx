import { Button } from "@/components/ui/button";
import Link from "next/link";
import LINKS from "@/utils/links";



const Hero = () => {
    return (
        <div>
            <div className="grid md:grid-cols-2">
                <img
                    className="rounded-full w-1/2 md:w-full max-w-[500px] mx-auto md:order-1"
                    src="/Images/Logo.png"
                    alt=""
                    />
            <div className="lg:grid">
                <p>
                Zastanawiasz się, jak to by było, żyć życiem w pełni swoich możliwości? Życiem, które prowadzisz na własnych zasadach, w których realizujesz swoje zamierzone cele i marzenia? Życiem, w którym nic Cię nie blokuje. W którym idziesz pełną parą? W takim razie mam dla Ciebie fantastyczną wiadomość, jesteś na dobrej stronie.
                </p>
                <p>
                W Wolf-path pomagam pozbyć się wszelkich ograniczeń i blokad. Dzięki czemu zaczniesz osiągać progres w dowolnie wybranej dziedzinie swojego życia. Mało tego, odbędzie się to naturalnie, nie będziesz się do niczego zmuszać, ale działać w zgodzie z sobą. Zbyt piękne by brzmiało prawdziwie? Czytaj dalej lub.
                </p>
            </div>
        </div>
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
    );
}
 
export default Hero;