import { Container } from "postcss";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import BookSessionButtons from "@/components/homepage/BookSessionButtons";



const Hero = () => {
    return (
        <div className="snap-start">
            <div className="grid md:grid-cols-2">
                <img
                    className="rounded-full w-1/2 md:w-full max-w-[500px] py-4 mx-auto md:order-1"
                    src="/Images/Logo.png"
                    alt=""
                    />
            <div className="lg:grid">
                <div className="text-xl flex mx-auto w-full pt-4 font-mjolnir gap-x-1 px-4 md:hidden">
                    WOLF
                    <div className="text-green-500">
                        PATH    
                    </div>
                </div>
                <p>
                Zastanawiasz się, jak to by było, żyć życiem w pełni swoich możliwości? Życiem, które prowadzisz na własnych zasadach, w których realizujesz swoje zamierzone cele i marzenia? Życiem, w którym nic Cię nie blokuje. W którym idziesz pełną parą? W takim razie mam dla Ciebie fantastyczną wiadomość, jesteś na dobrej stronie.
                </p>
                <p>
                W Wolf-path pomagam pozbyć się wszelkich ograniczeń i blokad. Dzięki czemu zaczniesz osiągać progres w dowolnie wybranej dziedzinie swojego życia. Mało tego, odbędzie się to naturalnie, nie będziesz się do niczego zmuszać, ale działać w zgodzie z sobą. Zbyt piękne by brzmiało prawdziwie? Czytaj dalej lub.
                </p>
            </div>
        </div>
        <BookSessionButtons/>
    </div>
    );
}
 
export default Hero;