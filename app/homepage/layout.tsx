import Hero from "./hero/page";
const HomePageLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div>
            <Hero/>
        </div>
     );
}
 
export default HomePageLayout;