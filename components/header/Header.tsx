import { ModeButton } from "../ModeButton";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "../ui/button";
import StartComponent from "@/components/header/StartComponent";
import Link from "next/link";

const Header = () => {
    return (
        <nav className="fixed w-full h-[10vh]">
            <div className="max-w-[1600px] mx-auto bg-background justify-between flex items-center h-full">
                <Link href={"/"}>
                    <h1 className="px-4 flex font-mjolnir">
                        WOLF
                        <div className="text-green-500">
                            PATH
                        </div>
                    </h1>
                </Link>
                <div className="flex gap-x-4 px-4 items-center">

                        <ModeButton/>   
                    <StartComponent/>

                </div>
            </div>
        </nav>
    );
}
 
export default Header; 