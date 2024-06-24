import Image from "next/image";

const Header = () => {
    return ( 
        <div className="items-center flex pt-4 pb-4 pl-4">
            <Image
                src="/Images/Logo.png"
                alt=""
                width={50}
                height={50}
            />
            <div className="text-3xl flex">
                WOLF
                <div className="text-green-500">
                    PATH
                </div>
            </div>
        </div>
    );
}
 
export default Header; 