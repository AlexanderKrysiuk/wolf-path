import { ModeButton } from "../ModeButton";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "../ui/button";
import StartComponent from "@/components/header/StartComponent";

const Header = () => {
    return (
        <nav className="fixed w-full pr-4">
            <div className="max-w-[1600px] mx-auto bg-background justify-between flex items-center h-[10vh]">
                <span className="px-2 flex font-mjolnir">
                    WOLF
                    <div className="text-green-500">
                        PATH
                    </div>
                </span>
                <div className="flex gap-x-4">
                    <ModeButton/>   
                    <StartComponent/>
                </div>
            </div>
        </nav>
    );
}
 
export default Header; 