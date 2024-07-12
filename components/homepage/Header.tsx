import Image from "next/image";
import { ModeToggle } from "@/components/ModeSwitcher";
import Sidebar from "@/components/homepage/sidebar/sidebar";
import { motion } from "framer-motion" 
import MenuButton from "@/components/homepage/sidebar/menubutton";

const Header = () => {
    return (
        <nav className="fixed w-full">
            <div className="bg-background w-full">
                <div className="justify-between flex items-center h-[10vh]">
                    <div className="items-center flex space-x-4">
                        <div className="text-xl px-2 flex font-mjolnir items-center gap-x-1 md:text-4xl">
                            WOLF
                            <div className="text-green-500">
                                PATH
                            </div>
                        </div>
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