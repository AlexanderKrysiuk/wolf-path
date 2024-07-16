import Image from "next/image";

const AboutMe = () => {
    return (
        <main>
            <div className="">
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-4">
                    <div className="lg:my-auto">
                        <img
                            className="rounded-full w-1/2 mx-auto lg:w-full lg:items-center"
                            src="/Images/Alex.png"
                            alt=""
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <div className="lg:flex-row py-4">
                            <span className="font-mjolnir flex gap-x-2">KIM
                                <span className="text-green-500">JESTEM?</span>
                            </span>
                            <p>
                                Nazywam się Alexander Krysiuk i jestem certyfikowanym hipnoterapeutą. Swoją drogę z hipnozą zacząłem w roku 2020 jako pasjonat i podróżnik. W najciemniejszym momencie mojego życia hipnoza pomogła mi znaleźć wyjście, a po wielu sesjach i pracy z podświadomością, moje życie zaczęło się zmieniać. 16 czerwca 2024 ukończyłem kurs w Akademii Hipnoterapii i teraz jestem gotów, by pomagać innym.
                            </p>
                        </div>
                    </div>
                </div>
                <p>
                    Zawsze byłem ciekaw, jak niektórym udaje się realizować marzenia z łatwością, podczas gdy ja musiałem walczyć o wszystko, dając z siebie 200%. Podczas swojej drogi odkryłem, że nosiłem ogromny bagaż emocjonalny, który obejmował niskie poczucie własnej wartości, depresję, lęki, stres i uzależnienie od alkoholu. Dziś budzę się z ekscytacją, pewnością siebie i pasją do życia, znalazłem narzędzia do wewnętrznej transformacji i prowadzę innych na tej drodze.    
                </p>
                    {/*
                    <p>
                        Podczas swojej drogi odkryłem z jakim ogromnym bagażem tego, co w środku szedłem i pożegnałem niskie poczucie własnej wartości, depresje, lęki, stresy, uzależnienie od alkoholu. Dzisiaj budzę się z ekscytacją, pewnością siebie, pasją do życia. Znalazłem narzędzia do wewnętrznej transformacji i prowadzę innych na tej drodze.        
                    </p>
                    */}
            </div>
        <div className="lg:grid lg:grid-cols-4 gap-x-4">
            <div>
                <img
                    className="p-4"
                    src="/Images/Certyfikat.png"
                />
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
        </main>
     );
}
 
export default AboutMe;