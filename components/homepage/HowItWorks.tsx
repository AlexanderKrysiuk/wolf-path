import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "../auth/card-wrapper";
import { FiCheckCircle } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import BookSessionButtons from "@/components/homepage/BookSessionButtons";

const HowItWorks = () => {
    return ( 
        <div className="">
            <span className="font-mjolnir flex">
                NA CZYM TO
                <span className="text-green-500">
                    POLEGA?
                </span>
            </span>
            <p>
                Wszystko zaczyna się w naszej podświadomości. To ona zarządza naszym biciem serca, oddychaniem, wszystkimi innymi czynnościami fizjologicznymi. A także naszymi emocjami, zachowaniami, przekonaniami, programami, odruchami itd. itd.
            </p>
            <p>
                I właśnie dlatego zmuszanie się do zmiany nawyków jest bardzo często nieskuteczne. Dlatego tez bardzo wiele osób stosujących afirmacje ma w pewnym momencie wrażenie, że one po prostu nie działają. Nieważne ile razy będziesz sobie powtarzać &quot;jestem milionerem, jestem milionerem&quot; albo &quot;od dziś nie jem ciastek, od dzisiaj nie jem ciastek&quot;. Jeśli Twoja podświadomość uzna to za kłamstwo, po prostu w to nie uwierzy i nie uwidoczni Ci tego w życiu.
            </p>
            <p>
                Żeby zmiany miały efekt trwały, trzeba je zainstalować od środka. I właśnie na tym polega hipnoza, którą wykorzystuję w transformacji życia. To dosłownie zmiana oprogramowanie Twojej podświadomości. Poprzez hipnozę tworzymy nowe ścieżki neuronowe w mózgu, dzięki czemu zmiany w naszym życiu występują naturalnie w zgodzie z nami bez uczucia przymusu.
            </p>
            <div className="grid grid-rows-3 lg:grid-cols-3 p-2 gap-y-4 gap-x-2">
                <Card className="bg-secondary p-2 grid grid-cols-6">
                    <div className="w-3/4 h-3/4 m-auto">
                        <FiCheckCircle className="h-full w-full text-green-500 items-center"/>
                    </div>
                    <div className="flex xs:text-2xl text-green-500 pl-4 font-bold items-center col-span-5">
                        W Hipnozie tworzą się nowe ścieżki neuronowe.                    
                    </div>
                </Card>
                <Card className="bg-secondary p-2 xl:p-4 grid grid-cols-6">
                    <div className="w-3/4 h-3/4 m-auto">
                        <FiCheckCircle className="h-full w-full text-green-500 items-center"/>
                    </div>
                    <div className="flex xs:text-2xl text-green-500 pl-4 font-bold items-center col-span-5">
                        Stanu hipnozy doświadcza każdy z nas.
                    </div>
                </Card>
                <Card className="bg-secondary p-2 grid grid-cols-6">
                    <div className="w-3/4 h-3/4 m-auto">
                        <FiCheckCircle className="h-full w-full text-green-500 items-center"/>
                    </div>
                    <div className="flex xs:text-2xl text-green-500 pl-4 font-bold items-center col-span-5">
                        Zmiany są naturalne zgodne z nami.                    
                    </div>
                </Card>
            </div>
             {/*
            <p className="text-lg py-4 xl:text-lg">
                W swojej praktyce oraz w pomaganiu w transformacji Twojego życia stosuję różnorodne techniki hipnozy. Hipnoza jest niezwykle skuteczną metodą, która w wielu przypadkach przynosi znacznie lepsze rezultaty niż tradycyjne formy terapii. Dzięki niej można osiągnąć głęboką i trwałą zmianę w sposób szybki i efektywny.
            </p>
            <p className="text-lg py-4 xl:text-lg">
                Wielu podróżników, z którymi miałem okazję pracować, chwali sobie tę metodę, zauważając, że jest ona nawet skuteczniejsza od terapii prowadzonych tradycyjnymi metodami. Hipnoza pomaga w radzeniu sobie z różnymi problemami, takimi jak lęki, fobie, stres, uzależnienia czy trudności w relacjach. Pozwala na dotarcie do głębokich warstw podświadomości, gdzie często ukrywają się źródła naszych problemów.
            </p>
            <p className="text-lg py-4 xl:text-lg">
                Program do Twojej wewnętrznej zmiany i transformacji nazwałem wilczą ścieżką (Wolf Path). Ścieżką, którą sam przebyłem i teraz mogę pomagać innym.
            </p>
            <p className="text-lg py-4 xl:text-lg">
                Warto zaznaczyć, że doświadczenie hipnozy jest powszechne i naturalne dla każdego z nas. Bez względu na płeć, wyznanie, kolor skóry czy dowolny inny czynnik, każdy z nas przeżywa stany hipnotyczne w codziennym życiu. Mogą one występować w momentach głębokiej koncentracji, marzeń na jawie czy podczas intensywnego zaangażowania w jakąś czynność.
            
            </p>
            <p className="text-lg py-4 xl:text-xl">
                Na wilczej ścieżce stosowanie hipnozy to świadome wykorzystanie tych naturalnych stanów w celu poprawy jakości życia i zdrowia psychicznego. To bezpieczna i sprawdzona metoda, która przynosi ulgę i pomaga w osiągnięciu wewnętrznej harmonii oraz spokoju.
            </p>
            <p className="text-lg py-4 xl:text-xl">
                Jeśli szukasz skutecznego sposobu na transformację swojego życia, hipnoza może być odpowiednim narzędziem, które pomoże Ci osiągnąć upragnione cele i zmiany.
            </p>
    */}
        </div>
     );
}
 
export default HowItWorks;