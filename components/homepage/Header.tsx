import Image from "next/image";
import { ModeToggle } from "@/components/ModeSwitcher";
import Sidebar from "@/components/homepage/sidebar/sidebar";
import { motion } from "framer-motion" 
import MenuButton from "@/components/homepage/sidebar/menubutton";

const Header = () => {
    return (
        <nav className="fixed w-full">
            <div className="bg-background w-full xxl:w-[90%] mx-auto">
                <div className="justify-between flex items-center h-[10vh]">
                    <div className="items-center flex space-x-4">
                        <span className="px-2 flex font-mjolnir items-center gap-x-1">
                            WOLF
                            <span className="text-green-500">
                                PATH
                            </span>
                        </span>
                    </div>
                    <div className="hidden">
                        <MenuButton/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Header; 