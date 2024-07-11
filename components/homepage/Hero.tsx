import { Container } from "postcss";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import BookSessionButtons from "@/components/homepage/BookSessionButtons";



const Hero = () => {
    return (
        <div>
            <div className="lg:grid lg:grid-cols-2 mx-auto">
                <Image
                    className="rounded-full px-4 w-[vh30] mx-auto order-1"
                    src="/Images/Logo.png"
                    alt=""
                    width={500}
                    height={500}
                />
            <div className="lg:grid lg:grid-cols-1">
                <div className="text-2xl flex gap-2 mx-auto w-full pt-4 lg:hidden font-mjolnir">
                    WOLF
                    <div className="text-green-500">
                        PATH    
                    </div>
                </div>
                <p className="py-4 xl:text-xl">
                Zastanawiasz się, jak to by było, żyć życiem w pełni swoich możliwości? Życiem, które prowadzisz na własnych zasadach, w których realizujesz swoje zamierzone cele i marzenia? Życiem, w którym nic Cię nie blokuje. W którym idziesz pełną parą? W takim razie mam dla Ciebie fantastyczną wiadomość, jesteś na dobrej stronie.
                </p>
                <p className="py-4 xl:text-xl">
                W Wolf-path pomagam pozbyć się wszelkich ograniczeń i blokad. Dzięki czemu zaczniesz osiągać progres w dowolnie wybranej dziedzinie swojego życia. Mało tego, odbędzie się to naturalnie, nie będziesz się do niczego zmuszać, ale działać w zgodzie z sobą. Zbyt piękne by brzmiało prawdziwie? Czytaj dalej lub.
                </p>
            </div>
        </div>
        <BookSessionButtons/>
    </div>
    );
}
 
export default Hero;