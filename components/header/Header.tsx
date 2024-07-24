import { ModeButton } from "../ModeButton";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "../ui/button";
import StartComponent from "@/components/header/StartComponent";

const Header = () => {
    return (
        <nav className="fixed w-full h-[10vh]">
            <div className="max-w-[1600px] mx-auto bg-background justify-between flex items-center h-full">
                <span className="px-4 flex font-mjolnir gap-x-0">
                    WOLF
                    <div className="text-green-500">
                        PATH
                    </div>
                </span>
                <div className="flex gap-x-4 px-4">
                    <ModeButton/>   
                    <StartComponent/>
                </div>
            </div>
        </nav>
    );
}
 
export default Header; 